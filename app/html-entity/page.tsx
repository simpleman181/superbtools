'use client';
"use client";

import { useState } from "react";
import { Code, Copy, Check } from "lucide-react";

const entities: Record<string, string> = {
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;',
  '/': '&#x2F;', '\\': '&#x5C;', ' ': '&nbsp;', '\n': '<br/>',
  '©': '&copy;', '®': '&reg;', '™': '&trade;', '€': '&euro;',
  '£': '&pound;', '¥': '&yen;', '¢': '&cent;', '§': '&sect;',
  '¶': '&para;', '•': '&bull;', '…': '&hellip;', '–': '&ndash;',
  '—': '&mdash;', '“': '&ldquo;', '”': '&rdquo;', '‘': '&lsquo;',
  '’': '&rsquo;', '«': '&laquo;', '»': '&raquo;', '°': '&deg;',
  '±': '&plusmn;', '×': '&times;', '÷': '&divide;', '¼': '&frac14;',
  '½': '&frac12;', '¾': '&frac34;', '¹': '&sup1;', '²': '&sup2;',
  '³': '&sup3;', 'α': '&alpha;', 'β': '&beta;', 'π': '&pi;',
  '∞': '&infin;', '≠': '&ne;', '≤': '&le;', '≥': '&ge;',
  '←': '&larr;', '↑': '&uarr;', '→': '&rarr;', '↓': '&darr;',
  '↔': '&harr;', '⇐': '&lArr;', '⇒': '&rArr;', '⇔': '&hArr;',
};

export default function HtmlEntity() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  const process = () => {
    if (mode === 'encode') {
      return input.split('').map((c) => entities[c] || c).join('');
    } else {
      let result = input;
      Object.entries(entities).forEach(([char, entity]) => {
        result = result.split(entity).join(char);
      });
      return result;
    }
  };

  const output = process();

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Code className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">HTML Entity Converter</h1>
          <p className="text-sm text-muted-foreground">Encode special characters to HTML entities</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setMode('encode')} className={`px-4 py-2 rounded-md text-sm font-medium ${mode === 'encode' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>Encode</button>
        <button onClick={() => setMode('decode')} className={`px-4 py-2 rounded-md text-sm font-medium ${mode === 'decode' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>Decode</button>
      </div>

      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === 'encode' ? 'Type <div>Hello & Welcome</div>' : 'Type &lt;div&gt;Hello &amp; Welcome&lt;/div&gt;'} className="w-full h-40 rounded-md border bg-background px-4 py-3 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring mb-4" />

      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">Result</span>
          <button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">{copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}{copied ? "Copied!" : "Copy"}</button>
        </div>
        <div className="font-mono text-sm break-all">{output || <span className="text-muted-foreground/50">—</span>}</div>
      </div>

      <div className="mt-4 grid grid-cols-4 md:grid-cols-8 gap-2">
        {Object.entries(entities).slice(0, 24).map(([char, entity]) => (
          <button key={char} onClick={() => setInput((p) => p + char)} className="text-xs rounded border px-2 py-1 hover:bg-accent text-center" title={entity}>
            {char === ' ' ? '␣' : char === '\n' ? '↵' : char}
          </button>
        ))}
      </div>
    </div>
  );
}
