'use client';
import { useState, useCallback } from 'react';
import { Table, Upload, Download, Loader2, AlertCircle } from 'lucide-react';

export default function CsvToPdf() {
  const [csv, setCsv] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [hasHeader, setHasHeader] = useState(true);
  const [fileName, setFileName] = useState('table');
  const [pageSize, setPageSize] = useState<'a4'|'a3'|'letter'>('a4');
  const [landscape, setLandscape] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const parseCSV = (raw: string, delim: string): string[][] => {
    return raw.trim().split('\n').map(line => {
      const cells: string[] = []; let cur = ''; let inQ = false;
      for (const ch of line) {
        if (ch === '"') { inQ = !inQ; }
        else if (ch === delim && !inQ) { cells.push(cur.trim()); cur = ''; }
        else { cur += ch; }
      }
      cells.push(cur.trim());
      return cells;
    });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setFileName(f.name.replace(/\.[^/.]+$/, ''));
    const reader = new FileReader();
    reader.onload = ev => setCsv(ev.target?.result as string || '');
    reader.readAsText(f);
  };

  const apply = useCallback(async () => {
    if (!csv.trim()) return;
    setLoading(true); setError('');
    try {
      const { PDFDocument, StandardFonts, rgb } = await import('pdf-lib');
      const rows = parseCSV(csv, delimiter);
      if (rows.length === 0) throw new Error('No data found');

      const PAGE_SIZES: Record<string, [number,number]> = { a4:[595,842], a3:[842,1191], letter:[612,792] };
      let [pgW, pgH] = PAGE_SIZES[pageSize];
      if (landscape) [pgW, pgH] = [pgH, pgW];

      const doc = await PDFDocument.create();
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const boldFont = await doc.embedFont(StandardFonts.HelveticaBold);
      const margin = 30;
      const rowH = 18;
      const cols = Math.max(...rows.map(r => r.length));
      const colW = (pgW - margin * 2) / cols;
      const fontSize = Math.min(9, Math.max(6, colW / 8));

      let page = doc.addPage([pgW, pgH]);
      let y = pgH - margin;

      rows.forEach((row, ri) => {
        if (y - rowH < margin) {
          page = doc.addPage([pgW, pgH]);
          y = pgH - margin;
        }
        const isHeader = hasHeader && ri === 0;
        // Row background
        page.drawRectangle({ x: margin, y: y - rowH + 2, width: pgW - margin * 2, height: rowH,
          color: isHeader ? rgb(0.2,0.4,0.8) : ri % 2 === 0 ? rgb(0.97,0.97,0.97) : rgb(1,1,1) });
        // Cell text
        row.forEach((cell, ci) => {
          page.drawText(String(cell).slice(0, 40), {
            x: margin + ci * colW + 3, y: y - rowH + 6,
            size: fontSize, font: isHeader ? boldFont : font,
            color: isHeader ? rgb(1,1,1) : rgb(0.1,0.1,0.1),
            maxWidth: colW - 6,
          });
        });
        // Grid lines
        page.drawLine({ start:{x:margin,y:y-rowH+2}, end:{x:pgW-margin,y:y-rowH+2}, thickness:0.3, color:rgb(0.8,0.8,0.8) });
        y -= rowH;
      });

      const out = await doc.save();
      const url = URL.createObjectURL(new Blob([out as unknown as BlobPart], { type:'application/pdf' }));
      const a = document.createElement('a'); a.href=url; a.download=`${fileName}.pdf`; a.click();
      URL.revokeObjectURL(url);
      setStatus(`✅ PDF created — ${rows.length} rows, ${cols} columns!`);
    } catch (e: any) { setError(e.message); }
    setLoading(false);
  }, [csv, delimiter, hasHeader, fileName, pageSize, landscape]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Table className="h-8 w-8 text-primary" />
        <div><h1 className="text-2xl font-bold">CSV to PDF</h1>
          <p className="text-sm text-muted-foreground">Convert spreadsheet data to a formatted PDF table — 100% in-browser</p></div>
      </div>
      <div className="flex gap-2 mb-4">
        <label htmlFor="csv-file" className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm cursor-pointer hover:bg-accent">
          <Upload className="h-4 w-4" /> Upload CSV
          <input id="csv-file" type="file" accept=".csv,.tsv,.txt" onChange={handleFile} className="hidden" />
        </label>
      </div>
      <textarea value={csv} onChange={e => setCsv(e.target.value)} placeholder="Paste CSV data here, or upload a file above…&#10;name,age,city&#10;Alice,30,Mumbai&#10;Bob,25,Delhi"
        className="w-full h-40 rounded-md border bg-background px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring mb-4" />
      <div className="rounded-xl border bg-card p-4 mb-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div><label className="text-xs text-muted-foreground block mb-1">Delimiter</label>
          <select value={delimiter} onChange={e => setDelimiter(e.target.value)}
            className="w-full rounded-md border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            <option value=",">Comma (,)</option>
            <option value="	">Tab</option>
            <option value=";">Semicolon (;)</option>
            <option value="|">Pipe (|)</option>
          </select></div>
        <div><label className="text-xs text-muted-foreground block mb-1">Page size</label>
          <select value={pageSize} onChange={e => setPageSize(e.target.value as any)}
            className="w-full rounded-md border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="a4">A4</option>
            <option value="a3">A3</option>
            <option value="letter">US Letter</option>
          </select></div>
        <div><label className="text-xs text-muted-foreground block mb-1">Filename</label>
          <input value={fileName} onChange={e => setFileName(e.target.value)}
            className="w-full rounded-md border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
        <div className="flex flex-col gap-2 pt-4">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={hasHeader} onChange={e => setHasHeader(e.target.checked)} className="rounded accent-primary" />First row is header
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={landscape} onChange={e => setLandscape(e.target.checked)} className="rounded accent-primary" />Landscape
          </label>
        </div>
      </div>
      {error && <div className="flex items-center gap-2 text-destructive text-sm mb-3"><AlertCircle className="h-4 w-4" />{error}</div>}
      {status && <div className="text-sm text-green-600 mb-3">{status}</div>}
      <button onClick={apply} disabled={loading || !csv.trim()}
        className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {loading ? 'Generating PDF...' : 'Convert to PDF & Download'}
      </button>
    </div>
  );
}
