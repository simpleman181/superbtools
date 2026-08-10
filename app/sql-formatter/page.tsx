'use client';
"use client";

import { useState } from "react";
import { Database, Copy, Check } from "lucide-react";

const keywords = ['SELECT','FROM','WHERE','INSERT','UPDATE','DELETE','JOIN','LEFT','RIGHT','INNER','OUTER','ON','GROUP','BY','ORDER','HAVING','LIMIT','OFFSET','UNION','ALL','AND','OR','NOT','NULL','IS','IN','BETWEEN','LIKE','EXISTS','CASE','WHEN','THEN','ELSE','END','CREATE','TABLE','DROP','ALTER','INDEX','VIEW','TRIGGER','PROCEDURE','FUNCTION','DATABASE','SCHEMA','VALUES','SET','INTO','AS','DISTINCT','COUNT','SUM','AVG','MIN','MAX','ASC','DESC'];

function formatSQL(sql: string): string {
  let formatted = sql.replace(/\s+/g, ' ').trim();
  keywords.forEach((kw) => {
    const regex = new RegExp(`\\b${kw}\\b`, 'gi');
    formatted = formatted.replace(regex, `\n${kw}`);
  });
  formatted = formatted
    .replace(/\n\s*\n/g, '\n')
    .replace(/\b(AND|OR)\b/gi, '  $1')
    .replace(/\b(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP)\b/gi, '\n$1')
    .replace(/\b(FROM|WHERE|GROUP|ORDER|HAVING|LIMIT|VALUES|SET)\b/gi, '\n$1')
    .replace(/\b(JOIN|LEFT|RIGHT|INNER|OUTER)\b/gi, '\n  $1')
    .replace(/\b(ON)\b/gi, '    $1')
    .trim();
  return formatted;
}

export default function SqlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const format = () => setOutput(formatSQL(input));

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Database className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">SQL Query Formatter</h1>
          <p className="text-sm text-muted-foreground">Beautify and standardize SQL queries</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={format} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">Format SQL</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="px-4 py-2 border rounded-md text-sm hover:bg-accent">Clear</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input SQL</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste messy SQL here..." className="w-full h-[400px] rounded-md border bg-background px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Formatted SQL</label>
            {output && <button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">{copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}{copied ? "Copied!" : "Copy"}</button>}
          </div>
          <textarea value={output} readOnly placeholder="Formatted SQL will appear here..." className="w-full h-[400px] rounded-md border bg-muted/50 px-3 py-2 text-sm font-mono resize-none focus:outline-none" />
        </div>
      </div>
    </div>
  );
}
