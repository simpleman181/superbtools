'use client';
"use client";

import { useState } from "react";
import { Expand, Copy, Check } from "lucide-react";

export default function CodeUnpacker() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const unpack = () => {
    let code = input;
    // Add newlines after semicolons not inside strings
    code = code.replace(/;(?![^"]*"[^"]*")/g, ';\n');
    // Add newlines after opening braces
    code = code.replace(/{/g, ' {\n');
    // Add newlines before closing braces
    code = code.replace(/}/g, '\n}\n');
    // Add newlines after commas in object/array contexts (simplified)
    code = code.replace(/,(?![^"]*"[^"]*")/g, ',\n');
    // Clean up multiple newlines
    code = code.replace(/\n\s*\n/g, '\n');
    // Basic indentation
    const lines = code.split('\n');
    let indent = 0;
    const indented = lines.map((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('}')) indent = Math.max(0, indent - 1);
      const result = '  '.repeat(indent) + trimmed;
      if (trimmed.endsWith('{')) indent++;
      return result;
    });
    setOutput(indented.join('\n'));
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Expand className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Minified Code Unpacker</h1>
          <p className="text-sm text-muted-foreground">Expand compressed code into readable layouts</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={unpack} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">Unpack</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="px-4 py-2 border rounded-md text-sm hover:bg-accent">Clear</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Minified Input</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste minified code here..." className="w-full h-[400px] rounded-md border bg-background px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Unpacked Code</label>
            {output && <button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">{copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}{copied ? "Copied!" : "Copy"}</button>}
          </div>
          <textarea value={output} readOnly className="w-full h-[400px] rounded-md border bg-muted/50 px-3 py-2 text-sm font-mono resize-none focus:outline-none" />
        </div>
      </div>
    </div>
  );
}
