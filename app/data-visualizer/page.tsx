"use client";

import { useState } from "react";
import { BarChart3 } from "lucide-react";

export default function DataVisualizer() {
  const [input, setInput] = useState('[10, 25, 40, 30, 55, 20]');
  const [type, setType] = useState<'array' | 'tree'>('array');

  const parse = () => {
    try {
      return JSON.parse(input);
    } catch {
      return null;
    }
  };

  const data = parse();
  const maxVal = Array.isArray(data) ? Math.max(...data.filter((x: any) => typeof x === 'number')) : 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Data Structure Visualizer</h1>
          <p className="text-sm text-muted-foreground">Render arrays as interactive block diagrams</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setType('array')} className={`px-4 py-2 rounded-md text-sm font-medium ${type === 'array' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>Array Bars</button>
        <button onClick={() => setType('tree')} className={`px-4 py-2 rounded-md text-sm font-medium ${type === 'tree' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>Tree View</button>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter JSON array like [10, 25, 40, 30, 55]'
        className="w-full h-32 rounded-md border bg-background px-4 py-3 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring mb-4"
      />

      {Array.isArray(data) && type === 'array' && (
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-end gap-2 h-48">
            {data.map((val: any, i: number) => {
              if (typeof val !== 'number') return null;
              const height = maxVal > 0 ? (val / maxVal) * 100 : 0;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-primary rounded-t transition-all" style={{ height: `${height}%` }} />
                  <span className="text-xs font-mono">{val}</span>
                  <span className="text-[10px] text-muted-foreground">[{i}]</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {type === 'tree' && (
        <div className="rounded-lg border bg-card p-6 text-center text-sm text-muted-foreground">
          Tree visualization requires a nested object structure. Try: {`{"root": {"left": 1, "right": 2}}`}
        </div>
      )}
    </div>
  );
}
