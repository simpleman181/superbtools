'use client';
"use client";

import { useState } from "react";
import { Lock, Copy, Check, RefreshCw } from "lucide-react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const nums = '0123456789';
    const syms = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (uppercase) chars += upper;
    if (lowercase) chars += lower;
    if (numbers) chars += nums;
    if (symbols) chars += syms;

    if (!chars) return;

    let result = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
  };

  const copy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const strength = () => {
    if (!password) return { label: '', color: '' };
    let score = 0;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { label: 'Weak', color: 'bg-red-500' };
    if (score <= 4) return { label: 'Fair', color: 'bg-yellow-500' };
    if (score <= 5) return { label: 'Good', color: 'bg-blue-500' };
    return { label: 'Strong', color: 'bg-green-500' };
  };

  const s = strength();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Lock className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Password Generator</h1>
          <p className="text-sm text-muted-foreground">Generate secure, customizable passwords</p>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 bg-muted rounded-lg px-4 py-3 font-mono text-lg break-all">
            {password || <span className="text-muted-foreground">Click generate...</span>}
          </div>
          <button onClick={generate} className="p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
            <RefreshCw className="h-5 w-5" />
          </button>
          {password && (
            <button onClick={copy} className="p-3 border rounded-lg hover:bg-accent">
              {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
            </button>
          )}
        </div>

        {password && (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div className={`h-full ${s.color} transition-all`} style={{ width: `${(strength().label === 'Weak' ? 25 : strength().label === 'Fair' ? 50 : strength().label === 'Good' ? 75 : 100)}%` }} />
            </div>
            <span className="text-sm font-medium">{s.label}</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Length: {length}</label>
          <input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Uppercase (A-Z)', state: uppercase, set: setUppercase },
            { label: 'Lowercase (a-z)', state: lowercase, set: setLowercase },
            { label: 'Numbers (0-9)', state: numbers, set: setNumbers },
            { label: 'Symbols (!@#)', state: symbols, set: setSymbols },
          ].map((opt) => (
            <label key={opt.label} className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-accent">
              <input
                type="checkbox"
                checked={opt.state}
                onChange={(e) => opt.set(e.target.checked)}
                className="h-4 w-4"
              />
              <span className="text-sm">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
