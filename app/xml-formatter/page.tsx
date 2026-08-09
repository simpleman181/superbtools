"use client";

import { useState } from "react";
import { FileCode, Copy, Check, AlertCircle } from "lucide-react";

function formatXML(xml: string, indentSize: number): string {
  let formatted = '';
  let indent = 0;
  const lines = xml.replace(/>\s*</g, '><').split(/(<[^>]+>)/g).filter(Boolean);

  for (const line of lines) {
    if (line.match(/^<\/\w/)) indent = Math.max(0, indent - 1);
    if (line.trim()) {
      formatted += ' '.repeat(indent * indentSize) + line.trim() + '\n';
    }
    if (line.match(/^<\w[^>]*[^\/]>$/) && !line.match(/^<\w[^>]*\/>$/)) indent++;
  }

  return formatted.trim();
}

function validateXML(xml: string): string | null {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');
    const error = doc.querySelector('parsererror');
    return error ? error.textContent : null;
  } catch (e) {
    return (e as Error).message;
  }
}

export default function XmlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const format = () => {
    const err = validateXML(input);
    if (err) {
      setError(err);
      setOutput('');
      return;
    }
    setError('');
    setOutput(formatXML(input, indent));
  };

  const minify = () => {
    setOutput(input.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim());
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <FileCode className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">XML Formatter & Beautifier</h1>
          <p className="text-sm text-muted-foreground">Format and validate XML markup</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Indent:</label>
          <input type="number" min="1" max="8" value={indent} onChange={(e) => setIndent(Number(e.target.value))} className="w-16 rounded-md border px-2 py-1 text-sm" />
        </div>
        <button onClick={format} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">Format</button>
        <button onClick={minify} className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/80">Minify</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="px-4 py-2 border rounded-md text-sm hover:bg-accent">Clear</button>
      </div>

      {error && <div className="mb-4 flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"><AlertCircle className="h-4 w-4" />{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input XML</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste XML here..." className="w-full h-[400px] rounded-md border bg-background px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Output</label>
            {output && <button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">{copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}{copied ? "Copied!" : "Copy"}</button>}
          </div>
          <textarea value={output} readOnly className="w-full h-[400px] rounded-md border bg-muted/50 px-3 py-2 text-sm font-mono resize-none focus:outline-none" />
        </div>
      </div>
    </div>
  );
}
