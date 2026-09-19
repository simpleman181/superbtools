'use client';
import { useState, useCallback } from 'react';
import { FileText, Upload, Download, Loader2, AlertCircle } from 'lucide-react';

export default function TxtToPdf() {
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('document');
  const [fontSize, setFontSize] = useState(11);
  const [fontFamily, setFontFamily] = useState<'Helvetica'|'TimesRoman'|'Courier'>('Helvetica');
  const [pageSize, setPageSize] = useState<'a4'|'letter'>('a4');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setFileName(f.name.replace(/\.[^/.]+$/, ''));
    const reader = new FileReader();
    reader.onload = ev => setText(ev.target?.result as string || '');
    reader.readAsText(f);
  };

  const apply = useCallback(async () => {
    if (!text.trim()) return;
    setLoading(true); setError('');
    try {
      const { PDFDocument, StandardFonts, rgb } = await import('pdf-lib');
      const doc = await PDFDocument.create();
      const fontMap: Record<string, any> = {
        Helvetica: StandardFonts.Helvetica,
        TimesRoman: StandardFonts.TimesRoman,
        Courier: StandardFonts.Courier,
      };
      const font = await doc.embedFont(fontMap[fontFamily]);
      const PAGE = pageSize === 'a4' ? { w: 595, h: 842 } : { w: 612, h: 792 };
      const margin = 50;
      const lineHeight = fontSize * 1.4;
      const maxWidth = PAGE.w - margin * 2;

      // Word-wrap all lines
      const allLines: string[] = [];
      for (const rawLine of text.split('\n')) {
        if (rawLine.trim() === '') { allLines.push(''); continue; }
        let line = '';
        for (const word of rawLine.split(' ')) {
          const test = line ? line + ' ' + word : word;
          if (font.widthOfTextAtSize(test, fontSize) <= maxWidth) {
            line = test;
          } else {
            if (line) allLines.push(line);
            line = word;
          }
        }
        if (line) allLines.push(line);
      }

      let y = PAGE.h - margin;
      let page = doc.addPage([PAGE.w, PAGE.h]);
      for (const line of allLines) {
        if (y - lineHeight < margin) {
          page = doc.addPage([PAGE.w, PAGE.h]);
          y = PAGE.h - margin;
        }
        if (line) page.drawText(line, { x: margin, y, size: fontSize, font, color: rgb(0, 0, 0) });
        y -= lineHeight;
      }

      const out = await doc.save();
      const url = URL.createObjectURL(new Blob([out as unknown as BlobPart], { type: 'application/pdf' }));
      const a = document.createElement('a'); a.href = url; a.download = `${fileName}.pdf`; a.click();
      URL.revokeObjectURL(url);
      setStatus(`✅ PDF created — ${doc.getPageCount()} page(s)!`);
    } catch (e: any) { setError(e.message); }
    setLoading(false);
  }, [text, fileName, fontSize, fontFamily, pageSize]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-8 w-8 text-primary" />
        <div><h1 className="text-2xl font-bold">TXT to PDF</h1>
          <p className="text-sm text-muted-foreground">Convert plain text to a formatted PDF — 100% in-browser</p></div>
      </div>
      <div className="flex gap-2 mb-4">
        <label htmlFor="txt-file" className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm cursor-pointer hover:bg-accent">
          <Upload className="h-4 w-4" /> Upload .txt file
          <input id="txt-file" type="file" accept=".txt,.md,.csv,.log" onChange={handleFile} className="hidden" />
        </label>
        <button onClick={() => setText('')} className="px-3 py-2 border rounded-md text-sm hover:bg-accent text-muted-foreground">Clear</button>
      </div>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste or type your text here, or upload a .txt file above…"
        className="w-full h-52 rounded-md border bg-background px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring mb-4" />
      <div className="rounded-xl border bg-card p-4 mb-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div><label className="text-xs text-muted-foreground block mb-1">Output filename</label>
          <input value={fileName} onChange={e => setFileName(e.target.value)}
            className="w-full rounded-md border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
        <div><label className="text-xs text-muted-foreground block mb-1">Font</label>
          <select value={fontFamily} onChange={e => setFontFamily(e.target.value as any)}
            className="w-full rounded-md border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="Helvetica">Helvetica</option>
            <option value="TimesRoman">Times Roman</option>
            <option value="Courier">Courier (mono)</option>
          </select></div>
        <div><label className="text-xs text-muted-foreground block mb-1">Font size: {fontSize}pt</label>
          <input type="range" min={7} max={20} value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="w-full mt-2" /></div>
        <div><label className="text-xs text-muted-foreground block mb-1">Page size</label>
          <select value={pageSize} onChange={e => setPageSize(e.target.value as any)}
            className="w-full rounded-md border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="a4">A4</option>
            <option value="letter">US Letter</option>
          </select></div>
      </div>
      {error && <div className="flex items-center gap-2 text-destructive text-sm mb-3"><AlertCircle className="h-4 w-4" />{error}</div>}
      {status && <div className="text-sm text-green-600 mb-3">{status}</div>}
      <button onClick={apply} disabled={loading || !text.trim()}
        className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {loading ? 'Generating PDF...' : 'Convert to PDF & Download'}
      </button>
    </div>
  );
}
