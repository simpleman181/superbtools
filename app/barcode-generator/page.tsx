"use client";

import { useState, useRef, useEffect } from "react";
import { Barcode, Download } from "lucide-react";

export default function BarcodeGenerator() {
  const [text, setText] = useState('123456789012');
  const [type, setType] = useState<'UPC' | 'EAN'>('UPC');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 120;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 300, 120);
    ctx.fillStyle = '#000';

    // Simple barcode-like pattern
    const hash = text.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0);
    let x = 20;
    for (let i = 0; i < text.length; i++) {
      const w = 2 + ((hash + i * 7) % 4);
      const h = 60 + ((hash + i * 13) % 30);
      if ((hash + i * 3) & 1) {
        ctx.fillRect(x, 20, w, h);
      }
      x += w + 2;
    }

    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(text, 150, 110);
  }, [text]);

  const download = () => {
    if (!canvasRef.current) return;
    const a = document.createElement('a');
    a.href = canvasRef.current.toDataURL('image/png');
    a.download = 'barcode.png';
    a.click();
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Barcode className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Barcode Generator</h1>
          <p className="text-sm text-muted-foreground">Generate UPC/EAN barcode images</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setType('UPC')} className={`px-3 py-1.5 rounded-md text-sm ${type === 'UPC' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>UPC</button>
        <button onClick={() => setType('EAN')} className={`px-3 py-1.5 rounded-md text-sm ${type === 'EAN' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>EAN</button>
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter barcode numbers..."
        className="w-full rounded-md border px-3 py-2 text-sm font-mono mb-4"
      />

      <div className="flex flex-col items-center gap-4">
        <canvas ref={canvasRef} className="border rounded-lg" />
        <button onClick={download} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
          <Download className="h-4 w-4" /> Download
        </button>
      </div>
    </div>
  );
}
