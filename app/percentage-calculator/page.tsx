'use client';
"use client";

import { useState } from "react";
import { Percent } from "lucide-react";

export default function PercentageCalculator() {
  const [mode, setMode] = useState<'what-is' | 'is-what' | 'increase' | 'decrease'>('what-is');
  const [a, setA] = useState(20);
  const [b, setB] = useState(100);

  const calculate = () => {
    switch (mode) {
      case 'what-is': return (a / 100) * b;
      case 'is-what': return b !== 0 ? (a / b) * 100 : 0;
      case 'increase': return b * (1 + a / 100);
      case 'decrease': return b * (1 - a / 100);
    }
  };

  const result = calculate();

  const modes = [
    { key: 'what-is', label: 'What is X% of Y?', desc: 'What is 20% of 100?' },
    { key: 'is-what', label: 'X is what % of Y?', desc: '20 is what % of 100?' },
    { key: 'increase', label: 'Increase Y by X%', desc: 'Increase 100 by 20%' },
    { key: 'decrease', label: 'Decrease Y by X%', desc: 'Decrease 100 by 20%' },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Percent className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Percentage Calculator</h1>
          <p className="text-sm text-muted-foreground">Solve common percentage problems</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-6">
        {modes.map((m) => (
          <button key={m.key} onClick={() => setMode(m.key as any)} className={`p-3 rounded-lg border text-left text-sm ${mode === m.key ? 'border-primary bg-primary/5' : 'hover:bg-accent'}`}>
            <div className="font-medium">{m.label}</div>
            <div className="text-xs text-muted-foreground">{m.desc}</div>
          </button>
        ))}
      </div>

      <div className="rounded-lg border bg-card p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium block mb-1">{mode === 'is-what' ? 'X (Part)' : 'X (%)'}</label>
            <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} className="w-full rounded-md border px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">{mode === 'is-what' ? 'Y (Whole)' : 'Y (Base)'}</label>
            <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full rounded-md border px-3 py-2 text-sm" />
          </div>
        </div>

        <div className="rounded-lg bg-primary/5 p-4 text-center">
          <div className="text-3xl font-bold text-primary">{Number.isFinite(result) ? result.toFixed(2) : '—'}</div>
          <div className="text-sm text-muted-foreground mt-1">Result</div>
        </div>
      </div>
    </div>
  );
}
