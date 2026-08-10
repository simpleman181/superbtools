'use client';
"use client";

import { useState, useEffect } from "react";
import { Palette, Copy, Check } from "lucide-react";

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function getLuminance(r: number, g: number, b: number) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(l1: number, l2: number) {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export default function ColorPicker() {
  const [hex, setHex] = useState('#3b82f6');
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [bgHex, setBgHex] = useState('#ffffff');
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const parsed = hexToRgb(hex);
    if (parsed) setRgb(parsed);
  }, [hex]);

  const updateFromRgb = (key: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...rgb, [key]: Math.min(255, Math.max(0, value)) };
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const contrast = getContrastRatio(getLuminance(rgb.r, rgb.g, rgb.b), getLuminance(
    hexToRgb(bgHex)?.r || 255,
    hexToRgb(bgHex)?.g || 255,
    hexToRgb(bgHex)?.b || 255
  ));

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const presetColors = [
    '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e',
    '#14b8a6', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6',
    '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#000000',
    '#ffffff', '#64748b', '#94a3b8',
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Palette className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Color Picker & Contrast Checker</h1>
          <p className="text-sm text-muted-foreground">Select colors and check accessibility contrast</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div
            className="h-32 rounded-xl border shadow-inner flex items-center justify-center text-lg font-bold"
            style={{ backgroundColor: hex, color: getLuminance(rgb.r, rgb.g, rgb.b) > 0.5 ? '#000' : '#fff' }}
          >
            Preview Text
          </div>

          <div className="rounded-lg border bg-card p-4 space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="w-12 h-12 rounded cursor-pointer"
              />
              <div className="flex-1">
                <label className="text-xs text-muted-foreground">HEX</label>
                <div className="flex items-center gap-2">
                  <input
                    value={hex}
                    onChange={(e) => setHex(e.target.value)}
                    className="flex-1 font-mono text-sm border rounded px-2 py-1"
                  />
                  <button onClick={() => copy(hex, 'hex')}>
                    {copied === 'hex' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground">RGB</label>
              <div className="flex items-center gap-2">
                <input
                  value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                  readOnly
                  className="flex-1 font-mono text-sm border rounded px-2 py-1 bg-muted"
                />
                <button onClick={() => copy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'rgb')}>
                  {copied === 'rgb' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(['r', 'g', 'b'] as const).map((c) => (
                <div key={c}>
                  <label className="text-xs text-muted-foreground uppercase">{c}</label>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb[c]}
                    onChange={(e) => updateFromRgb(c, Number(e.target.value))}
                    className="w-full font-mono text-sm border rounded px-2 py-1"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {presetColors.map((c) => (
              <button
                key={c}
                onClick={() => setHex(c)}
                className="w-8 h-8 rounded-full border-2 border-transparent hover:border-primary transition-colors"
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-4">
            <h3 className="font-semibold mb-3">Contrast Checker</h3>
            <div className="flex items-center gap-3 mb-4">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Background</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgHex}
                    onChange={(e) => setBgHex(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <input
                    value={bgHex}
                    onChange={(e) => setBgHex(e.target.value)}
                    className="font-mono text-sm border rounded px-2 py-1 w-24"
                  />
                </div>
              </div>
            </div>

            <div
              className="rounded-lg p-6 text-center mb-4"
              style={{ backgroundColor: bgHex, color: hex }}
            >
              <p className="text-lg font-medium">Sample Text</p>
              <p className="text-sm opacity-80">The quick brown fox jumps over the lazy dog</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Contrast Ratio</span>
                <span className="font-bold text-lg">{contrast.toFixed(2)}:1</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${contrast >= 7 ? 'bg-green-500' : contrast >= 4.5 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(100, (contrast / 21) * 100)}%` }}
                />
              </div>
              <div className="flex gap-2 text-xs">
                <span className={`px-2 py-1 rounded ${contrast >= 4.5 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  AA {contrast >= 4.5 ? '✓' : '✗'}
                </span>
                <span className={`px-2 py-1 rounded ${contrast >= 7 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  AAA {contrast >= 7 ? '✓' : '✗'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
