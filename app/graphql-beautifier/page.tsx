"use client";

import { useState } from "react";
import { Braces, Copy, Check } from "lucide-react";

function beautifyGraphQL(query: string): string {
  let indent = 0;
  const lines = query.replace(/\s+/g, ' ').trim().split(/\s*(\{|\}|\(|\)|\[|\])\s*/g).filter(Boolean);
  const result: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line === '}' || line === ')') indent = Math.max(0, indent - 1);
    result.push('  '.repeat(indent) + line);
    if (line === '{' || line === '(') indent++;
  }

  return result.join('\n');
}

export default function GraphQLBeautifier() {
  const [input, setInput] = useState('query GetUser($id: ID!) { user(id: $id) { name email posts { title } } }');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const beautify = () => setOutput(beautifyGraphQL(input));

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Braces className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">GraphQL Query Beautifier</h1>
          <p className="text-sm text-muted-foreground">Format and indent GraphQL queries</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={beautify} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">Beautify</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="px-4 py-2 border rounded-md text-sm hover:bg-accent">Clear</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input GraphQL</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-[400px] rounded-md border bg-background px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Beautified</label>
            {output && <button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">{copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}{copied ? "Copied!" : "Copy"}</button>}
          </div>
          <textarea value={output} readOnly className="w-full h-[400px] rounded-md border bg-muted/50 px-3 py-2 text-sm font-mono resize-none focus:outline-none" />
        </div>
      </div>
    </div>
  );
}
