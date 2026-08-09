"use client";

import { useState } from "react";
import { Globe, Clock } from "lucide-react";

const timezones = [
  'UTC', 'America/New_York', 'America/Los_Angeles', 'America/Chicago', 'America/Denver',
  'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Moscow',
  'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Dubai', 'Asia/Kolkata', 'Asia/Singapore',
  'Australia/Sydney', 'Pacific/Auckland',
];

export default function TimezoneConverter() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  const [fromZone, setFromZone] = useState('UTC');
  const [toZones, setToZones] = useState(['America/New_York', 'Europe/London', 'Asia/Tokyo']);

  const convert = (dt: string, from: string, to: string) => {
    const d = new Date(dt);
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    // Simple offset approximation (not perfect but works for demo)
    const offsets: Record<string, number> = {
      'UTC': 0, 'America/New_York': -5, 'America/Los_Angeles': -8,
      'America/Chicago': -6, 'America/Denver': -7,
      'Europe/London': 0, 'Europe/Paris': 1, 'Europe/Berlin': 1, 'Europe/Moscow': 3,
      'Asia/Tokyo': 9, 'Asia/Shanghai': 8, 'Asia/Dubai': 4, 'Asia/Kolkata': 5.5, 'Asia/Singapore': 8,
      'Australia/Sydney': 11, 'Pacific/Auckland': 13,
    };
    const offset = (offsets[to] || 0) - (offsets[from] || 0);
    const result = new Date(utc + offset * 3600000);
    return result.toLocaleString('en-US', { timeZone: 'UTC', hour12: true });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Globe className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Time Zone Converter</h1>
          <p className="text-sm text-muted-foreground">Find overlapping hours across global cities</p>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4 space-y-4 mb-6">
        <div>
          <label className="text-sm font-medium block mb-1">Date & Time</label>
          <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">From Timezone</label>
          <select value={fromZone} onChange={(e) => setFromZone(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm">
            {timezones.map((z) => <option key={z} value={z}>{z}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        {toZones.map((zone) => (
          <div key={zone} className="flex items-center justify-between rounded-lg border bg-card p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{zone}</span>
            </div>
            <span className="font-mono text-lg">{convert(date, fromZone, zone)}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2 flex-wrap">
        {timezones.filter((z) => !toZones.includes(z)).map((z) => (
          <button key={z} onClick={() => setToZones([...toZones, z])} className="px-2 py-1 rounded border text-xs hover:bg-accent">+ {z.split('/')[1] || z}</button>
        ))}
      </div>
    </div>
  );
}
