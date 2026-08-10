'use client';
"use client";

import { useState } from "react";
import { Fingerprint, Copy, Check, RefreshCw } from "lucide-react";

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [format, setFormat] = useState<'standard' | 'no-dashes' | 'uppercase'>('standard');

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 0xf) >> (c === 'x' ? 0 : 1);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  };

  const generate = () => {
    const newUuids = Array.from({ length: count }, generateUUID);
    setUuids(newUuids);
  };

  const formatUUID = (uuid: string) => {
    switch (format) {
      case 'no-dashes': return uuid.replace(/-/g, '');
      case 'uppercase': return uuid.toUpperCase();
      default: return uuid;
    }
  };

  const copy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Fingerprint className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">UUID / GUID Generator</h1>
          <p className="text-sm text-muted-foreground">Generate version 4 UUIDs instantly</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFormat('standard')}
          className={`px-3 py-1.5 rounded-md text-sm ${format === 'standard' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
        >
          Standard
        </button>
        <button
          onClick={() => setFormat('no-dashes')}
          className={`px-3 py-1.5 rounded-md text-sm ${format === 'no-dashes' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
        >
          No Dashes
        </button>
        <button
          onClick={() => setFormat('uppercase')}
          className={`px-3 py-1.5 rounded-md text-sm ${format === 'uppercase' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
        >
          UPPERCASE
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Count:</label>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
            className="w-20 rounded-md border px-3 py-1.5 text-sm"
          />
        </div>
        <button onClick={generate} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
          <RefreshCw className="h-4 w-4" />
          Generate
        </button>
      </div>

      <div className="space-y-2">
        {uuids.map((uuid, i) => {
          const formatted = formatUUID(uuid);
          return (
            <div key={i} className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3">
              <span className="text-xs text-muted-foreground w-6">{i + 1}</span>
              <code className="flex-1 font-mono text-sm break-all">{formatted}</code>
              <button onClick={() => copy(formatted, i)} className="text-muted-foreground hover:text-foreground">
                {copiedIndex === i ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          );
        })}
        {uuids.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">Click Generate to create UUIDs</div>
        )}
      </div>
    </div>
  );
}
