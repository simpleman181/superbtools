"use client";

import { useState } from "react";
import { Minimize2, Copy, Check } from "lucide-react";

export default function SvgOptimizer() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [saved, setSaved] = useState(0);
  const [copied, setCopied] = useState(false);

  const optimize = () => {
    let svg = input;
    // Remove comments
    svg = svg.replace(/<!--[\s\S]*?-->/g, '');
    // Remove XML declaration
    svg = svg.replace(/<\?xml[^?]*\?>/g, '');
    // Remove DOCTYPE
    svg = svg.replace(/<!DOCTYPE[^>]*>/g, '');
    // Remove unnecessary whitespace
    svg = svg.replace(/>\s+</g, '><');
    svg = svg.replace(/\s{2,}/g, ' ');
    // Remove empty attributes
    svg = svg.replace(/\s\w+=""/g, '');
    // Remove default attributes
    svg = svg.replace(/\sfill="none"/g, '');
    svg = svg.replace(/\sstroke="none"/g, '');
    // Remove metadata
    svg = svg.replace(/<metadata>[\s\S]*?<\/metadata>/g, '');
    svg = svg.replace(/<title>[\s\S]*?<\/title>/g, '');
    svg = svg.replace(/<desc>[\s\S]*?<\/desc>/g, '');
    svg = svg.trim();

    setOutput(svg);
    setSaved(input.length - svg.length);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Minimize2 className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">SVG Optimizer</h1>
          <p className="text-sm text-muted-foreground">Remove unnecessary metadata and minimize SVG files</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={optimize} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">Optimize</button>
        <button onClick={() => { setInput(''); setOutput(''); setSaved(0); }} className="px-4 py-2 border rounded-md text-sm hover:bg-accent">Clear</button>
      </div>

      {saved > 0 && <div className="mb-4 text-sm text-green-600 font-medium">Saved {saved} bytes ({((saved / input.length) * 100).toFixed(1)}% reduction)</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input SVG</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste SVG markup here..." className="w-full h-[400px] rounded-md border bg-background px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Optimized SVG</label>
            {output && <button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">{copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}{copied ? "Copied!" : "Copy"}</button>}
          </div>
          <textarea value={output} readOnly className="w-full h-[400px] rounded-md border bg-muted/50 px-3 py-2 text-sm font-mono resize-none focus:outline-none" />
        </div>
      </div>
    </div>
  );
}
