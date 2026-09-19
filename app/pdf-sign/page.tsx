'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { PenLine, Upload, Download, Loader2, AlertCircle, Trash2 } from 'lucide-react';

export default function PdfSign() {
  const [file, setFile] = useState<File|null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [targetPage, setTargetPage] = useState(1);
  const [sigX, setSigX] = useState(100);
  const [sigY, setSigY] = useState(700);
  const [sigW, setSigW] = useState(200);
  const [sigH, setSigH] = useState(60);
  const [drawing, setDrawing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPos = useRef<{x:number;y:number}|null>(null);

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#fff'; ctx.fillRect(0,0,c.width,c.height);
    ctx.strokeStyle = '#1e40af'; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  }, []);

  const getPos = (e: React.MouseEvent|React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const src = 'touches' in e ? e.touches[0] : e;
    return { x: (src.clientX - rect.left) * (canvas.width / rect.width), y: (src.clientY - rect.top) * (canvas.height / rect.height) };
  };

  const startDraw = (e: React.MouseEvent|React.TouchEvent) => {
    e.preventDefault();
    const c = canvasRef.current; if (!c) return;
    setDrawing(true); lastPos.current = getPos(e, c);
  };
  const draw = (e: React.MouseEvent|React.TouchEvent) => {
    if (!drawing || !canvasRef.current) return;
    e.preventDefault();
    const c = canvasRef.current;
    const ctx = c.getContext('2d')!;
    const pos = getPos(e, c);
    ctx.beginPath();
    ctx.moveTo(lastPos.current!.x, lastPos.current!.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
  };
  const endDraw = () => { setDrawing(false); lastPos.current = null; };

  const clearSig = () => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#fff'; ctx.fillRect(0,0,c.width,c.height);
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setFile(f); setStatus(''); setError('');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const doc = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
      setPageCount(doc.getPageCount());
    } catch(e:any) { setError(e.message); }
  };

  const apply = useCallback(async () => {
    if (!file || !canvasRef.current) return;
    setLoading(true); setError('');
    try {
      const sigCanvas = canvasRef.current;
      const sigDataUrl = sigCanvas.toDataURL('image/png');
      const sigResponse = await fetch(sigDataUrl);
      const sigBytes = await sigResponse.arrayBuffer();

      const { PDFDocument } = await import('pdf-lib');
      const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const sigImg = await doc.embedPng(sigBytes);
      const pages = doc.getPages();
      const page = pages[targetPage - 1];
      const { height } = page.getSize();
      page.drawImage(sigImg, { x: sigX, y: height - sigY - sigH, width: sigW, height: sigH });
      const out = await doc.save();
      const url = URL.createObjectURL(new Blob([out as unknown as BlobPart], { type:'application/pdf' }));
      const a = document.createElement('a'); a.href=url; a.download=file.name.replace('.pdf','-signed.pdf'); a.click();
      URL.revokeObjectURL(url);
      setStatus('✅ Signed PDF downloaded!');
    } catch(e:any) { setError(e.message); }
    setLoading(false);
  }, [file, targetPage, sigX, sigY, sigW, sigH]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <PenLine className="h-8 w-8 text-primary"/>
        <div><h1 className="text-2xl font-bold">Sign PDF</h1>
          <p className="text-sm text-muted-foreground">Draw your signature and embed it in a PDF — 100% in-browser</p></div>
      </div>
      <div className="mb-4 text-xs rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 px-3 py-2">
        <strong>Note:</strong> This adds a visual signature image. It is not a cryptographic e-signature (like DocuSign). Your file never leaves your device.
      </div>
      <div className="rounded-xl border bg-card p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Draw your signature</label>
          <button onClick={clearSig} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5"/>Clear</button>
        </div>
        <canvas ref={canvasRef} width={500} height={120}
          className="w-full border rounded-lg cursor-crosshair bg-white touch-none"
          style={{touchAction:'none'}}
          onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
          onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw}/>
        <p className="text-xs text-muted-foreground mt-1">Draw above with mouse or touch</p>
      </div>
      <label htmlFor="sign-file" className="flex items-center gap-2 border rounded-xl p-4 mb-4 cursor-pointer hover:bg-accent transition-colors">
        <Upload className="h-5 w-5 text-muted-foreground"/>
        <span className="text-sm">{file ? file.name : 'Upload PDF to sign'}</span>
        <input id="sign-file" type="file" accept=".pdf" onChange={handleFile} className="hidden"/>
      </label>
      {file && pageCount > 0 && (
        <div className="rounded-xl border bg-card p-4 mb-4 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div><label className="text-xs text-muted-foreground block mb-1">Page</label>
              <input type="number" min={1} max={pageCount} value={targetPage} onChange={e=>setTargetPage(Number(e.target.value))}
                className="w-full rounded-md border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"/></div>
            <div><label className="text-xs text-muted-foreground block mb-1">X position (pt)</label>
              <input type="number" min={0} value={sigX} onChange={e=>setSigX(Number(e.target.value))}
                className="w-full rounded-md border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"/></div>
            <div><label className="text-xs text-muted-foreground block mb-1">Y from top (pt)</label>
              <input type="number" min={0} value={sigY} onChange={e=>setSigY(Number(e.target.value))}
                className="w-full rounded-md border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"/></div>
            <div><label className="text-xs text-muted-foreground block mb-1">Width (pt)</label>
              <input type="number" min={50} value={sigW} onChange={e=>setSigW(Number(e.target.value))}
                className="w-full rounded-md border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"/></div>
            <div><label className="text-xs text-muted-foreground block mb-1">Height (pt)</label>
              <input type="number" min={20} value={sigH} onChange={e=>setSigH(Number(e.target.value))}
                className="w-full rounded-md border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"/></div>
          </div>
        </div>
      )}
      {error && <div className="flex items-center gap-2 text-destructive text-sm mb-3"><AlertCircle className="h-4 w-4"/>{error}</div>}
      {status && <div className="text-sm text-green-600 mb-3">{status}</div>}
      <button onClick={apply} disabled={loading||!file}
        className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
        {loading?<Loader2 className="h-4 w-4 animate-spin"/>:<Download className="h-4 w-4"/>}
        {loading?'Signing…':'Embed Signature & Download'}
      </button>
    </div>
  );
}
