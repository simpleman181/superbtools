'use client';
"use client";

import { useState } from "react";
import { Binary } from "lucide-react";

export default function BaseConverter() {
  const [input, setInput] = useState('255');
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);

  const convert = () => {
    try {
      const decimal = parseInt(input, fromBase);
      if (isNaN(decimal)) return 'Invalid input';
      return decimal.toString(toBase).toUpperCase();
    } catch {
      return 'Error';
    }
  };

  const result = convert();

  const bases = [
    { value: 2, label: 'Binary (2)' },
    { value: 8, label: 'Octal (8)' },
    { value: 10, label: 'Decimal (10)' },
    { value: 16, label: 'Hex (16)' },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Binary className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Binary / Hex / Octal Converter</h1>
          <p className="text-sm text-muted-foreground">Convert between number bases</p>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 space-y-4">
        <div>
          <label className="text-sm font-medium block mb-1">Input Number</label>
          <input value={input} onChange={(e) => setInput(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm font-mono" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium block mb-1">From Base</label>
            <select value={fromBase} onChange={(e) => setFromBase(Number(e.target.value))} className="w-full rounded-md border px-3 py-2 text-sm">
              {bases.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">To Base</label>
            <select value={toBase} onChange={(e) => setToBase(Number(e.target.value))} className="w-full rounded-md border px-3 py-2 text-sm">
              {bases.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
            </select>
          </div>
        </div>

        <div className="rounded-lg bg-primary/5 p-4 text-center">
          <div className="text-2xl font-mono font-bold text-primary">{result}</div>
          <div className="text-xs text-muted-foreground mt-1">Base {toBase}</div>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center">
          {bases.map((b) => {
            try {
              const val = parseInt(input, fromBase);
              return (
                <div key={b.value} className="rounded border p-2">
                  <div className="text-xs text-muted-foreground">{b.label.split(' ')[0]}</div>
                  <div className="font-mono text-sm font-medium">{isNaN(val) ? '—' : val.toString(b.value).toUpperCase()}</div>
                </div>
              );
            } catch { return null; }
          })}
        </div>
      </div>
    </div>
  );
}
