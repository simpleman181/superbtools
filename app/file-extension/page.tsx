"use client";

import { useState } from "react";
import { FileText, Copy, Check } from "lucide-react";

export default function FileExtension() {
  const [filename, setFilename] = useState('document.txt');
  const [newExt, setNewExt] = useState('json');
  const [copied, setCopied] = useState(false);

  const baseName = filename.replace(/\.[^/.]+$/, '');
  const result = `${baseName}.${newExt.replace(/^\./, '')}`;

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">File Extension Changer</h1>
          <p className="text-sm text-muted-foreground">Rename file formats without a terminal</p>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 space-y-4">
        <div>
          <label className="text-sm font-medium block mb-1">Original Filename</label>
          <input value={filename} onChange={(e) => setFilename(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">New Extension</label>
          <input value={newExt} onChange={(e) => setNewExt(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm" placeholder="json" />
        </div>
        <div className="rounded-lg bg-primary/5 p-4 flex items-center justify-between">
          <code className="font-mono text-lg">{result}</code>
          <button onClick={copy} className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
