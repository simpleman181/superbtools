"use client";

import { useState, useRef } from "react";
import { ImageIcon, Download, Trash2 } from "lucide-react";

export default function ImageConverter() {
  const [image, setImage] = useState<string | null>(null);
  const [format, setFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/webp');
  const [quality, setQuality] = useState(0.85);
  const [converted, setConverted] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name.replace(/\.[^/.]+$/, ''));
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
    setConverted(null);
  };

  const convert = () => {
    if (!image || !canvasRef.current) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL(format, quality);
      setConverted(dataUrl);
    };
    img.src = image;
  };

  const download = () => {
    if (!converted) return;
    const a = document.createElement('a');
    a.href = converted;
    const ext = format.split('/')[1];
    a.download = `${fileName || 'converted'}.${ext}`;
    a.click();
  };

  const clear = () => {
    setImage(null);
    setConverted(null);
    setFileName('');
  };

  const formatLabel = { 'image/png': 'PNG', 'image/jpeg': 'JPG', 'image/webp': 'WebP' };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <ImageIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Image Format Converter</h1>
          <p className="text-sm text-muted-foreground">Convert images using HTML5 Canvas API</p>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {!image ? (
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-12 text-center hover:border-primary/50 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
            id="image-input"
          />
          <label htmlFor="image-input" className="cursor-pointer">
            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-sm font-medium">Click to upload an image</p>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP, GIF supported</p>
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{fileName}</span>
            <button onClick={clear} className="text-destructive hover:text-destructive/80">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <img src={image} alt="Preview" className="max-h-64 mx-auto rounded-lg border" />

          <div className="flex items-center gap-4">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as any)}
                className="rounded-md border px-3 py-1.5 text-sm"
              >
                <option value="image/webp">WebP</option>
                <option value="image/png">PNG</option>
                <option value="image/jpeg">JPG</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs text-muted-foreground block mb-1">Quality: {Math.round(quality * 100)}%</label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <button onClick={convert} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
              Convert
            </button>
          </div>

          {converted && (
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Converted to {formatLabel[format]}</span>
                <button onClick={download} className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-xs font-medium hover:bg-primary/90">
                  <Download className="h-3 w-3" />
                  Download
                </button>
              </div>
              <img src={converted} alt="Converted" className="max-h-48 mx-auto rounded border" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
