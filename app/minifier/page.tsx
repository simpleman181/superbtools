'use client';
"use client";

import { useState } from "react";
import { Minimize2, Copy, Check } from "lucide-react";

export default function Minifier() {
  const [input, setInput] = useState('');
  const [type, setType] = useState<'html' | 'css' | 'js'>('js');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(0);

  const minify = () => {
    let result = input;
    if (type === 'html') {
      result = input
        .replace(/>\s+</g, '><')
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
    } else if (type === 'css') {
      result = input
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\s*{\s*/g, '{')
        .replace(/\s*}\s*/g, '}')
        .replace(/\s*;\s*/g, ';')
        .replace(/\s*,\s*/g, ',')
        .replace(/\s*:\s*/g, ':')
        .replace(/;\s*}/g, '}')
        .trim();
    } else {
      result = input
        .replace(/\/\/[\s\S]*?\n/g, '\n')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\s+/g, ' ')
        .replace(/;\s*}/g, ';}')
        .replace(/{\s*/g, '{')
        .replace(/}\s*/g, '}')
        .replace(/,\s*/g, ',')
        .replace(/:\s*/g, ':')
        .trim();
    }
    setOutput(result);
    setSaved(input.length - result.length);
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
          <h1 className="text-2xl font-bold">HTML / CSS / JS Minifier</h1>
          <p className="text-sm text-muted-foreground">Remove whitespace and comments to optimize code</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {(['html', 'css', 'js'] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setType(t); setOutput(''); }}
            className={`px-4 py-2 rounded-md text-sm font-medium uppercase ${type === t ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
          >
            {t}
          </button>
        ))}
        <button onClick={minify} className="ml-auto px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
          Minify
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input {type.toUpperCase()}</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Paste your ${type.toUpperCase()} code here...`}
            className="w-full h-[400px] rounded-md border bg-background px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Minified Output</label>
            <div className="flex items-center gap-2">
              {saved > 0 && <span className="text-xs text-green-600 font-medium">Saved {saved} bytes</span>}
              {output && (
                <button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Minified code will appear here..."
            className="w-full h-[400px] rounded-md border bg-muted/50 px-3 py-2 text-sm font-mono resize-none focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
