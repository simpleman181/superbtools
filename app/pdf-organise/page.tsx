'use client';
import { useState, useCallback, useRef } from 'react';
import { LayoutGrid, Upload, Download, Loader2, AlertCircle, RotateCw, Trash2 } from 'lucide-react';

interface PageInfo { idx: number; thumb: string; rotation: number; }

export default function PdfOrganise() {
  const [file, setFile] = useState<File|null>(null);
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const dragIdx = useRef<number|null>(null);

  const loadThumbs = useCallback(async (f: File) => {
    setLoading(true); setError(''); setPages([]);
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
      const bytes = await f.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      const thumbs: PageInfo[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(`Loading page ${i}/${pdf.numPages}…`);
        const page = await pdf.getPage(i);
        const vp = page.getViewport({ scale: 0.3 });
        const canvas = document.createElement('canvas');
        canvas.width = vp.width; canvas.height = vp.height;
        await (page as any).render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
        thumbs.push({ idx: i - 1, thumb: canvas.toDataURL('image/jpeg', 0.6), rotation: 0 });
      }
      setPages(thumbs);
    } catch (e: any) { setError(e.message); }
    setProgress(''); setLoading(false);
  }, []);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setFile(f); setStatus(''); await loadThumbs(f);
  };

  const onDragStart = (i: number) => { dragIdx.current = i; };
  const onDrop = (i: number) => {
    if (dragIdx.current === null || dragIdx.current === i) return;
    const arr = [...pages];
    const [moved] = arr.splice(dragIdx.current, 1);
    arr.splice(i, 0, moved);
    setPages(arr);
    dragIdx.current = null;
  };

  const rotateOne = (i: number) => setPages(ps => ps.map((p,j) => j===i ? {...p, rotation:(p.rotation+90)%360} : p));
  const deleteOne = (i: number) => setPages(ps => ps.filter((_,j) => j!==i));

  const apply = useCallback(async () => {
    if (!file || pages.length === 0) return;
    setLoading(true); setError('');
    try {
      const { PDFDocument, degrees } = await import('pdf-lib');
      const src = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const out = await PDFDocument.create();
      for (const p of pages) {
        const [copied] = await out.copyPages(src, [p.idx]);
        if (p.rotation) copied.setRotation(degrees(p.rotation));
        out.addPage(copied);
      }
      const bytes = await out.save();
      const url = URL.createObjectURL(new Blob([bytes as unknown as BlobPart], { type: 'application/pdf' }));
      const a = document.createElement('a'); a.href=url; a.download=file.name.replace('.pdf','-organised.pdf'); a.click();
      URL.revokeObjectURL(url);
      setStatus(`✅ Saved ${pages.length} pages in new order!`);
    } catch (e: any) { setError(e.message); }
    setLoading(false);
  }, [file, pages]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <LayoutGrid className="h-8 w-8 text-primary" />
        <div><h1 className="text-2xl font-bold">Organise PDF</h1>
          <p className="text-sm text-muted-foreground">Drag to reorder, rotate or delete pages — 100% in-browser</p></div>
      </div>
      <label htmlFor="org-file" className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 mb-4 cursor-pointer hover:border-primary/50 transition-colors">
        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-sm font-medium">{file ? file.name : 'Upload PDF'}</p>
        <input id="org-file" type="file" accept=".pdf" onChange={handleFile} className="hidden" />
      </label>
      {loading && <div className="text-sm text-center text-muted-foreground mb-3 flex items-center justify-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />{progress || 'Processing…'}</div>}
      {error && <div className="flex items-center gap-2 text-destructive text-sm mb-3"><AlertCircle className="h-4 w-4"/>{error}</div>}
      {status && <div className="text-sm text-green-600 mb-3">{status}</div>}
      {pages.length > 0 && (
        <>
          <div className="text-xs text-muted-foreground mb-3">Drag pages to reorder · {pages.length} pages</div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-4">
            {pages.map((p, i) => (
              <div key={`${p.idx}-${i}`}
                draggable onDragStart={() => onDragStart(i)} onDragOver={e => e.preventDefault()} onDrop={() => onDrop(i)}
                className="group relative border-2 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing hover:border-primary transition-colors bg-white">
                <img src={p.thumb} alt={`Page ${i+1}`} className="w-full object-contain"
                  style={{ transform: `rotate(${p.rotation}deg)`, transition: 'transform 0.2s' }} />
                <div className="absolute top-0 left-0 right-0 flex justify-between p-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-b from-black/50 to-transparent">
                  <button onClick={() => rotateOne(i)} className="text-white p-0.5 rounded hover:bg-white/20"><RotateCw className="h-3.5 w-3.5" /></button>
                  <button onClick={() => deleteOne(i)} className="text-red-300 p-0.5 rounded hover:bg-white/20"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
                <div className="text-center text-xs py-0.5 bg-muted/80 font-medium">{i+1}</div>
              </div>
            ))}
          </div>
          <button onClick={apply} disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
            {loading ? <Loader2 className="h-4 w-4 animate-spin"/> : <Download className="h-4 w-4"/>}
            {loading ? 'Saving…' : 'Save Organised PDF & Download'}
          </button>
        </>
      )}
    </div>
  );
}
