"use client";

import { useState, useEffect } from "react";
import { Clock, Copy, Check, ArrowRightLeft } from "lucide-react";

export default function EpochConverter() {
  const [epoch, setEpoch] = useState(Math.floor(Date.now() / 1000).toString());
  const [dateStr, setDateStr] = useState(new Date().toISOString().slice(0, 16));
  const [unit, setUnit] = useState<'seconds' | 'milliseconds'>('seconds');
  const [copied, setCopied] = useState<string | null>(null);

  const now = () => {
    const ts = Math.floor(Date.now() / 1000);
    setEpoch(ts.toString());
    setDateStr(new Date(ts * 1000).toISOString().slice(0, 16));
  };

  useEffect(() => {
    now();
  }, []);

  const updateFromEpoch = (value: string) => {
    setEpoch(value);
    if (!value) return;
    const num = parseInt(value);
    if (isNaN(num)) return;
    const ms = unit === 'seconds' ? num * 1000 : num;
    const d = new Date(ms);
    if (!isNaN(d.getTime())) {
      setDateStr(d.toISOString().slice(0, 16));
    }
  };

  const updateFromDate = (value: string) => {
    setDateStr(value);
    if (!value) return;
    const d = new Date(value);
    if (!isNaN(d.getTime())) {
      const ts = unit === 'seconds' ? Math.floor(d.getTime() / 1000) : d.getTime();
      setEpoch(ts.toString());
    }
  };

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const parsedDate = epoch ? new Date(unit === 'seconds' ? parseInt(epoch) * 1000 : parseInt(epoch)) : null;
  const isValid = parsedDate && !isNaN(parsedDate.getTime());

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Epoch Timestamp Converter</h1>
          <p className="text-sm text-muted-foreground">Convert between Unix timestamps and human-readable dates</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setUnit('seconds')}
          className={`px-3 py-1.5 rounded-md text-sm ${unit === 'seconds' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
        >
          Seconds
        </button>
        <button
          onClick={() => setUnit('milliseconds')}
          className={`px-3 py-1.5 rounded-md text-sm ${unit === 'milliseconds' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
        >
          Milliseconds
        </button>
        <button onClick={now} className="ml-auto px-3 py-1.5 bg-secondary rounded-md text-sm hover:bg-secondary/80">
          Now
        </button>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border bg-card p-4">
          <label className="text-sm font-medium text-muted-foreground block mb-2">Unix Timestamp</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={epoch}
              onChange={(e) => updateFromEpoch(e.target.value)}
              className="flex-1 font-mono text-lg border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button onClick={() => copy(epoch, 'epoch')} className="p-2 border rounded-md hover:bg-accent">
              {copied === 'epoch' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="rounded-lg border bg-card p-4">
          <label className="text-sm font-medium text-muted-foreground block mb-2">Local Date & Time</label>
          <div className="flex items-center gap-2">
            <input
              type="datetime-local"
              value={dateStr}
              onChange={(e) => updateFromDate(e.target.value)}
              className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button onClick={() => copy(dateStr, 'date')} className="p-2 border rounded-md hover:bg-accent">
              {copied === 'date' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {isValid && parsedDate && (
          <div className="rounded-lg border bg-card p-4 space-y-2">
            <h3 className="font-semibold text-sm">Parsed Information</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Local String</div>
              <div>{parsedDate.toLocaleString()}</div>
              <div className="text-muted-foreground">UTC String</div>
              <div>{parsedDate.toUTCString()}</div>
              <div className="text-muted-foreground">ISO String</div>
              <div className="font-mono text-xs">{parsedDate.toISOString()}</div>
              <div className="text-muted-foreground">Relative</div>
              <div>{(() => {
                const diff = Date.now() - parsedDate.getTime();
                const abs = Math.abs(diff);
                const suffix = diff > 0 ? 'ago' : 'from now';
                if (abs < 60000) return `${Math.floor(abs / 1000)}s ${suffix}`;
                if (abs < 3600000) return `${Math.floor(abs / 60000)}m ${suffix}`;
                if (abs < 86400000) return `${Math.floor(abs / 3600000)}h ${suffix}`;
                return `${Math.floor(abs / 86400000)}d ${suffix}`;
              })()}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
