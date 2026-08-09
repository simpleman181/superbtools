"use client";

import { useState, useMemo } from "react";
import { TrendingUp } from "lucide-react";

export default function CompoundInterest() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(10);
  const [monthly, setMonthly] = useState(500);

  const data = useMemo(() => {
    const result = [];
    let total = principal;
    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        total = total * (1 + rate / 100 / 12) + monthly;
      }
      result.push({ year: y, total: Math.round(total), invested: principal + monthly * y * 12 });
    }
    return result;
  }, [principal, rate, years, monthly]);

  const final = data[data.length - 1];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Compound Interest Calculator</h1>
          <p className="text-sm text-muted-foreground">Simulate long-term investment growth</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div><label className="text-sm font-medium block mb-1">Initial Amount</label><input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full rounded-md border px-3 py-2 text-sm" /></div>
        <div><label className="text-sm font-medium block mb-1">Annual Rate (%)</label><input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full rounded-md border px-3 py-2 text-sm" /></div>
        <div><label className="text-sm font-medium block mb-1">Years</label><input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full rounded-md border px-3 py-2 text-sm" /></div>
        <div><label className="text-sm font-medium block mb-1">Monthly Deposit</label><input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="w-full rounded-md border px-3 py-2 text-sm" /></div>
      </div>

      {final && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="rounded-lg border bg-card p-4 text-center"><div className="text-2xl font-bold text-primary">{final.total.toLocaleString()}</div><div className="text-xs text-muted-foreground mt-1">Final Amount</div></div>
          <div className="rounded-lg border bg-card p-4 text-center"><div className="text-2xl font-bold">{final.invested.toLocaleString()}</div><div className="text-xs text-muted-foreground mt-1">Total Invested</div></div>
          <div className="rounded-lg border bg-card p-4 text-center"><div className="text-2xl font-bold text-green-600">{(final.total - final.invested).toLocaleString()}</div><div className="text-xs text-muted-foreground mt-1">Interest Earned</div></div>
        </div>
      )}

      <div className="rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted"><tr><th className="px-3 py-2 text-left">Year</th><th className="px-3 py-2 text-right">Invested</th><th className="px-3 py-2 text-right">Total Value</th><th className="px-3 py-2 text-right">Interest</th></tr></thead>
          <tbody>{data.map((row) => (
            <tr key={row.year} className="border-t"><td className="px-3 py-2">{row.year}</td><td className="px-3 py-2 text-right">{row.invested.toLocaleString()}</td><td className="px-3 py-2 text-right font-medium">{row.total.toLocaleString()}</td><td className="px-3 py-2 text-right text-green-600">{(row.total - row.invested).toLocaleString()}</td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
