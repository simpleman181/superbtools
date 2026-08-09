"use client";

import { useState, useRef } from "react";
import { ImageIcon, Download, Shield } from "lucide-react";

export default function ExifRemover() {
  const [image, setImage] = useState<string | null>(null);
  const [cleaned, setCleaned] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
    setCleaned(null);
  };

  const strip = () => {
    if (!image || !canvasRef.current) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      setCleaned(canvas.toDataURL('image/jpeg', 0.95));
    };
    img.src = image;
  };

  const download = () => {
    if (!cleaned) return;
    const a = document.createElement('a');
    a.href = cleaned;
    a.download = 'cleaned.jpg';
    a.click();
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">EXIF Metadata Remover</h1>
          <p className="text-sm text-muted-foreground">Strip GPS, camera model, and dates from images</p>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {!image ? (
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-12 text-center">
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" id="exif-input" />
          <label htmlFor="exif-input" className="cursor-pointer">
            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-sm font-medium">Upload an image to strip metadata</p>
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <img src={image} alt="Original" className="max-h-48 mx-auto rounded-lg border" />
          <div className="flex justify-center gap-2">
            <button onClick={strip} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">Strip Metadata</button>
            <button onClick={() => { setImage(null); setCleaned(null); }} className="px-4 py-2 border rounded-md text-sm">Clear</button>
          </div>
          {cleaned && (
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-green-600">✓ Metadata removed</span>
                <button onClick={download} className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-xs"><Download className="h-3 w-3" /> Download</button>
              </div>
              <img src={cleaned} alt="Cleaned" className="max-h-48 mx-auto rounded border" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
