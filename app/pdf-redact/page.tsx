'use client';
import { useState, useCallback } from 'react';
import { EyeOff, Upload, Download, Loader2, AlertCircle, Plus, Trash2 } from 'lucide-react';

interface Redaction { page: number; x: number; y: number; w: number; h: number; }

export default function PdfRedact() {
  const [file, setFile] = useState<File|null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [redactions, setRedactions] = useState<Redaction[]>([]);
  const [form, setForm] = useState<Redaction>({ page: 1, x: 0, y: 0, w: 100, h: 20 });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setFile(f); setRedactions([]); setStatus(''); setError('');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const doc = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
      setPageCount(doc.getPageCount());
    } catch (e: any) { setError('Could not read PDF: ' + e.message); }
  };

  const addRedaction = () => {
    setRedactions(r => [...r, { ...form }]);
  };

  const apply = useCallback(async () => {
    if (!file || redactions.length === 0) return;
    setLoading(true); setError('');
    try {
      const { PDFDocument, rgb } = await import('pdf-lib');
      const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const pages = doc.getPages();
      redactions.forEach(r => {
        const page = pages[r.page - 1];
        if (!page) return;
        const { height } = page.getSize();
        // PDF coordinates are bottom-left; convert from top-left input
        page.drawRectangle({ x: r.x, y: height - r.y - r.h, width: r.w, height: r.h, color: rgb(0, 0, 0) });
      });
      const out = await doc.save();
      const url = URL.createObjectURL(new Blob([out as unknown as BlobPart], { type: 'application/pdf' }));
      const a = document.createElement('a'); a.href = url; a.download = file.name.replace('.pdf', '-redacted.pdf'); a.click();
      URL.revokeObjectURL(url);
      setStatus(`✅ Applied ${redactions.length} redaction(s) and downloaded!`);
    } catch (e: any) { setError(e.message); }
    setLoading(false);
  }, [file, redactions]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <EyeOff className="h-8 w-8 text-primary" />
        <div><h1 className="text-2xl font-bold">Redact PDF</h1>
          <p className="text-sm text-muted-foreground">Cover sensitive content with black boxes — 100% in-browser</p></div>
      </div>
      <div className="mb-4 text-xs rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 px-3 py-2">
        <strong>Tip:</strong> Coordinates are in PDF points from the top-left. Use the viewer below to estimate positions. 1 inch = 72pt.
      </div>
      <label htmlFor="red-file" className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 mb-6 cursor-pointer hover:border-primary/50 transition-colors">
        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-sm font-medium">{file ? `${file.name} — ${pageCount} pages` : 'Upload PDF'}</p>
        <input id="red-file" type="file" accept=".pdf" onChange={handleFile} className="hidden" />
      </label>
      {file && (
        <div className="rounded-xl border bg-card p-4 mb-4 space-y-4">
          <div><h3 className="text-sm font-semibold mb-3">Add Redaction Area</h3>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div><label className="text-xs text-muted-foreground block mb-1">Page</label>
                <input type="number" min={1} max={pageCount} value={form.page} onChange={e => setForm(f => ({ ...f, page: Number(e.target.value) }))}
                  className="w-full rounded-md border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
              <div><label className="text-xs text-muted-foreground block mb-1">X (left, pt)</label>
                <input type="number" min={0} value={form.x} onChange={e => setForm(f => ({ ...f, x: Number(e.target.value) }))}
                  className="w-full rounded-md border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
              <div><label className="text-xs text-muted-foreground block mb-1">Y (top, pt)</label>
                <input type="number" min={0} value={form.y} onChange={e => setForm(f => ({ ...f, y: Number(e.target.value) }))}
                  className="w-full rounded-md border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
              <div><label className="text-xs text-muted-foreground block mb-1">Width (pt)</label>
                <input type="number" min={1} value={form.w} onChange={e => setForm(f => ({ ...f, w: Number(e.target.value) }))}
                  className="w-full rounded-md border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
              <div><label className="text-xs text-muted-foreground block mb-1">Height (pt)</label>
                <input type="number" min={1} value={form.h} onChange={e => setForm(f => ({ ...f, h: Number(e.target.value) }))}
                  className="w-full rounded-md border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
              <div className="flex items-end">
                <button onClick={addRedaction} className="w-full flex items-center justify-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90">
                  <Plus className="h-4 w-4" /> Add
                </button></div>
            </div>
            {redactions.length > 0 && (
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {redactions.map((r, i) => (
                  <div key={i} className="flex items-center justify-between text-xs bg-muted rounded px-2 py-1.5 font-mono">
                    <span>P{r.page} — x:{r.x} y:{r.y} {r.w}×{r.h}pt</span>
                    <button onClick={() => setRedactions(rs => rs.filter((_, j) => j !== i))} className="text-destructive hover:text-destructive/80"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {error && <div className="flex items-center gap-2 text-destructive text-sm mb-3"><AlertCircle className="h-4 w-4" />{error}</div>}
      {status && <div className="text-sm text-green-600 mb-3">{status}</div>}
      <button onClick={apply} disabled={loading || !file || redactions.length === 0}
        className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {loading ? 'Redacting...' : redactions.length > 0 ? `Apply ${redactions.length} Redaction(s) & Download` : 'Add redactions above'}
      </button>
    </div>
  );
}
