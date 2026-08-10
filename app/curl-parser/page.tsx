'use client';
"use client";

import { useState } from "react";
import { Terminal, Copy, Check } from "lucide-react";

export default function CurlParser() {
  const [input, setInput] = useState(`curl -X POST https://api.example.com/data \\
  -H "Content-Type: application/json" \\
  -d '{"key":"value"}'`);
  const [output, setOutput] = useState('');
  const [lang, setLang] = useState<'js' | 'python'>('js');
  const [copied, setCopied] = useState(false);

  const parse = () => {
    const urlMatch = input.match(/curl\s+(?:-X\s+\w+\s+)?["']?([^\s"']+)["']?/);
    const methodMatch = input.match(/-X\s+(\w+)/);
    const headerMatches = input.matchAll(/-H\s+["']([^"']+)["']/g);
    const dataMatch = input.match(/-d\s+["']([^"']+)["']/);

    const url = urlMatch?.[1] || '';
    const method = methodMatch?.[1] || 'GET';
    const headers: Record<string, string> = {};
    for (const match of headerMatches) {
      const [key, value] = match[1].split(': ');
      if (key && value) headers[key] = value;
    }
    const body = dataMatch?.[1];

    if (lang === 'js') {
      let code = `fetch("${url}", {\n  method: "${method}",\n`;
      if (Object.keys(headers).length > 0) {
        code += `  headers: ${JSON.stringify(headers, null, 2).replace(/\n/g, '\n  ')},\n`;
      }
      if (body) code += `  body: ${body}\n`;
      code += `});`;
      setOutput(code);
    } else {
      let code = `import requests\n\nresponse = requests.${method.toLowerCase()}("${url}"`;
      if (Object.keys(headers).length > 0) code += `, headers=${JSON.stringify(headers)}`;
      if (body) code += `, json=${body}`;
      code += `)\nprint(response.json())`;
      setOutput(code);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Terminal className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">cURL Command Parser</h1>
          <p className="text-sm text-muted-foreground">Convert cURL to fetch or Python requests</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setLang('js')} className={`px-4 py-2 rounded-md text-sm font-medium ${lang === 'js' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>JavaScript fetch</button>
        <button onClick={() => setLang('python')} className={`px-4 py-2 rounded-md text-sm font-medium ${lang === 'python' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>Python requests</button>
        <button onClick={parse} className="ml-auto px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">Parse</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">cURL Command</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-[300px] rounded-md border bg-background px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">{lang === 'js' ? 'JavaScript' : 'Python'}</label>
            {output && <button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">{copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}{copied ? "Copied!" : "Copy"}</button>}
          </div>
          <textarea value={output} readOnly className="w-full h-[300px] rounded-md border bg-muted/50 px-3 py-2 text-sm font-mono resize-none focus:outline-none" />
        </div>
      </div>
    </div>
  );
}
