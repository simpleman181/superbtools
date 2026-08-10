'use client';
"use client";

import { useState } from "react";
import { Type, Copy, Check } from "lucide-react";

export default function CaseConverter() {
  const [input, setInput] = useState('');
  const [copiedCase, setCopiedCase] = useState<string | null>(null);

  const toUpper = (s: string) => s.toUpperCase();
  const toLower = (s: string) => s.toLowerCase();
  const toTitle = (s: string) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  const toCamel = (s: string) => s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
  const toSnake = (s: string) => s.replace(/\W+/g, " ").trim().replace(/\s+/g, "_").toLowerCase();
  const toKebab = (s: string) => s.replace(/\W+/g, " ").trim().replace(/\s+/g, "-").toLowerCase();
  const toPascal = (s: string) => s.toLowerCase().replace(/(?:^|[^a-zA-Z0-9]+)(\w)/g, (_, c) => c.toUpperCase());

  const cases = [
    { name: "UPPERCASE", fn: toUpper },
    { name: "lowercase", fn: toLower },
    { name: "Title Case", fn: toTitle },
    { name: "camelCase", fn: toCamel },
    { name: "PascalCase", fn: toPascal },
    { name: "snake_case", fn: toSnake },
    { name: "kebab-case", fn: toKebab },
  ];

  const copy = (text: string, caseName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCase(caseName);
    setTimeout(() => setCopiedCase(null), 1500);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Type className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Case Converter</h1>
          <p className="text-sm text-muted-foreground">Convert text between different cases instantly</p>
        </div>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type or paste your text here..."
        className="w-full h-40 rounded-md border bg-background px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring mb-6"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cases.map((c) => {
          const result = input ? c.fn(input) : "";
          return (
            <div key={c.name} className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{c.name}</span>
                {result && (
                  <button onClick={() => copy(result, c.name)} className="text-muted-foreground hover:text-foreground">
                    {copiedCase === c.name ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                )}
              </div>
              <div className="font-mono text-sm break-all min-h-[1.5rem]">{result || <span className="text-muted-foreground/50">—</span>}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
