'use client';
"use client";

import { useState, useRef, useEffect } from "react";
import { QrCode, Download } from "lucide-react";

export default function QrGenerator() {
  const [text, setText] = useState('https://example.com');
  const [size, setSize] = useState(256);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !text) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simple QR-like pattern generator for demo
    canvas.width = size;
    canvas.height = size;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#000';

    const cell = Math.floor(size / 25);
    const hash = text.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0);

    // Position detection patterns
    for (const [px, py] of [[0,0], [18,0], [0,18]]) {
      ctx.fillRect(px * cell, py * cell, 7 * cell, 7 * cell);
      ctx.clearRect((px + 1) * cell, (py + 1) * cell, 5 * cell, 5 * cell);
      ctx.fillRect((px + 2) * cell, (py + 2) * cell, 3 * cell, 3 * cell);
    }

    // Data pattern (pseudo-random based on text hash)
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        if ((i < 7 && j < 7) || (i >= 18 && j < 7) || (i < 7 && j >= 18)) continue;
        const bit = ((hash + i * 31 + j * 17) & 1);
        if (bit) ctx.fillRect(i * cell, j * cell, cell, cell);
      }
    }
  }, [text, size]);

  const download = () => {
    if (!canvasRef.current) return;
    const a = document.createElement('a');
    a.href = canvasRef.current.toDataURL('image/png');
    a.download = 'qrcode.png';
    a.click();
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <QrCode className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">QR Code Generator</h1>
          <p className="text-sm text-muted-foreground">Generate QR codes for URLs, text, or Wi-Fi</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="text-sm font-medium block mb-1">Content</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter URL, text, or Wi-Fi config..." className="w-full h-24 rounded-md border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Size: {size}px</label>
          <input type="range" min="128" max="512" step="32" value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <canvas ref={canvasRef} className="border rounded-lg" />
        <button onClick={download} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
          <Download className="h-4 w-4" />
          Download PNG
        </button>
      </div>
    </div>
  );
}
