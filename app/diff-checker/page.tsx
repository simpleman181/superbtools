'use client';
"use client";

import { useState } from "react";
import { GitCompare } from "lucide-react";

export default function DiffChecker() {
  const [listA, setListA] = useState('');
  const [listB, setListB] = useState('');

  const a = new Set(listA.split('\n').map((s) => s.trim()).filter(Boolean));
  const b = new Set(listB.split('\n').map((s) => s.trim()).filter(Boolean));

  const onlyA = [...a].filter((x) => !b.has(x));
  const onlyB = [...b].filter((x) => !a.has(x));
  const both = [...a].filter((x) => b.has(x));

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <GitCompare className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Diff Checker for Lists</h1>
          <p className="text-sm text-muted-foreground">Compare two lists to find unique and shared items</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium mb-2 block">List A</label>
          <textarea value={listA} onChange={(e) => setListA(e.target.value)} placeholder="Paste list A (one per line)..." className="w-full h-48 rounded-md border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">List B</label>
          <textarea value={listB} onChange={(e) => setListB(e.target.value)} placeholder="Paste list B (one per line)..." className="w-full h-48 rounded-md border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border bg-card p-4">
          <h3 className="text-sm font-semibold text-destructive mb-2">Only in A ({onlyA.length})</h3>
          <div className="space-y-1 max-h-48 overflow-auto">
            {onlyA.map((item, i) => <div key={i} className="text-sm px-2 py-1 rounded bg-destructive/10">{item}</div>)}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <h3 className="text-sm font-semibold text-green-600 mb-2">Only in B ({onlyB.length})</h3>
          <div className="space-y-1 max-h-48 overflow-auto">
            {onlyB.map((item, i) => <div key={i} className="text-sm px-2 py-1 rounded bg-green-50 dark:bg-green-900/20">{item}</div>)}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <h3 className="text-sm font-semibold text-primary mb-2">In Both ({both.length})</h3>
          <div className="space-y-1 max-h-48 overflow-auto">
            {both.map((item, i) => <div key={i} className="text-sm px-2 py-1 rounded bg-primary/10">{item}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
