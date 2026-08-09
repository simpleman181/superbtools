"use client";

import { useState } from "react";
import { BookOpen, Copy, Check } from "lucide-react";

export default function CitationGenerator() {
  const [style, setStyle] = useState<'apa' | 'mla' | 'chicago'>('apa');
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [source, setSource] = useState('');
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (style === 'apa') {
      return `${author} (${year}). ${title}. ${source}. ${url ? url : ''}`;
    } else if (style === 'mla') {
      return `${author}. "${title}." ${source}, ${year}. ${url ? url : ''}`;
    } else {
      return `${author}. ${title}. ${source}, ${year}. ${url ? url : ''}`;
    }
  };

  const citation = generate();

  const copy = () => {
    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Bibliography & Citation Generator</h1>
          <p className="text-sm text-muted-foreground">Format citations in APA, MLA, or Chicago style</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {(['apa', 'mla', 'chicago'] as const).map((s) => (
          <button key={s} onClick={() => setStyle(s)} className={`px-4 py-2 rounded-md text-sm font-medium uppercase ${style === s ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>{s}</button>
        ))}
      </div>

      <div className="rounded-lg border bg-card p-6 space-y-4 mb-6">
        <div><label className="text-sm font-medium block mb-1">Author</label><input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Doe, J." className="w-full rounded-md border px-3 py-2 text-sm" /></div>
        <div><label className="text-sm font-medium block mb-1">Title</label><input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Article Title" className="w-full rounded-md border px-3 py-2 text-sm" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="text-sm font-medium block mb-1">Year</label><input value={year} onChange={(e) => setYear(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm" /></div>
          <div><label className="text-sm font-medium block mb-1">Source (Journal/Website)</label><input value={source} onChange={(e) => setSource(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm" /></div>
        </div>
        <div><label className="text-sm font-medium block mb-1">URL (optional)</label><input value={url} onChange={(e) => setUrl(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm" /></div>
      </div>

      <div className="rounded-lg border bg-primary/5 p-4 flex items-center justify-between">
        <span className="text-sm">{citation}</span>
        <button onClick={copy} className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
