'use client';
import { useState, useCallback } from 'react';
import { ImageIcon, Upload, Download, Loader2, AlertCircle, X, GripVertical } from 'lucide-react';

interface ImgFile { file: File; url: string; }

export default function ImageToPdf() {
  const [images, setImages] = useState<ImgFile[]>([]);
  const [pageSize, setPageSize] = useState<'fit'|'a4'|'letter'>('fit');
  const [margin, setMargin] = useState(20);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImgs = files.map(f => ({ file: f, url: URL.createObjectURL(f) }));
    setImages(prev => [...prev, ...newImgs]);
    setStatus(''); setError('');
  };

  const remove = (i: number) => {
    URL.revokeObjectURL(images[i].url);
    setImages(imgs => imgs.filter((_, j) => j !== i));
  };

  const move = (i: number, dir: -1|1) => {
    const arr = [...images];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setImages(arr);
  };

  const apply = useCallback(async () => {
    if (images.length === 0) return;
    setLoading(true); setError('');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const doc = await PDFDocument.create();
      const A4 = { width: 595, height: 842 };
      const LETTER = { width: 612, height: 792 };

      for (const { file } of images) {
        const bytes = await file.arrayBuffer();
        let img;
        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
          img = await doc.embedJpg(bytes);
        } else {
          img = await doc.embedPng(bytes);
        }
        let pgW, pgH;
        if (pageSize === 'a4') { pgW = A4.width; pgH = A4.height; }
        else if (pageSize === 'letter') { pgW = LETTER.width; pgH = LETTER.height; }
        else { pgW = img.width; pgH = img.height; }
        const page = doc.addPage([pgW, pgH]);
        const available = { width: pgW - margin * 2, height: pgH - margin * 2 };
        const scale = Math.min(available.width / img.width, available.height / img.height, 1);
        const w = img.width * scale;
        const h = img.height * scale;
        page.drawImage(img, { x: (pgW - w) / 2, y: (pgH - h) / 2, width: w, height: h });
      }
      const out = await doc.save();
      const url = URL.createObjectURL(new Blob([out as unknown as BlobPart], { type: 'application/pdf' }));
      const a = document.createElement('a'); a.href = url; a.download = 'images.pdf'; a.click();
      URL.revokeObjectURL(url);
      setStatus(`✅ Created PDF with ${images.length} image(s)!`);
    } catch (e: any) { setError(e.message); }
    setLoading(false);
  }, [images, pageSize, margin]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <ImageIcon className="h-8 w-8 text-primary" />
        <div><h1 className="text-2xl font-bold">Image to PDF</h1>
          <p className="text-sm text-muted-foreground">Convert JPG/PNG images to a PDF — drag to reorder — 100% in-browser</p></div>
      </div>
      <label htmlFor="img-file" className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 mb-4 cursor-pointer hover:border-primary/50 transition-colors">
        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-sm font-medium">Upload JPG or PNG images</p>
        <p className="text-xs text-muted-foreground mt-1">Multiple files supported</p>
        <input id="img-file" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleFiles} className="hidden" />
      </label>
      {images.length > 0 && (
        <div className="rounded-xl border bg-card p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">{images.length} image(s)</p>
            <button onClick={() => { images.forEach(i => URL.revokeObjectURL(i.url)); setImages([]); }} className="text-xs text-muted-foreground hover:text-destructive">Clear all</button>
          </div>
          <div className="space-y-1 max-h-52 overflow-y-auto mb-3">
            {images.map((img, i) => (
              <div key={img.url} className="flex items-center gap-2 rounded bg-muted px-2 py-1.5 text-sm">
                <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <img src={img.url} alt="" className="h-8 w-8 object-cover rounded flex-shrink-0" />
                <span className="flex-1 truncate text-xs">{img.file.name}</span>
                <div className="flex gap-1">
                  <button onClick={() => move(i,-1)} disabled={i===0} className="px-1 text-xs disabled:opacity-30">↑</button>
                  <button onClick={() => move(i,1)} disabled={i===images.length-1} className="px-1 text-xs disabled:opacity-30">↓</button>
                  <button onClick={() => remove(i)} className="text-destructive"><X className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs text-muted-foreground block mb-1">Page size</label>
              <select value={pageSize} onChange={e => setPageSize(e.target.value as any)}
                className="w-full rounded-md border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="fit">Fit to image</option>
                <option value="a4">A4</option>
                <option value="letter">US Letter</option>
              </select></div>
            <div><label className="text-xs text-muted-foreground block mb-1">Margin: {margin}pt</label>
              <input type="range" min={0} max={72} value={margin} onChange={e => setMargin(Number(e.target.value))} className="w-full mt-2" /></div>
          </div>
        </div>
      )}
      {error && <div className="flex items-center gap-2 text-destructive text-sm mb-3"><AlertCircle className="h-4 w-4" />{error}</div>}
      {status && <div className="text-sm text-green-600 mb-3">{status}</div>}
      <button onClick={apply} disabled={loading || images.length === 0}
        className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {loading ? 'Creating PDF...' : `Convert ${images.length > 0 ? images.length + ' Image(s)' : 'Images'} to PDF`}
      </button>
    </div>
  );
}
