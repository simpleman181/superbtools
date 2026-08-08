"use client";

import { useState } from "react";
import { ArrowLeftRight, Copy, Check } from "lucide-react";

export default function Base64Page() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const process = () => {
    setError('');
    try {
      if (!input) {
        setOutput('');
        return;
      }
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setInput(result.split(',')[1]);
      setMode('decode');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <ArrowLeftRight className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Base64 Encoder / Decoder</h1>
          <p className="text-sm text-muted-foreground">Convert text or files to/from Base64</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => { setMode('encode'); setOutput(''); setError(''); }}
          className={`px-4 py-2 rounded-md text-sm font-medium ${mode === 'encode' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
        >
          Encode
        </button>
        <button
          onClick={() => { setMode('decode'); setOutput(''); setError(''); }}
          className={`px-4 py-2 rounded-md text-sm font-medium ${mode === 'decode' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
        >
          Decode
        </button>
      </div>

      <div className="mb-4">
        <input type="file" onChange={handleFile} className="text-sm" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">{mode === 'encode' ? 'Text Input' : 'Base64 Input'}</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
            className="w-full h-[300px] rounded-md border bg-background px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Output</label>
            {output && (
              <button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Result will appear here..."
            className="w-full h-[300px] rounded-md border bg-muted/50 px-3 py-2 text-sm font-mono resize-none focus:outline-none"
          />
        </div>
      </div>

      <button onClick={process} className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
        {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
      </button>

      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}
