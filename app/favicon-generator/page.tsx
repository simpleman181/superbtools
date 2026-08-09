"use client";

import { useState, useRef } from "react";
import { ImageIcon, Download } from "lucide-react";

const sizes = [16, 32, 48, 64, 128, 192, 256, 512];

export default function FaviconGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const generate = (size: number) => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `favicon-${size}x${size}.png`;
      a.click();
    };
    img.src = image;
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <ImageIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Favicon Generator</h1>
          <p className="text-sm text-muted-foreground">Generate favicons in multiple standard sizes</p>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {!image ? (
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-12 text-center">
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" id="favicon-input" />
          <label htmlFor="favicon-input" className="cursor-pointer">
            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-sm font-medium">Upload a square image (recommended 512×512)</p>
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <img src={image} alt="Preview" className="max-h-32 mx-auto rounded-lg border" />
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {sizes.map((s) => (
              <button key={s} onClick={() => generate(s)} className="flex flex-col items-center gap-1 p-3 rounded-lg border hover:bg-accent text-sm">
                <span className="font-mono text-xs">{s}×{s}</span>
                <Download className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
          <div className="rounded-lg border bg-card p-4">
            <h3 className="text-sm font-semibold mb-2">HTML Link Tags</h3>
            <pre className="text-xs font-mono bg-muted rounded p-3 overflow-auto">
{`<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/favicon-180x180.png">
<link rel="manifest" href="/site.webmanifest">`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
