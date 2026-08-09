"use client";

import { useState } from "react";
import { Link, Copy, Check } from "lucide-react";

export default function UrlEncoder() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  const process = () => {
    try {
      if (mode === 'encode') return encodeURIComponent(input);
      return decodeURIComponent(input);
    } catch (e) {
      return (e as Error).message;
    }
  };

  const output = process();

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Link className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">URL Encoder / Decoder</h1>
          <p className="text-sm text-muted-foreground">Encode or decode URL-safe strings</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setMode('encode')} className={`px-4 py-2 rounded-md text-sm font-medium ${mode === 'encode' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>Encode</button>
        <button onClick={() => setMode('decode')} className={`px-4 py-2 rounded-md text-sm font-medium ${mode === 'decode' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>Decode</button>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter encoded URL to decode...'}
        className="w-full h-40 rounded-md border bg-background px-4 py-3 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring mb-4"
      />

      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">Result</span>
          <button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="font-mono text-sm break-all">{output || <span className="text-muted-foreground/50">—</span>}</div>
      </div>
    </div>
  );
}
