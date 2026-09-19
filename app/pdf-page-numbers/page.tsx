'use client';
import { useState, useCallback } from 'react';
import { Hash, Upload, Download, Loader2, AlertCircle } from 'lucide-react';

export default function PdfPageNumbers() {
  const [file, setFile] = useState<File|null>(null);
  const [position, setPosition] = useState<'bottom-center'|'bottom-right'|'bottom-left'|'top-center'|'top-right'|'top-left'>('bottom-center');
  const [prefix, setPrefix] = useState('');
  const [startFrom, setStartFrom] = useState(1);
  const [fontSize, setFontSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const apply = useCallback(async () => {
    if (!file) return;
    setLoading(true); setError('');
    try {
      const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib');
      const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const pages = doc.getPages();
      pages.forEach((page, i) => {
        const { width, height } = page.getSize();
        const label = `${prefix}${i + startFrom}`;
        const tw = font.widthOfTextAtSize(label, fontSize);
        const margin = 20;
        let x = 0, y = 0;
        if (position === 'bottom-center') { x = (width - tw) / 2; y = margin; }
        else if (position === 'bottom-right') { x = width - tw - margin; y = margin; }
        else if (position === 'bottom-left') { x = margin; y = margin; }
        else if (position === 'top-center') { x = (width - tw) / 2; y = height - margin - fontSize; }
        else if (position === 'top-right') { x = width - tw - margin; y = height - margin - fontSize; }
        else { x = margin; y = height - margin - fontSize; }
        page.drawText(label, { x, y, size: fontSize, font, color: rgb(0, 0, 0) });
      });
      const out = await doc.save();
      const url = URL.createObjectURL(new Blob([out as unknown as BlobPart], { type: 'application/pdf' }));
      const a = document.createElement('a'); a.href = url; a.download = file.name.replace('.pdf', '-numbered.pdf'); a.click();
      URL.revokeObjectURL(url);
      setStatus(`✅ Added page numbers to ${pages.length} pages!`);
    } catch (e: any) { setError(e.message); }
    setLoading(false);
  }, [file, position, prefix, startFrom, fontSize]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Hash className="h-8 w-8 text-primary" />
        <div><h1 className="text-2xl font-bold">Add Page Numbers</h1>
          <p className="text-sm text-muted-foreground">Stamp page numbers on every page — 100% in-browser</p></div>
      </div>
      <label htmlFor="pn-file" className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 mb-6 cursor-pointer hover:border-primary/50 transition-colors">
        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-sm font-medium">{file ? file.name : 'Upload PDF'}</p>
        <input id="pn-file" type="file" accept=".pdf" onChange={e => { setFile(e.target.files?.[0] || null); setStatus(''); setError(''); }} className="hidden" />
      </label>
      <div className="rounded-xl border bg-card p-4 mb-4 space-y-4">
        <div><label className="text-sm font-medium block mb-1">Position</label>
          <select value={position} onChange={e => setPosition(e.target.value as any)}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="bottom-center">Bottom Centre</option>
            <option value="bottom-right">Bottom Right</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="top-center">Top Centre</option>
            <option value="top-right">Top Right</option>
            <option value="top-left">Top Left</option>
          </select></div>
        <div className="grid grid-cols-3 gap-4">
          <div><label className="text-sm font-medium block mb-1">Prefix</label>
            <input value={prefix} onChange={e => setPrefix(e.target.value)} placeholder="Page , p. …"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
          <div><label className="text-sm font-medium block mb-1">Start from</label>
            <input type="number" min={1} value={startFrom} onChange={e => setStartFrom(Number(e.target.value))}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
          <div><label className="text-sm font-medium block mb-1">Font size: {fontSize}pt</label>
            <input type="range" min={6} max={24} value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="w-full mt-2" /></div>
        </div>
        <div className="bg-muted/50 rounded-md px-3 py-2 text-xs text-muted-foreground">
          Preview: <span className="font-mono text-foreground">{prefix}{startFrom}</span>, <span className="font-mono text-foreground">{prefix}{startFrom + 1}</span>, <span className="font-mono text-foreground">{prefix}{startFrom + 2}</span> …
        </div>
      </div>
      {error && <div className="flex items-center gap-2 text-destructive text-sm mb-3"><AlertCircle className="h-4 w-4" />{error}</div>}
      {status && <div className="text-sm text-green-600 mb-3">{status}</div>}
      <button onClick={apply} disabled={loading || !file}
        className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {loading ? 'Numbering Pages...' : 'Add Numbers & Download'}
      </button>
    </div>
  );
}
