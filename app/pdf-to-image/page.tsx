'use client';
import { useState, useCallback } from 'react';
import { ImageIcon, Upload, Download, Loader2, AlertCircle } from 'lucide-react';

export default function PdfToImage() {
  const [file, setFile] = useState<File|null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [format, setFormat] = useState<'png'|'jpeg'>('png');
  const [quality, setQuality] = useState(0.92);
  const [dpi, setDpi] = useState(150);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');

  const convert = useCallback(async () => {
    if (!file) return;
    setLoading(true); setError(''); setImages([]);
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
      const scale = dpi / 72;
      const bytes = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      const urls: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(`Rendering page ${i} of ${pdf.numPages}…`);
        const page = await pdf.getPage(i);
        const vp = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        canvas.width = vp.width; canvas.height = vp.height;
        const ctx = canvas.getContext('2d')!;
        await (page as any).render({ canvasContext: ctx, viewport: vp }).promise;
        urls.push(canvas.toDataURL(`image/${format}`, quality));
      }
      setImages(urls);
      setProgress('');
    } catch (e: any) { setError(e.message); }
    setLoading(false);
  }, [file, format, quality, dpi]);

  const downloadAll = () => {
    images.forEach((url, i) => {
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file!.name.replace('.pdf','')}-page-${i+1}.${format}`;
      a.click();
    });
  };

  const downloadOne = (url: string, i: number) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file!.name.replace('.pdf','')}-page-${i+1}.${format}`;
    a.click();
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <ImageIcon className="h-8 w-8 text-primary" />
        <div><h1 className="text-2xl font-bold">PDF to Image</h1>
          <p className="text-sm text-muted-foreground">Convert PDF pages to PNG or JPG — 100% in-browser</p></div>
      </div>
      <label htmlFor="pti-file" className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 mb-6 cursor-pointer hover:border-primary/50 transition-colors">
        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-sm font-medium">{file ? file.name : 'Upload PDF'}</p>
        <input id="pti-file" type="file" accept=".pdf" onChange={e => { setFile(e.target.files?.[0]||null); setImages([]); setError(''); }} className="hidden" />
      </label>
      <div className="rounded-xl border bg-card p-4 mb-4 grid grid-cols-3 gap-4">
        <div><label className="text-xs text-muted-foreground block mb-1">Format</label>
          <select value={format} onChange={e => setFormat(e.target.value as any)}
            className="w-full rounded-md border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="png">PNG (lossless)</option>
            <option value="jpeg">JPEG (smaller)</option>
          </select></div>
        <div><label className="text-xs text-muted-foreground block mb-1">DPI: {dpi}</label>
          <input type="range" min={72} max={300} step={36} value={dpi} onChange={e => setDpi(Number(e.target.value))} className="w-full mt-2" /></div>
        {format === 'jpeg' && (
          <div><label className="text-xs text-muted-foreground block mb-1">Quality: {Math.round(quality*100)}%</label>
            <input type="range" min={0.5} max={1} step={0.05} value={quality} onChange={e => setQuality(Number(e.target.value))} className="w-full mt-2" /></div>
        )}
      </div>
      {error && <div className="flex items-center gap-2 text-destructive text-sm mb-3"><AlertCircle className="h-4 w-4" />{error}</div>}
      <button onClick={convert} disabled={loading || !file}
        className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60 mb-4">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
        {loading ? progress || 'Converting...' : 'Convert to Images'}
      </button>
      {images.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium">{images.length} page(s) converted</p>
            <button onClick={downloadAll} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-xs font-medium hover:bg-primary/90">
              <Download className="h-3.5 w-3.5" /> Download All
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {images.map((url, i) => (
              <div key={i} className="relative group border rounded-lg overflow-hidden cursor-pointer" onClick={() => downloadOne(url,i)}>
                <img src={url} alt={`Page ${i+1}`} className="w-full object-contain bg-white" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Download className="h-6 w-6 text-white" />
                </div>
                <div className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">P{i+1}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
