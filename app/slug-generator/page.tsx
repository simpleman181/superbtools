'use client';
"use client";

import { useState } from "react";
import { Link2, Copy, Check } from "lucide-react";

export default function SlugGenerator() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const slug = input
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const copy = () => {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Link2 className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Slug Generator</h1>
          <p className="text-sm text-muted-foreground">Transform headlines into URL-friendly strings</p>
        </div>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a headline like 'Hello World! How Are You?'"
        className="w-full h-24 rounded-md border bg-background px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring mb-4"
      />

      <div className="rounded-lg border bg-card p-4 flex items-center justify-between">
        <code className="font-mono text-lg">{slug || <span className="text-muted-foreground/50">—</span>}</code>
        {slug && (
          <button onClick={copy} className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>
    </div>
  );
}
