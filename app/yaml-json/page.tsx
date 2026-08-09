"use client";

import { useState } from "react";
import { FileCode, Copy, Check, AlertCircle } from "lucide-react";

function yamlToJson(yaml: string): string {
  const lines = yaml.split('\n');
  let indentStack: { indent: number; obj: any; isArray: boolean }[] = [];
  let root: any = null;

  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const indent = line.search(/\S/);
    const trimmed = line.trim();

    while (indentStack.length > 0 && indentStack[indentStack.length - 1].indent >= indent) {
      indentStack.pop();
    }

    const parent = indentStack.length > 0 ? indentStack[indentStack.length - 1].obj : null;

    if (trimmed.startsWith('- ')) {
      const val = trimmed.slice(2).trim();
      const parsed = parseValue(val);
      if (parent && Array.isArray(parent)) {
        parent.push(parsed);
      } else if (parent) {
        if (!parent._array) parent._array = [];
        parent._array.push(parsed);
      } else {
        root = root || [];
        root.push(parsed);
      }
      if (typeof parsed === 'object' && parsed !== null) {
        indentStack.push({ indent, obj: parsed, isArray: true });
      }
    } else {
      const colonIdx = trimmed.indexOf(':');
      if (colonIdx > 0) {
        const key = trimmed.slice(0, colonIdx).trim();
        const val = trimmed.slice(colonIdx + 1).trim();
        const parsed = parseValue(val);

        if (parent && !Array.isArray(parent)) {
          parent[key] = parsed;
          if (typeof parsed === 'object' && parsed !== null && !(parsed instanceof Array)) {
            indentStack.push({ indent, obj: parsed, isArray: false });
          }
        } else {
          root = root || {};
          root[key] = parsed;
          if (typeof parsed === 'object' && parsed !== null && !(parsed instanceof Array)) {
            indentStack.push({ indent, obj: root, isArray: false });
          }
        }
      }
    }
  }

  return JSON.stringify(root, null, 2);
}

function parseValue(val: string): any {
  if (!val) return null;
  if (val === 'true') return true;
  if (val === 'false') return false;
  if (val === 'null' || val === '~') return null;
  if (/^-?\d+$/.test(val)) return parseInt(val);
  if (/^-?\d+\.\d+$/.test(val)) return parseFloat(val);
  if (val.startsWith('"') && val.endsWith('"')) return val.slice(1, -1);
  if (val.startsWith("'") && val.endsWith("'")) return val.slice(1, -1);
  if (val.startsWith('[') && val.endsWith(']')) {
    try { return JSON.parse(val); } catch { return val; }
  }
  if (val.startsWith('{') && val.endsWith('}')) {
    try { return JSON.parse(val); } catch { return val; }
  }
  return val;
}

function jsonToYaml(json: string): string {
  try {
    const obj = JSON.parse(json);
    return convertToYaml(obj, 0);
  } catch (e) {
    return (e as Error).message;
  }
}

function convertToYaml(obj: any, indent: number): string {
  const spaces = '  '.repeat(indent);
  if (obj === null) return 'null';
  if (typeof obj === 'boolean') return obj ? 'true' : 'false';
  if (typeof obj === 'number') return String(obj);
  if (typeof obj === 'string') return obj.includes(':') || obj.includes('#') ? `"${obj}"` : obj;
  if (Array.isArray(obj)) {
    return obj.map((item) => `${spaces}- ${convertToYaml(item, indent + 1).trimStart()}`).join('\n');
  }
  if (typeof obj === 'object') {
    return Object.entries(obj).map(([k, v]) => {
      const val = convertToYaml(v, indent + 1);
      if (val.includes('\n')) {
        return `${spaces}${k}:\n${val}`;
      }
      return `${spaces}${k}: ${val}`;
    }).join('\n');
  }
  return String(obj);
}

export default function YamlJson() {
  const [input, setInput] = useState('name: DevToolkit\nversion: 1.0\nfeatures:\n  - JSON\n  - YAML\n  - CSV');
  const [mode, setMode] = useState<'yaml-to-json' | 'json-to-yaml'>('yaml-to-json');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const convert = () => {
    setError('');
    try {
      if (mode === 'yaml-to-json') {
        setOutput(yamlToJson(input));
      } else {
        setOutput(jsonToYaml(input));
      }
    } catch (e) {
      setError((e as Error).message);
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
        <FileCode className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">YAML ↔ JSON Converter</h1>
          <p className="text-sm text-muted-foreground">Switch between configuration formats</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setMode('yaml-to-json')} className={`px-4 py-2 rounded-md text-sm font-medium ${mode === 'yaml-to-json' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>YAML → JSON</button>
        <button onClick={() => setMode('json-to-yaml')} className={`px-4 py-2 rounded-md text-sm font-medium ${mode === 'json-to-yaml' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>JSON → YAML</button>
        <button onClick={convert} className="ml-auto px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">Convert</button>
      </div>

      {error && <div className="mb-4 flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"><AlertCircle className="h-4 w-4" />{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">{mode === 'yaml-to-json' ? 'YAML Input' : 'JSON Input'}</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-[400px] rounded-md border bg-background px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Output</label>
            {output && <button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">{copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}{copied ? "Copied!" : "Copy"}</button>}
          </div>
          <textarea value={output} readOnly className="w-full h-[400px] rounded-md border bg-muted/50 px-3 py-2 text-sm font-mono resize-none focus:outline-none" />
        </div>
      </div>
    </div>
  );
}
