'use client';
"use client";

import { useState } from "react";
import { DollarSign } from "lucide-react";

export default function SalaryEstimator() {
  const [gross, setGross] = useState(60000);
  const [taxRate, setTaxRate] = useState(20);
  const [deductions, setDeductions] = useState(5000);

  const taxableIncome = Math.max(0, gross - deductions);
  const tax = taxableIncome * (taxRate / 100);
  const net = gross - tax;
  const monthly = net / 12;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <DollarSign className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Salary / Take-Home Pay Estimator</h1>
          <p className="text-sm text-muted-foreground">Estimate net pay after taxes and deductions</p>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 space-y-4 mb-6">
        <div>
          <label className="text-sm font-medium block mb-1">Gross Annual Salary</label>
          <input type="number" value={gross} onChange={(e) => setGross(Number(e.target.value))} className="w-full rounded-md border px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Tax Rate (%)</label>
          <input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} className="w-full rounded-md border px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Annual Deductions</label>
          <input type="number" value={deductions} onChange={(e) => setDeductions(Number(e.target.value))} className="w-full rounded-md border px-3 py-2 text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-lg border bg-card p-4 text-center"><div className="text-xl font-bold">{gross.toLocaleString()}</div><div className="text-xs text-muted-foreground mt-1">Gross</div></div>
        <div className="rounded-lg border bg-card p-4 text-center"><div className="text-xl font-bold text-destructive">{tax.toFixed(0)}</div><div className="text-xs text-muted-foreground mt-1">Tax</div></div>
        <div className="rounded-lg border bg-card p-4 text-center"><div className="text-xl font-bold text-green-600">{net.toFixed(0)}</div><div className="text-xs text-muted-foreground mt-1">Net Annual</div></div>
        <div className="rounded-lg border bg-card p-4 text-center"><div className="text-xl font-bold text-primary">{monthly.toFixed(0)}</div><div className="text-xs text-muted-foreground mt-1">Monthly</div></div>
      </div>
    </div>
  );
}
