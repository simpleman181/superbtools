"use client";

import { useState } from "react";
import { PenTool, Copy, Check } from "lucide-react";

export default function SvgPathEditor() {
  const [path, setPath] = useState('M10 10 L90 10 L90 90 L10 90 Z');
  const [viewBox, setViewBox] = useState('0 0 100 100');
  const [stroke, setStroke] = useState('#3b82f6');
  const [fill, setFill] = useState('none');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [copied, setCopied] = useState(false);

  const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="200" height="200">\n  <path d="${path}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />\n</svg>`;

  const copy = () => {
    navigator.clipboard.writeText(svgCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <PenTool className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">SVG Path Editor</h1>
          <p className="text-sm text-muted-foreground">Edit and preview SVG path data</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div><label className="text-xs text-muted-foreground block mb-1">Stroke</label><input type="color" value={stroke} onChange={(e) => setStroke(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>
        <div><label className="text-xs text-muted-foreground block mb-1">Fill</label><input type="color" value={fill} onChange={(e) => setFill(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium block mb-1">Path Data (d attribute)</label>
        <textarea value={path} onChange={(e) => setPath(e.target.value)} className="w-full h-24 rounded-md border bg-background px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
      </div>

      <div className="rounded-lg border bg-card p-6 mb-4 flex justify-center">
        <svg viewBox={viewBox} width="200" height="200" className="border rounded bg-white">
          <path d={path} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      </div>

      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">SVG Code</label>
          <button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">{copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}{copied ? "Copied!" : "Copy"}</button>
        </div>
        <pre className="text-xs font-mono bg-muted rounded p-3 overflow-auto">{svgCode}</pre>
      </div>
    </div>
  );
}
