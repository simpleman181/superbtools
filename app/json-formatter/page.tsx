'use client';
"use client";

import { useState } from "react";
import { FileJson, Copy, Check, AlertCircle } from "lucide-react";

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    try {
      if (!input.trim()) {
        setOutput('');
        setError('');
        return;
      }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <FileJson className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">JSON Formatter & Validator</h1>
          <p className="text-sm text-muted-foreground">Format, validate, and minify JSON data</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={formatJson} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
          Format (Pretty)
        </button>
        <button onClick={minifyJson} className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/80">
          Minify
        </button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-accent">
          Clear
        </button>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input JSON</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here..."
            className="w-full h-[500px] rounded-md border bg-background px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Output</label>
            {output && (
              <button onClick={copyOutput} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here..."
            className="w-full h-[500px] rounded-md border bg-muted/50 px-3 py-2 text-sm font-mono resize-none focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
