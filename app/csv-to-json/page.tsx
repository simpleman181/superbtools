"use client";

import { useState } from "react";
import { Table, Copy, Check, Download } from "lucide-react";

export default function CsvToJson() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [delimiter, setDelimiter] = useState(',');
  const [hasHeader, setHasHeader] = useState(true);

  const convert = () => {
    if (!input.trim()) {
      setOutput('');
      return;
    }
    const lines = input.trim().split('\n');
    if (lines.length === 0) return;

    const parseLine = (line: string) => {
      const result: string[] = [];
      let current = '';
      let inQuotes = false;
      for (const char of line) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === delimiter && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    };

    const headers = hasHeader ? parseLine(lines[0]) : lines[0].split(delimiter).map((_, i) => `col${i + 1}`);
    const dataLines = hasHeader ? lines.slice(1) : lines;

    const result = dataLines.map((line) => {
      const values = parseLine(line);
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => {
        obj[h] = values[i] || '';
      });
      return obj;
    });

    setOutput(JSON.stringify(result, null, 2));
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const download = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.json';
    a.click();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Table className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">CSV to JSON Converter</h1>
          <p className="text-sm text-muted-foreground">Transform tabular data into structured JSON</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={hasHeader} onChange={(e) => setHasHeader(e.target.checked)} className="h-4 w-4" />
          First row is header
        </label>
        <div className="flex items-center gap-2">
          <label className="text-sm">Delimiter:</label>
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            className="rounded-md border px-2 py-1 text-sm"
          >
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="\t">Tab</option>
            <option value="|">Pipe (|)</option>
          </select>
        </div>
        <button onClick={convert} className="ml-auto px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
          Convert
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">CSV Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`name,age,city\nJohn,30,NYC\nJane,25,LA`}
            className="w-full h-[400px] rounded-md border bg-background px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">JSON Output</label>
            <div className="flex gap-2">
              {output && (
                <>
                  <button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button onClick={download} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                    <Download className="h-3 w-3" />
                    Download
                  </button>
                </>
              )}
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="JSON output will appear here..."
            className="w-full h-[400px] rounded-md border bg-muted/50 px-3 py-2 text-sm font-mono resize-none focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
