"use client";

import { useState } from "react";
import { Receipt, Plus, Trash2, Printer } from "lucide-react";

interface LineItem {
  description: string;
  qty: number;
  rate: number;
}

export default function InvoiceGenerator() {
  const [company, setCompany] = useState('DevToolkit Inc.');
  const [client, setClient] = useState('Acme Corp');
  const [items, setItems] = useState<LineItem[]>([{ description: 'Web Development', qty: 10, rate: 100 }]);
  const [taxRate, setTaxRate] = useState(10);

  const subtotal = items.reduce((sum, item) => sum + item.qty * item.rate, 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  const addItem = () => setItems([...items, { description: '', qty: 1, rate: 0 }]);
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i: number, field: keyof LineItem, value: string | number) => {
    const newItems = [...items];
    newItems[i] = { ...newItems[i], [field]: value };
    setItems(newItems);
  };

  const printInvoice = () => window.print();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Receipt className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Invoice Generator</h1>
          <p className="text-sm text-muted-foreground">Create and print professional invoices</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="text-sm font-medium block mb-1">Your Company</label><input value={company} onChange={(e) => setCompany(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm" /></div>
          <div><label className="text-sm font-medium block mb-1">Client</label><input value={client} onChange={(e) => setClient(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm" /></div>
        </div>

        <div className="rounded-lg border bg-card p-4 space-y-2">
          <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground">
            <div className="col-span-6">Description</div>
            <div className="col-span-2">Qty</div>
            <div className="col-span-2">Rate</div>
            <div className="col-span-1">Amount</div>
            <div className="col-span-1"></div>
          </div>
          {items.map((item, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-center">
              <input value={item.description} onChange={(e) => updateItem(i, 'description', e.target.value)} className="col-span-6 rounded-md border px-2 py-1.5 text-sm" />
              <input type="number" value={item.qty} onChange={(e) => updateItem(i, 'qty', Number(e.target.value))} className="col-span-2 rounded-md border px-2 py-1.5 text-sm" />
              <input type="number" value={item.rate} onChange={(e) => updateItem(i, 'rate', Number(e.target.value))} className="col-span-2 rounded-md border px-2 py-1.5 text-sm" />
              <div className="col-span-1 text-sm font-medium">{(item.qty * item.rate).toFixed(2)}</div>
              <button onClick={() => removeItem(i)} className="col-span-1 text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
          <button onClick={addItem} className="flex items-center gap-1 text-sm text-primary hover:underline"><Plus className="h-4 w-4" /> Add Line Item</button>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Tax Rate (%):</label>
          <input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} className="w-20 rounded-md border px-3 py-2 text-sm" />
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 mb-6 print-area">
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">{company}</h2>
            <p className="text-sm text-muted-foreground">Invoice</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Date: {new Date().toLocaleDateString()}</p>
            <p className="text-sm text-muted-foreground">Invoice #: INV-{Date.now().toString().slice(-6)}</p>
          </div>
        </div>
        <p className="text-sm mb-4"><strong>Bill To:</strong> {client}</p>
        <table className="w-full text-sm mb-4">
          <thead className="border-b"><tr><th className="text-left py-2">Description</th><th className="text-right py-2">Qty</th><th className="text-right py-2">Rate</th><th className="text-right py-2">Amount</th></tr></thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-b"><td className="py-2">{item.description}</td><td className="text-right py-2">{item.qty}</td><td className="text-right py-2">{item.rate.toFixed(2)}</td><td className="text-right py-2 font-medium">{(item.qty * item.rate).toFixed(2)}</td></tr>
            ))}
          </tbody>
        </table>
        <div className="text-right space-y-1">
          <p className="text-sm">Subtotal: {subtotal.toFixed(2)}</p>
          <p className="text-sm">Tax ({taxRate}%): {tax.toFixed(2)}</p>
          <p className="text-lg font-bold">Total: {total.toFixed(2)}</p>
        </div>
      </div>

      <button onClick={printInvoice} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
        <Printer className="h-4 w-4" /> Print Invoice
      </button>
    </div>
  );
}
