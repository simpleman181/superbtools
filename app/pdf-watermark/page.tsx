'use client';
import { useState, useCallback } from 'react';
import { Droplets, Upload, Download, Loader2, AlertCircle } from 'lucide-react';

export default function PdfWatermark() {
  const [file, setFile] = useState<File|null>(null);
  const [text, setText] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState(0.3);
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState('#ff0000');
  const [position, setPosition] = useState<'diagonal'|'center'|'header'|'footer'>('diagonal');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1,3),16)/255;
    const g = parseInt(hex.slice(3,5),16)/255;
    const b = parseInt(hex.slice(5,7),16)/255;
    return {r,g,b};
  };

  const apply = useCallback(async () => {
    if (!file || !text.trim()) return;
    setLoading(true); setError('');
    try {
      const { PDFDocument, rgb, StandardFonts, degrees } = await import('pdf-lib');
      const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const {r,g,b} = hexToRgb(color);
      doc.getPages().forEach(page => {
        const {width,height} = page.getSize();
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        let x=0, y=0, rotate=degrees(0);
        if (position==='diagonal') { x=(width-textWidth)/2; y=(height-fontSize)/2; rotate=degrees(45); }
        else if (position==='center') { x=(width-textWidth)/2; y=(height-fontSize)/2; }
        else if (position==='header') { x=(width-textWidth)/2; y=height-fontSize-20; }
        else { x=(width-textWidth)/2; y=20; }
        page.drawText(text, { x, y, size:fontSize, font, color:rgb(r,g,b), opacity, rotate });
      });
      const out = await doc.save();
      const url = URL.createObjectURL(new Blob([out as unknown as BlobPart],{type:'application/pdf'}));
      const a=document.createElement('a'); a.href=url; a.download=file.name.replace('.pdf','-watermarked.pdf'); a.click();
      URL.revokeObjectURL(url);
      setStatus('✅ Watermarked PDF downloaded!');
    } catch(e:any){setError(e.message);}
    setLoading(false);
  },[file,text,opacity,fontSize,color,position]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Droplets className="h-8 w-8 text-primary"/>
        <div><h1 className="text-2xl font-bold">Watermark PDF</h1>
          <p className="text-sm text-muted-foreground">Add text watermark to every page — 100% in-browser</p></div>
      </div>
      <label htmlFor="wm-file" className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 mb-6 cursor-pointer hover:border-primary/50 transition-colors">
        <Upload className="h-10 w-10 text-muted-foreground mb-2"/>
        <p className="text-sm font-medium">{file ? file.name : 'Upload PDF'}</p>
        <input id="wm-file" type="file" accept=".pdf" onChange={e=>{setFile(e.target.files?.[0]||null);setStatus('');setError('');}} className="hidden"/>
      </label>
      <div className="rounded-xl border bg-card p-4 mb-4 space-y-4">
        <div><label className="text-sm font-medium block mb-1">Watermark Text</label>
          <input value={text} onChange={e=>setText(e.target.value)} placeholder="e.g. CONFIDENTIAL, DRAFT..."
            className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"/></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="text-sm font-medium block mb-1">Position</label>
            <select value={position} onChange={e=>setPosition(e.target.value as any)}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="diagonal">Diagonal (center)</option>
              <option value="center">Center</option>
              <option value="header">Header</option>
              <option value="footer">Footer</option>
            </select></div>
          <div><label className="text-sm font-medium block mb-1">Color</label>
            <input type="color" value={color} onChange={e=>setColor(e.target.value)}
              className="w-full h-9 rounded-md border cursor-pointer"/></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="text-sm font-medium block mb-1">Font Size: {fontSize}px</label>
            <input type="range" min={12} max={120} value={fontSize} onChange={e=>setFontSize(Number(e.target.value))} className="w-full"/></div>
          <div><label className="text-sm font-medium block mb-1">Opacity: {Math.round(opacity*100)}%</label>
            <input type="range" min={5} max={100} value={Math.round(opacity*100)} onChange={e=>setOpacity(Number(e.target.value)/100)} className="w-full"/></div>
        </div>
      </div>
      {error&&<div className="flex items-center gap-2 text-destructive text-sm mb-3"><AlertCircle className="h-4 w-4"/>{error}</div>}
      {status&&<div className="text-sm text-green-600 mb-3">{status}</div>}
      <button onClick={apply} disabled={loading||!file||!text.trim()}
        className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
        {loading?<Loader2 className="h-4 w-4 animate-spin"/>:<Download className="h-4 w-4"/>}
        {loading?'Adding Watermark...':'Apply Watermark & Download'}
      </button>
    </div>
  );
}
