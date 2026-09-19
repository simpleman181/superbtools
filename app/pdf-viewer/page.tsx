'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Eye, Upload, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2, AlertCircle } from 'lucide-react';

export default function PdfViewer() {
  const [file, setFile] = useState<File|null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfRef = useRef<any>(null);

  const renderPage = useCallback(async (num: number, sc: number) => {
    if (!pdfRef.current || !canvasRef.current) return;
    const page = await pdfRef.current.getPage(num);
    const viewport = page.getViewport({ scale: sc });
    const canvas = canvasRef.current;
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport }).promise;
  }, []);

  const loadPdf = useCallback(async (f: File) => {
    setLoading(true); setError('');
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
      const bytes = await f.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      pdfRef.current = pdf;
      setPageCount(pdf.numPages);
      setCurrentPage(1);
      await renderPage(1, scale);
    } catch (e: any) { setError('Could not render PDF: ' + e.message); }
    setLoading(false);
  }, [scale, renderPage]);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setFile(f); await loadPdf(f);
  };

  useEffect(() => {
    if (pdfRef.current) renderPage(currentPage, scale);
  }, [currentPage, scale, renderPage]);

  const go = (dir: number) => setCurrentPage(p => Math.max(1, Math.min(pageCount, p + dir)));

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Eye className="h-8 w-8 text-primary" />
        <div><h1 className="text-2xl font-bold">PDF Viewer</h1>
          <p className="text-sm text-muted-foreground">View any PDF in your browser — no upload to server</p></div>
      </div>
      <label htmlFor="view-file" className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 mb-4 cursor-pointer hover:border-primary/50 transition-colors">
        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-sm font-medium">{file ? file.name : 'Upload PDF to view'}</p>
        <input id="view-file" type="file" accept=".pdf" onChange={handleFile} className="hidden" />
      </label>
      {error && <div className="flex items-center gap-2 text-destructive text-sm mb-3"><AlertCircle className="h-4 w-4" />{error}</div>}
      {pageCount > 0 && (
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button onClick={() => go(-1)} disabled={currentPage <= 1} className="p-1.5 rounded border hover:bg-accent disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>
            <span className="text-sm">Page <input type="number" min={1} max={pageCount} value={currentPage}
              onChange={e => setCurrentPage(Math.max(1,Math.min(pageCount,Number(e.target.value))))}
              className="w-12 text-center rounded border bg-background px-1 py-0.5 text-sm mx-1" /> of {pageCount}</span>
            <button onClick={() => go(1)} disabled={currentPage >= pageCount} className="p-1.5 rounded border hover:bg-accent disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setScale(s => Math.max(0.5,s-0.25))} className="p-1.5 rounded border hover:bg-accent"><ZoomOut className="h-4 w-4" /></button>
            <span className="text-sm w-14 text-center">{Math.round(scale*100)}%</span>
            <button onClick={() => setScale(s => Math.min(3,s+0.25))} className="p-1.5 rounded border hover:bg-accent"><ZoomIn className="h-4 w-4" /></button>
          </div>
        </div>
      )}
      {loading && <div className="flex items-center justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
      <div className="overflow-auto border rounded-lg bg-muted/30">
        <canvas ref={canvasRef} className="mx-auto block" style={{ display: pageCount > 0 && !loading ? 'block' : 'none' }} />
      </div>
    </div>
  );
}
