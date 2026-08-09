"use client";

import { useState } from "react";
import { Timer, Copy, Check } from "lucide-react";

export default function CronGenerator() {
  const [minute, setMinute] = useState('0');
  const [hour, setHour] = useState('0');
  const [dayOfMonth, setDayOfMonth] = useState('*');
  const [month, setMonth] = useState('*');
  const [dayOfWeek, setDayOfWeek] = useState('*');
  const [copied, setCopied] = useState(false);

  const cron = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;

  const presets = [
    { label: 'Every minute', value: '* * * * *' },
    { label: 'Every hour', value: '0 * * * *' },
    { label: 'Every day at midnight', value: '0 0 * * *' },
    { label: 'Every Monday at 9am', value: '0 9 * * 1' },
    { label: 'Every 15 minutes', value: '*/15 * * * *' },
    { label: 'First of month', value: '0 0 1 * *' },
  ];

  const applyPreset = (value: string) => {
    const [m, h, dom, mo, dow] = value.split(' ');
    setMinute(m); setHour(h); setDayOfMonth(dom); setMonth(mo); setDayOfWeek(dow);
  };

  const copy = () => {
    navigator.clipboard.writeText(cron);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Timer className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Cron Expression Generator</h1>
          <p className="text-sm text-muted-foreground">Build scheduling intervals with dropdowns</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {presets.map((p) => (
          <button key={p.label} onClick={() => applyPreset(p.value)} className="px-3 py-1.5 rounded-md text-xs bg-secondary hover:bg-secondary/80">
            {p.label}
          </button>
        ))}
      </div>

      <div className="rounded-lg border bg-card p-6 space-y-4">
        {[
          { label: 'Minute (0-59)', value: minute, set: setMinute },
          { label: 'Hour (0-23)', value: hour, set: setHour },
          { label: 'Day of Month (1-31)', value: dayOfMonth, set: setDayOfMonth },
          { label: 'Month (1-12)', value: month, set: setMonth },
          { label: 'Day of Week (0-6)', value: dayOfWeek, set: setDayOfWeek },
        ].map((field) => (
          <div key={field.label}>
            <label className="text-sm font-medium block mb-1">{field.label}</label>
            <input
              value={field.value}
              onChange={(e) => field.set(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border bg-primary/5 p-4 flex items-center justify-between">
        <code className="font-mono text-lg">{cron}</code>
        <button onClick={copy} className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="mt-4 text-xs text-muted-foreground">
        <p><strong>*</strong> = any value &nbsp;|&nbsp; <strong>,</strong> = value list &nbsp;|&nbsp; <strong>-</strong> = range &nbsp;|&nbsp; <strong>/</strong> = step</p>
      </div>
    </div>
  );
}
