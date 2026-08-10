'use client';
"use client";

import { useState, useMemo } from "react";
import { AlignLeft } from "lucide-react";

export default function WordCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, '').length;
    const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(Boolean).length;
    const readingTime = Math.ceil(words / 200);
    return { words, chars, charsNoSpace, sentences, paragraphs, readingTime };
  }, [text]);

  const statCards = [
    { label: "Words", value: stats.words },
    { label: "Characters", value: stats.chars },
    { label: "Characters (no spaces)", value: stats.charsNoSpace },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Reading Time", value: `${stats.readingTime} min` },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <AlignLeft className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Word & Character Counter</h1>
          <p className="text-sm text-muted-foreground">Real-time text statistics</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-lg border bg-card p-3 text-center">
            <div className="text-2xl font-bold text-primary">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing or paste your text here..."
        className="w-full h-[400px] rounded-md border bg-background px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
