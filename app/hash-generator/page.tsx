'use client';
"use client";

import { useState, useEffect } from "react";
import { Hash, Copy, Check } from "lucide-react";
import CryptoJS from "crypto-js";

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState<'MD5' | 'SHA1' | 'SHA256' | 'SHA512'>('SHA256');
  const [hash, setHash] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!input) {
      setHash('');
      return;
    }
    switch (algorithm) {
      case 'MD5': setHash(CryptoJS.MD5(input).toString()); break;
      case 'SHA1': setHash(CryptoJS.SHA1(input).toString()); break;
      case 'SHA256': setHash(CryptoJS.SHA256(input).toString()); break;
      case 'SHA512': setHash(CryptoJS.SHA512(input).toString()); break;
    }
  }, [input, algorithm]);

  const copy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Hash className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Hash & Checksum Generator</h1>
          <p className="text-sm text-muted-foreground">Compute MD5, SHA-1, SHA-256, SHA-512 hashes</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {(['MD5', 'SHA1', 'SHA256', 'SHA512'] as const).map((algo) => (
          <button
            key={algo}
            onClick={() => setAlgorithm(algo)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${algorithm === algo ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
          >
            {algo}
          </button>
        ))}
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to hash..."
        className="w-full h-40 rounded-md border bg-background px-4 py-3 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring mb-4"
      />

      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">{algorithm} Hash</span>
          {hash && (
            <button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
        <div className="font-mono text-sm break-all text-primary">{hash || <span className="text-muted-foreground/50">—</span>}</div>
      </div>
    </div>
  );
}
