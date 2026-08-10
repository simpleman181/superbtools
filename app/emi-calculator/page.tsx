'use client';
"use client";

import { useState } from "react";
import { Calculator, Download } from "lucide-react";

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(5);

  const r = rate / 100 / 12;
  const n = years * 12;
  const emi = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - principal;

  const schedule = [];
  let balance = principal;
  for (let i = 1; i <= Math.min(n, 12); i++) {
    const interest = balance * r;
    const principalPaid = emi - interest;
    balance -= principalPaid;
    schedule.push({ month: i, emi: emi.toFixed(2), interest: interest.toFixed(2), principal: principalPaid.toFixed(2), balance: Math.max(0, balance).toFixed(2) });
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">EMI & Loan Calculator</h1>
          <p className="text-sm text-muted-foreground">Calculate monthly repayments and amortization</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium block mb-1">Loan Amount</label>
          <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full rounded-md border px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Interest Rate (%)</label>
          <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full rounded-md border px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Tenure (Years)</label>
          <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full rounded-md border px-3 py-2 text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="rounded-lg border bg-card p-4 text-center">
          <div className="text-2xl font-bold text-primary">{emi.toFixed(0)}</div>
          <div className="text-xs text-muted-foreground mt-1">Monthly EMI</div>
        </div>
        <div className="rounded-lg border bg-card p-4 text-center">
          <div className="text-2xl font-bold">{totalInterest.toFixed(0)}</div>
          <div className="text-xs text-muted-foreground mt-1">Total Interest</div>
        </div>
        <div className="rounded-lg border bg-card p-4 text-center">
          <div className="text-2xl font-bold">{totalPayment.toFixed(0)}</div>
          <div className="text-xs text-muted-foreground mt-1">Total Payment</div>
        </div>
      </div>

      <h3 className="font-semibold mb-2">Amortization Schedule (First Year)</h3>
      <div className="rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr><th className="px-3 py-2 text-left">Month</th><th className="px-3 py-2 text-right">EMI</th><th className="px-3 py-2 text-right">Interest</th><th className="px-3 py-2 text-right">Principal</th><th className="px-3 py-2 text-right">Balance</th></tr>
          </thead>
          <tbody>
            {schedule.map((row) => (
              <tr key={row.month} className="border-t"><td className="px-3 py-2">{row.month}</td><td className="px-3 py-2 text-right">{row.emi}</td><td className="px-3 py-2 text-right text-destructive">{row.interest}</td><td className="px-3 py-2 text-right text-green-600">{row.principal}</td><td className="px-3 py-2 text-right">{row.balance}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
