'use client';
import { useState, useCallback } from 'react';
import { Sheet, Upload, Download, Loader2, AlertCircle } from 'lucide-react';

export default function ExcelToPdf() {
  const [file, setFile] = useState<File|null>(null);
  const [sheets, setSheets] = useState<string[]>([]);
  const [selectedSheet, setSelectedSheet] = useState('');
  const [landscape, setLandscape] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const loadSheets = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setFile(f); setSheets([]); setStatus(''); setError('');
    try {
      const XLSX = await import('xlsx');
      const data = await f.arrayBuffer();
      const wb = XLSX.read(data, { type:'array' });
      setSheets(wb.SheetNames);
      setSelectedSheet(wb.SheetNames[0] || '');
    } catch(e:any) { setError('Could not read file: ' + e.message); }
  };

  const convert = useCallback(async () => {
    if (!file || !selectedSheet) return;
    setLoading(true); setError('');
    try {
      const XLSX = await import('xlsx');
      const { PDFDocument, StandardFonts, rgb } = await import('pdf-lib');
      const data = await file.arrayBuffer();
      const wb = XLSX.read(data, { type:'array' });
      const ws = wb.Sheets[selectedSheet];
      const rows: string[][] = XLSX.utils.sheet_to_json(ws, { header:1, defval:'' }) as string[][];
      if (rows.length === 0) throw new Error('Sheet is empty');

      let [pgW, pgH] = landscape ? [842, 595] : [595, 842];
      const doc = await PDFDocument.create();
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const boldFont = await doc.embedFont(StandardFonts.HelveticaBold);
      const margin = 30, rowH = 16, fontSize = 8;
      const cols = Math.max(...rows.map(r => r.length));
      const colW = (pgW - margin*2) / Math.max(cols, 1);

      let page = doc.addPage([pgW, pgH]);
      let y = pgH - margin;

      rows.forEach((row, ri) => {
        if (y - rowH < margin) { page = doc.addPage([pgW, pgH]); y = pgH - margin; }
        const isHeader = ri === 0;
        page.drawRectangle({ x:margin, y:y-rowH+2, width:pgW-margin*2, height:rowH,
          color: isHeader ? rgb(0.18,0.35,0.72) : ri%2===0 ? rgb(0.97,0.97,0.97) : rgb(1,1,1) });
        row.forEach((cell, ci) => {
          const text = String(cell ?? '').slice(0,50);
          if (!text) return;
          page.drawText(text, {
            x: margin+ci*colW+3, y: y-rowH+5,
            size: fontSize, font: isHeader?boldFont:font,
            color: isHeader?rgb(1,1,1):rgb(0.1,0.1,0.1),
            maxWidth: colW-6,
          });
        });
        page.drawLine({ start:{x:margin,y:y-rowH+2}, end:{x:pgW-margin,y:y-rowH+2}, thickness:0.3, color:rgb(0.8,0.8,0.8) });
        y -= rowH;
      });

      const out = await doc.save();
      const url = URL.createObjectURL(new Blob([out as unknown as BlobPart],{type:'application/pdf'}));
      const a = document.createElement('a'); a.href=url; a.download=file.name.replace(/\.xlsx?$/,'')+'-'+selectedSheet+'.pdf'; a.click();
      URL.revokeObjectURL(url);
      setStatus(`✅ Converted "${selectedSheet}" — ${rows.length} rows, ${cols} columns!`);
    } catch(e:any) { setError(e.message); }
    setLoading(false);
  }, [file, selectedSheet, landscape]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Sheet className="h-8 w-8 text-primary"/>
        <div><h1 className="text-2xl font-bold">Excel to PDF</h1>
          <p className="text-sm text-muted-foreground">Convert Excel spreadsheets to a PDF table — 100% in-browser</p></div>
      </div>
      <div className="mb-4 text-xs rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 px-3 py-2">
        <strong>Note:</strong> Data and basic formatting are preserved. Charts, formulas and complex cell styles are not rendered.
      </div>
      <label htmlFor="xl-file" className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 mb-6 cursor-pointer hover:border-primary/50 transition-colors">
        <Upload className="h-10 w-10 text-muted-foreground mb-2"/>
        <p className="text-sm font-medium">{file ? file.name : 'Upload Excel file'}</p>
        <p className="text-xs text-muted-foreground mt-1">.xlsx and .xls supported</p>
        <input id="xl-file" type="file" accept=".xlsx,.xls,.ods" onChange={loadSheets} className="hidden"/>
      </label>
      {sheets.length > 0 && (
        <div className="rounded-xl border bg-card p-4 mb-4 space-y-3">
          <div><label className="text-sm font-medium block mb-1">Sheet to convert</label>
            <select value={selectedSheet} onChange={e=>setSelectedSheet(e.target.value)}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              {sheets.map(s=><option key={s} value={s}>{s}</option>)}
            </select></div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={landscape} onChange={e=>setLandscape(e.target.checked)} className="rounded accent-primary"/>
            Landscape orientation (better for wide tables)
          </label>
        </div>
      )}
      {error && <div className="flex items-center gap-2 text-destructive text-sm mb-3"><AlertCircle className="h-4 w-4"/>{error}</div>}
      {status && <div className="text-sm text-green-600 mb-3">{status}</div>}
      <button onClick={convert} disabled={loading||!file||!selectedSheet}
        className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
        {loading?<Loader2 className="h-4 w-4 animate-spin"/>:<Download className="h-4 w-4"/>}
        {loading?'Converting…':'Convert to PDF & Download'}
      </button>
    </div>
  );
}
