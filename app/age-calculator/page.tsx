"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";

export default function AgeCalculator() {
  const [startDate, setStartDate] = useState('2000-01-01');
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30.44);
  const diffYears = Math.floor(diffDays / 365.25);

  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth() + (years * 12);
  const remainingMonths = months % 12;
  const remainingDays = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <CalendarDays className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Age / Date Duration Calculator</h1>
          <p className="text-sm text-muted-foreground">Calculate exact time between two dates</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div><label className="text-sm font-medium block mb-1">Start Date</label><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm" /></div>
        <div><label className="text-sm font-medium block mb-1">End Date</label><input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm" /></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-lg border bg-card p-4 text-center"><div className="text-2xl font-bold text-primary">{diffYears}</div><div className="text-xs text-muted-foreground mt-1">Years</div></div>
        <div className="rounded-lg border bg-card p-4 text-center"><div className="text-2xl font-bold">{diffMonths}</div><div className="text-xs text-muted-foreground mt-1">Months</div></div>
        <div className="rounded-lg border bg-card p-4 text-center"><div className="text-2xl font-bold">{diffWeeks}</div><div className="text-xs text-muted-foreground mt-1">Weeks</div></div>
        <div className="rounded-lg border bg-card p-4 text-center"><div className="text-2xl font-bold">{diffDays}</div><div className="text-xs text-muted-foreground mt-1">Days</div></div>
      </div>

      <div className="mt-4 rounded-lg border bg-card p-4 text-center">
        <p className="text-lg font-medium">{years} years, {remainingMonths} months, and {remainingDays} days</p>
      </div>
    </div>
  );
}
