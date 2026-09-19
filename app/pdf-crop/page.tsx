'use client';
import { useState, useCallback } from 'react';
import { Crop, Upload, Download, Loader2, AlertCircle } from 'lucide-react';

export default function PdfCrop() {
  const [file, setFile] = useState<File|null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageSize, setPageSize] = useState({ width: 0, height: 0 });
  const [margins, setMargins] = useState({ top: 0, right: 0, bottom: 0, left: 0 });
  const [applyTo, setApplyTo] = useState<'all'|'odd'|'even'>('all');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setFile(f); setStatus(''); setError('');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const doc = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
      const pages = doc.getPages();
      setPageCount(pages.length);
      if (pages.length > 0) {
        const { width, height } = pages[0].getSize();
        setPageSize({ width: Math.round(width), height: Math.round(height) });
      }
    } catch (e: any) { setError('Could not read PDF: ' + e.message); }
  };

  const apply = useCallback(async () => {
    if (!file) return;
    setLoading(true); setError('');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      doc.getPages().forEach((page, i) => {
        const skip = (applyTo === 'odd' && i % 2 === 1) || (applyTo === 'even' && i % 2 === 0);
        if (skip) return;
        const { width, height } = page.getSize();
        page.setCropBox(
          margins.left,
          margins.bottom,
          width - margins.left - margins.right,
          height - margins.top - margins.bottom
        );
      });
      const out = await doc.save();
      const url = URL.createObjectURL(new Blob([out as unknown as BlobPart], { type: 'application/pdf' }));
      const a = document.createElement('a'); a.href = url; a.download = file.name.replace('.pdf', '-cropped.pdf'); a.click();
      URL.revokeObjectURL(url);
      setStatus('✅ PDF cropped and downloaded!');
    } catch (e: any) { setError(e.message); }
    setLoading(false);
  }, [file, margins, applyTo]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Crop className="h-8 w-8 text-primary" />
        <div><h1 className="text-2xl font-bold">Crop PDF</h1>
          <p className="text-sm text-muted-foreground">Trim margins from PDF pages — 100% in-browser</p></div>
      </div>
      <label htmlFor="crop-file" className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 mb-6 cursor-pointer hover:border-primary/50 transition-colors">
        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-sm font-medium">{file ? `${file.name} — ${pageCount} pages (${pageSize.width}×${pageSize.height}pt)` : 'Upload PDF'}</p>
        <input id="crop-file" type="file" accept=".pdf" onChange={handleFile} className="hidden" />
      </label>
      {file && (
        <div className="rounded-xl border bg-card p-4 mb-4 space-y-4">
          <div><label className="text-sm font-medium block mb-2">Apply to</label>
            <div className="flex gap-2">
              {(['all','odd','even'] as const).map(v => (
                <button key={v} onClick={() => setApplyTo(v)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize ${applyTo === v ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>{v === 'all' ? 'All Pages' : v === 'odd' ? 'Odd Pages' : 'Even Pages'}</button>
              ))}</div></div>
          <div><label className="text-sm font-medium block mb-2">Crop margins (points — 1pt ≈ 0.35mm)</label>
            <div className="grid grid-cols-2 gap-3">
              {([['top','Top'],['right','Right'],['bottom','Bottom'],['left','Left']] as const).map(([side, label]) => (
                <div key={side}>
                  <label className="text-xs text-muted-foreground block mb-1">{label}</label>
                  <input type="number" min={0} max={300} value={margins[side]} onChange={e => setMargins(m => ({ ...m, [side]: Number(e.target.value) }))}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              ))}</div></div>
        </div>
      )}
      {error && <div className="flex items-center gap-2 text-destructive text-sm mb-3"><AlertCircle className="h-4 w-4" />{error}</div>}
      {status && <div className="text-sm text-green-600 mb-3">{status}</div>}
      <button onClick={apply} disabled={loading || !file}
        className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {loading ? 'Cropping...' : 'Crop & Download'}
      </button>
    </div>
  );
}
