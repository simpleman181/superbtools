'use client';
"use client";

import { useState } from "react";
import { Table, Download, Copy, Check } from "lucide-react";

export default function JsonExcel() {
  const [input, setInput] = useState('[\n  {"name": "Alice", "age": 30, "city": "NYC"},\n  {"name": "Bob", "age": 25, "city": "LA"}\n]');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const convert = () => {
    try {
      const data = JSON.parse(input);
      const arr = Array.isArray(data) ? data : [data];
      if (arr.length === 0) { setOutput(''); return; }
      const keys = Object.keys(arr[0]);
      const csv = [keys.join(','), ...arr.map((row: any) => keys.map((k) => `"${String(row[k] || '').replace(/"/g, '""')}"`).join(','))].join('\n');
      setOutput(csv);
    } catch (e) {
      setOutput((e as Error).message);
    }
  };

  const download = () => {
    const blob = new Blob([output], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Table className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">JSON to Excel/CSV Converter</h1>
          <p className="text-sm text-muted-foreground">Transform JSON into downloadable spreadsheets</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={convert} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">Convert to CSV</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="px-4 py-2 border rounded-md text-sm hover:bg-accent">Clear</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">JSON Input</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-[400px] rounded-md border bg-background px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">CSV Output</label>
            <div className="flex gap-2">
              {output && <><button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">{copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}{copied ? "Copied!" : "Copy"}</button><button onClick={download} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><Download className="h-3 w-3" /> Download</button></>}
            </div>
          </div>
          <textarea value={output} readOnly className="w-full h-[400px] rounded-md border bg-muted/50 px-3 py-2 text-sm font-mono resize-none focus:outline-none" />
        </div>
      </div>
    </div>
  );
}
