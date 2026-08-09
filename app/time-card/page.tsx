"use client";

import { useState } from "react";
import { Clock, Plus, Trash2 } from "lucide-react";

interface Entry {
  day: string;
  checkIn: string;
  checkOut: string;
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function TimeCard() {
  const [entries, setEntries] = useState<Entry[]>(
    days.map((d) => ({ day: d, checkIn: '09:00', checkOut: '17:00' }))
  );

  const updateEntry = (i: number, field: keyof Entry, value: string) => {
    const newEntries = [...entries];
    newEntries[i] = { ...newEntries[i], [field]: value };
    setEntries(newEntries);
  };

  const calcHours = (inTime: string, outTime: string) => {
    if (!inTime || !outTime) return 0;
    const [inH, inM] = inTime.split(':').map(Number);
    const [outH, outM] = outTime.split(':').map(Number);
    return (outH * 60 + outM - inH * 60 - inM) / 60;
  };

  const totalHours = entries.reduce((sum, e) => sum + calcHours(e.checkIn, e.checkOut), 0);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Time Card Calculator</h1>
          <p className="text-sm text-muted-foreground">Log check-in and check-out times</p>
        </div>
      </div>

      <div className="rounded-lg border overflow-hidden mb-4">
        <table className="w-full text-sm">
          <thead className="bg-muted"><tr><th className="px-3 py-2 text-left">Day</th><th className="px-3 py-2">Check In</th><th className="px-3 py-2">Check Out</th><th className="px-3 py-2 text-right">Hours</th></tr></thead>
          <tbody>
            {entries.map((entry, i) => (
              <tr key={i} className="border-t">
                <td className="px-3 py-2 font-medium">{entry.day}</td>
                <td className="px-3 py-2"><input type="time" value={entry.checkIn} onChange={(e) => updateEntry(i, 'checkIn', e.target.value)} className="rounded border px-2 py-1 text-sm" /></td>
                <td className="px-3 py-2"><input type="time" value={entry.checkOut} onChange={(e) => updateEntry(i, 'checkOut', e.target.value)} className="rounded border px-2 py-1 text-sm" /></td>
                <td className="px-3 py-2 text-right font-mono">{calcHours(entry.checkIn, entry.checkOut).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border bg-primary/5 p-4 flex items-center justify-between">
        <span className="font-medium">Total Weekly Hours</span>
        <span className="text-2xl font-bold text-primary">{totalHours.toFixed(2)}</span>
      </div>
    </div>
  );
}
