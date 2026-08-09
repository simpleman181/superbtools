"use client";

import { useState } from "react";
import { Palette, Copy, Check } from "lucide-react";

export default function GradientGenerator() {
  const [color1, setColor1] = useState('#3b82f6');
  const [color2, setColor2] = useState('#8b5cf6');
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [copied, setCopied] = useState(false);

  const css = type === 'linear'
    ? `background: linear-gradient(${angle}deg, ${color1}, ${color2});`
    : `background: radial-gradient(circle, ${color1}, ${color2});`;

  const copy = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const presets = [
    ['#ff6b6b', '#feca57'], ['#48dbfb', '#ff9ff3'], ['#54a0ff', '#5f27cd'],
    ['#00d2d3', '#01a3a4'], ['#ff9f43', '#ee5253'], ['#10ac84', '#1dd1a1'],
    ['#5f27cd', '#341f97'], ['#ff6b81', '#ff4757'], ['#2ed573', '#7bed9f'],
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Palette className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">CSS Gradient Generator</h1>
          <p className="text-sm text-muted-foreground">Create beautiful CSS gradients with sliders</p>
        </div>
      </div>

      <div
        className="h-48 rounded-xl border shadow-lg mb-6"
        style={{ background: type === 'linear' ? `linear-gradient(${angle}deg, ${color1}, ${color2})` : `radial-gradient(circle, ${color1}, ${color2})` }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3">
          <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-12 h-12 rounded cursor-pointer" />
          <div className="flex-1">
            <label className="text-xs text-muted-foreground block">Color 1</label>
            <input value={color1} onChange={(e) => setColor1(e.target.value)} className="w-full font-mono text-sm border rounded px-2 py-1" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-12 h-12 rounded cursor-pointer" />
          <div className="flex-1">
            <label className="text-xs text-muted-foreground block">Color 2</label>
            <input value={color2} onChange={(e) => setColor2(e.target.value)} className="w-full font-mono text-sm border rounded px-2 py-1" />
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setType('linear')} className={`px-3 py-1.5 rounded-md text-sm ${type === 'linear' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>Linear</button>
        <button onClick={() => setType('radial')} className={`px-3 py-1.5 rounded-md text-sm ${type === 'radial' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>Radial</button>
      </div>

      {type === 'linear' && (
        <div className="mb-4">
          <label className="text-sm font-medium block mb-1">Angle: {angle}°</label>
          <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full" />
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {presets.map(([c1, c2], i) => (
          <button key={i} onClick={() => { setColor1(c1); setColor2(c2); }} className="w-10 h-10 rounded-full border-2 border-transparent hover:border-primary transition-colors" style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }} />
        ))}
      </div>

      <div className="rounded-lg border bg-card p-4 flex items-center justify-between">
        <code className="font-mono text-sm">{css}</code>
        <button onClick={copy} className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
