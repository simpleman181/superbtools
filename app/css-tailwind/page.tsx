"use client";

import { useState } from "react";
import { Wind, Copy, Check } from "lucide-react";

const mapping: Record<string, string> = {
  'display: flex': 'flex',
  'display: block': 'block',
  'display: inline': 'inline',
  'display: none': 'hidden',
  'display: grid': 'grid',
  'position: relative': 'relative',
  'position: absolute': 'absolute',
  'position: fixed': 'fixed',
  'position: sticky': 'sticky',
  'text-align: center': 'text-center',
  'text-align: left': 'text-left',
  'text-align: right': 'text-right',
  'font-weight: bold': 'font-bold',
  'font-weight: 700': 'font-bold',
  'font-weight: 600': 'font-semibold',
  'font-weight: 500': 'font-medium',
  'font-weight: 400': 'font-normal',
  'font-weight: 300': 'font-light',
  'justify-content: center': 'justify-center',
  'justify-content: flex-start': 'justify-start',
  'justify-content: flex-end': 'justify-end',
  'justify-content: space-between': 'justify-between',
  'align-items: center': 'items-center',
  'align-items: flex-start': 'items-start',
  'align-items: flex-end': 'items-end',
  'flex-direction: row': 'flex-row',
  'flex-direction: column': 'flex-col',
  'width: 100%': 'w-full',
  'height: 100%': 'h-full',
  'margin: 0': 'm-0',
  'padding: 0': 'p-0',
  'border-radius: 0.5rem': 'rounded-lg',
  'border-radius: 0.25rem': 'rounded',
  'border-radius: 9999px': 'rounded-full',
  'overflow: hidden': 'overflow-hidden',
  'cursor: pointer': 'cursor-pointer',
};

export default function CssTailwind() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const convert = () => {
    const declarations = input.split(';').map((d) => d.trim()).filter(Boolean);
    const classes: string[] = [];

    for (const decl of declarations) {
      const clean = decl.replace(/\s+/g, ' ').trim();
      if (mapping[clean]) {
        classes.push(mapping[clean]);
      } else if (clean.startsWith('color: ')) {
        classes.push(`text-[${clean.replace('color: ', '').trim()}]`);
      } else if (clean.startsWith('background-color: ')) {
        classes.push(`bg-[${clean.replace('background-color: ', '').trim()}]`);
      } else if (clean.startsWith('font-size: ')) {
        classes.push(`text-[${clean.replace('font-size: ', '').trim()}]`);
      } else if (clean.startsWith('padding: ')) {
        classes.push(`p-[${clean.replace('padding: ', '').trim()}]`);
      } else if (clean.startsWith('margin: ')) {
        classes.push(`m-[${clean.replace('margin: ', '').trim()}]`);
      }
    }

    setOutput(classes.join(' '));
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Wind className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">CSS to Tailwind Converter</h1>
          <p className="text-sm text-muted-foreground">Translate CSS properties into Tailwind classes</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={convert} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">Convert</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="px-4 py-2 border rounded-md text-sm hover:bg-accent">Clear</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">CSS Input</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="color: #3b82f6;\ndisplay: flex;\njustify-content: center;" className="w-full h-[300px] rounded-md border bg-background px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Tailwind Classes</label>
            {output && <button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">{copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}{copied ? "Copied!" : "Copy"}</button>}
          </div>
          <textarea value={output} readOnly className="w-full h-[300px] rounded-md border bg-muted/50 px-3 py-2 text-sm font-mono resize-none focus:outline-none" />
        </div>
      </div>
    </div>
  );
}
