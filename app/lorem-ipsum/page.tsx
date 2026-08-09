"use client";

import { useState } from "react";
import { Type, Copy, Check } from "lucide-react";

const words = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"];

export default function LoremIpsum() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (type === 'words') {
      return Array.from({ length: count }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
    }
    if (type === 'sentences') {
      return Array.from({ length: count }, () => {
        const len = 8 + Math.floor(Math.random() * 8);
        const sentence = Array.from({ length: len }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
        return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
      }).join(' ');
    }
    return Array.from({ length: count }, () => {
      const sentences = 3 + Math.floor(Math.random() * 4);
      return Array.from({ length: sentences }, () => {
        const len = 8 + Math.floor(Math.random() * 8);
        const sentence = Array.from({ length: len }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
        return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
      }).join(' ');
    }).join('\n\n');
  };

  const text = generate();

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Type className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Lorem Ipsum Generator</h1>
          <p className="text-sm text-muted-foreground">Generate placeholder text for layouts</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex gap-2">
          {(['paragraphs', 'sentences', 'words'] as const).map((t) => (
            <button key={t} onClick={() => setType(t)} className={`px-3 py-1.5 rounded-md text-sm capitalize ${type === t ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>{t}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Count:</label>
          <input type="number" min="1" max="100" value={count} onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))} className="w-20 rounded-md border px-3 py-1.5 text-sm" />
        </div>
        <button onClick={copy} className="ml-auto flex items-center gap-1 px-3 py-1.5 border rounded-md text-sm hover:bg-accent">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  );
}
