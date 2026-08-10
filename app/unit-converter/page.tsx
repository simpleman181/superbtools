'use client';
"use client";

import { useState } from "react";
import { Ruler } from "lucide-react";

const categories = {
  length: { label: 'Length', units: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.34, yd: 0.9144, ft: 0.3048, in: 0.0254 } },
  weight: { label: 'Weight', units: { kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495, t: 1000 } },
  area: { label: 'Area', units: { 'm²': 1, 'km²': 1000000, 'ft²': 0.092903, 'ac': 4046.86, 'ha': 10000 } },
  temperature: { label: 'Temperature', units: { C: 1, F: 1, K: 1 } },
};

export default function UnitConverter() {
  const [category, setCategory] = useState<keyof typeof categories>('length');
  const [from, setFrom] = useState('m');
  const [to, setTo] = useState('ft');
  const [value, setValue] = useState(1);

  const convert = () => {
    if (category === 'temperature') {
      if (from === to) return value;
      let celsius = value;
      if (from === 'F') celsius = (value - 32) * 5 / 9;
      if (from === 'K') celsius = value - 273.15;
      if (to === 'F') return celsius * 9 / 5 + 32;
      if (to === 'K') return celsius + 273.15;
      return celsius;
    }
    const units = categories[category].units;
    const base = value * (units[from as keyof typeof units] as number);
    return base / (units[to as keyof typeof units] as number);
  };

  const result = convert();
  const unitKeys = Object.keys(categories[category].units);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Ruler className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Unit Converter</h1>
          <p className="text-sm text-muted-foreground">Convert between metric and imperial units</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {Object.entries(categories).map(([key, cat]) => (
          <button key={key} onClick={() => { setCategory(key as any); setFrom(Object.keys(cat.units)[0]); setTo(Object.keys(cat.units)[1] || Object.keys(cat.units)[0]); }} className={`px-3 py-1.5 rounded-md text-sm ${category === key ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
            {cat.label}
          </button>
        ))}
      </div>

      <div className="rounded-lg border bg-card p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium block mb-1">From</label>
            <div className="flex gap-2">
              <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} className="flex-1 rounded-md border px-3 py-2 text-sm" />
              <select value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-md border px-3 py-2 text-sm">
                {unitKeys.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>
          <div className="pt-6 text-muted-foreground">→</div>
          <div className="flex-1">
            <label className="text-sm font-medium block mb-1">To</label>
            <div className="flex gap-2">
              <input value={Number.isFinite(result) ? result.toFixed(6).replace(/\.?0+$/, '') : '—'} readOnly className="flex-1 rounded-md border px-3 py-2 text-sm bg-muted" />
              <select value={to} onChange={(e) => setTo(e.target.value)} className="rounded-md border px-3 py-2 text-sm">
                {unitKeys.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
