'use client';
"use client";

import { useState } from "react";
import { GitMerge } from "lucide-react";

export default function VennDiagram() {
  const [listA, setListA] = useState('Apple\nBanana\nCherry\nDate');
  const [listB, setListB] = useState('Banana\nCherry\nFig\nGrape');
  const [listC, setListC] = useState('Cherry\nDate\nGrape\nKiwi');

  const a = new Set(listA.split('\n').map((s) => s.trim()).filter(Boolean));
  const b = new Set(listB.split('\n').map((s) => s.trim()).filter(Boolean));
  const c = new Set(listC.split('\n').map((s) => s.trim()).filter(Boolean));

  const onlyA = [...a].filter((x) => !b.has(x) && !c.has(x));
  const onlyB = [...b].filter((x) => !a.has(x) && !c.has(x));
  const onlyC = [...c].filter((x) => !a.has(x) && !b.has(x));
  const ab = [...a].filter((x) => b.has(x) && !c.has(x));
  const ac = [...a].filter((x) => c.has(x) && !b.has(x));
  const bc = [...b].filter((x) => c.has(x) && !a.has(x));
  const abc = [...a].filter((x) => b.has(x) && c.has(x));

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <GitMerge className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Venn Diagram Builder</h1>
          <p className="text-sm text-muted-foreground">Map shared and unique items across lists</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium block mb-1">Set A</label>
          <textarea value={listA} onChange={(e) => setListA(e.target.value)} className="w-full h-32 rounded-md border bg-background px-3 py-2 text-sm resize-none" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Set B</label>
          <textarea value={listB} onChange={(e) => setListB(e.target.value)} className="w-full h-32 rounded-md border bg-background px-3 py-2 text-sm resize-none" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Set C</label>
          <textarea value={listC} onChange={(e) => setListC(e.target.value)} className="w-full h-32 rounded-md border bg-background px-3 py-2 text-sm resize-none" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-lg border bg-card p-3"><div className="text-xs font-semibold text-blue-600 mb-1">Only A ({onlyA.length})</div><div className="text-sm space-y-0.5">{onlyA.map((x, i) => <div key={i}>{x}</div>)}</div></div>
        <div className="rounded-lg border bg-card p-3"><div className="text-xs font-semibold text-green-600 mb-1">Only B ({onlyB.length})</div><div className="text-sm space-y-0.5">{onlyB.map((x, i) => <div key={i}>{x}</div>)}</div></div>
        <div className="rounded-lg border bg-card p-3"><div className="text-xs font-semibold text-purple-600 mb-1">Only C ({onlyC.length})</div><div className="text-sm space-y-0.5">{onlyC.map((x, i) => <div key={i}>{x}</div>)}</div></div>
        <div className="rounded-lg border bg-card p-3"><div className="text-xs font-semibold text-orange-600 mb-1">A ∩ B ({ab.length})</div><div className="text-sm space-y-0.5">{ab.map((x, i) => <div key={i}>{x}</div>)}</div></div>
        <div className="rounded-lg border bg-card p-3"><div className="text-xs font-semibold text-pink-600 mb-1">A ∩ C ({ac.length})</div><div className="text-sm space-y-0.5">{ac.map((x, i) => <div key={i}>{x}</div>)}</div></div>
        <div className="rounded-lg border bg-card p-3"><div className="text-xs font-semibold text-teal-600 mb-1">B ∩ C ({bc.length})</div><div className="text-sm space-y-0.5">{bc.map((x, i) => <div key={i}>{x}</div>)}</div></div>
        <div className="rounded-lg border bg-card p-3 col-span-2"><div className="text-xs font-semibold text-red-600 mb-1">A ∩ B ∩ C ({abc.length})</div><div className="text-sm space-y-0.5">{abc.map((x, i) => <div key={i}>{x}</div>)}</div></div>
      </div>
    </div>
  );
}
