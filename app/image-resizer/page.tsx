'use client';
"use client";

import { useState, useRef } from "react";
import { ImageIcon, Download, Trash2 } from "lucide-react";

export default function ImageResizer() {
  const [image, setImage] = useState<string | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [originalSize, setOriginalSize] = useState({ w: 0, h: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        setOriginalSize({ w: img.width, h: img.height });
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = reader.result as string;
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const resize = () => {
    if (!image || !canvasRef.current) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, width, height);
    };
    img.src = image;
  };

  const download = () => {
    if (!canvasRef.current) return;
    const a = document.createElement('a');
    a.href = canvasRef.current.toDataURL('image/png');
    a.download = 'resized.png';
    a.click();
  };

  const updateWidth = (w: number) => {
    setWidth(w);
    if (maintainAspect && originalSize.w > 0) {
      setHeight(Math.round(w * originalSize.h / originalSize.w));
    }
  };

  const updateHeight = (h: number) => {
    setHeight(h);
    if (maintainAspect && originalSize.h > 0) {
      setWidth(Math.round(h * originalSize.w / originalSize.h));
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <ImageIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Image Resizer & Cropper</h1>
          <p className="text-sm text-muted-foreground">Resize images locally in your browser</p>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {!image ? (
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-12 text-center">
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" id="resize-input" />
          <label htmlFor="resize-input" className="cursor-pointer">
            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-sm font-medium">Click to upload an image</p>
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Original: {originalSize.w}×{originalSize.h}</span>
            <button onClick={() => { setImage(null); setOriginalSize({ w: 0, h: 0 }); }} className="text-destructive"><Trash2 className="h-4 w-4" /></button>
          </div>
          <img src={image} alt="Preview" className="max-h-48 mx-auto rounded-lg border" />

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={maintainAspect} onChange={(e) => setMaintainAspect(e.target.checked)} className="h-4 w-4" /> Maintain aspect ratio</label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-medium block mb-1">Width (px)</label><input type="number" value={width} onChange={(e) => updateWidth(Number(e.target.value))} className="w-full rounded-md border px-3 py-2 text-sm" /></div>
            <div><label className="text-sm font-medium block mb-1">Height (px)</label><input type="number" value={height} onChange={(e) => updateHeight(Number(e.target.value))} className="w-full rounded-md border px-3 py-2 text-sm" /></div>
          </div>

          <div className="flex gap-2">
            <button onClick={resize} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">Resize</button>
            <button onClick={download} className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm hover:bg-accent"><Download className="h-4 w-4" /> Download</button>
          </div>
        </div>
      )}
    </div>
  );
}
