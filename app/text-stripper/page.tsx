'use client';
"use client";

import { useState } from "react";
import { Eraser, Copy, Check } from "lucide-react";

export default function TextStripper() {
  const [input, setInput] = useState('');
  const [removeHtml, setRemoveHtml] = useState(true);
  const [removeEmojis, setRemoveEmojis] = useState(true);
  const [removeExtraSpaces, setRemoveExtraSpaces] = useState(true);
  const [removeBlankLines, setRemoveBlankLines] = useState(true);
  const [copied, setCopied] = useState(false);

  const process = () => {
    let text = input;
    if (removeHtml) text = text.replace(/<[^>]*>/g, '');
    if (removeEmojis) text = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
    if (removeExtraSpaces) text = text.replace(/\s+/g, ' ');
    if (removeBlankLines) text = text.replace(/\n\s*\n/g, '\n').trim();
    return text;
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
        <Eraser className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Text Stripper & Cleaner</h1>
          <p className="text-sm text-muted-foreground">Remove HTML, emojis, extra spaces, and blank lines</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={removeHtml} onChange={(e) => setRemoveHtml(e.target.checked)} className="h-4 w-4" /> Remove HTML tags</label>
        <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={removeEmojis} onChange={(e) => setRemoveEmojis(e.target.checked)} className="h-4 w-4" /> Remove emojis</label>
        <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={removeExtraSpaces} onChange={(e) => setRemoveExtraSpaces(e.target.checked)} className="h-4 w-4" /> Remove extra spaces</label>
        <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={removeBlankLines} onChange={(e) => setRemoveBlankLines(e.target.checked)} className="h-4 w-4" /> Remove blank lines</label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Dirty Input</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste messy text here..." className="w-full h-[300px] rounded-md border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Clean Output</label>
            <button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">{copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}{copied ? "Copied!" : "Copy"}</button>
          </div>
          <textarea value={output} readOnly className="w-full h-[300px] rounded-md border bg-muted/50 px-3 py-2 text-sm resize-none focus:outline-none" />
        </div>
      </div>
    </div>
  );
}
