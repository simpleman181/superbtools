'use client';
"use client";

import { useState } from "react";
import { Shield } from "lucide-react";

export default function PasswordEntropy() {
  const [password, setPassword] = useState('');

  const calculateEntropy = (pwd: string) => {
    if (!pwd) return { bits: 0, pool: 0, time: '' };
    let pool = 0;
    if (/[a-z]/.test(pwd)) pool += 26;
    if (/[A-Z]/.test(pwd)) pool += 26;
    if (/[0-9]/.test(pwd)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) pool += 32;
    const bits = Math.log2(Math.pow(pool, pwd.length));
    const guesses = Math.pow(pool, pwd.length);
    const seconds = guesses / 1e12; // Assume 1 trillion guesses/sec
    let time = '';
    if (seconds < 60) time = `${seconds.toFixed(2)} seconds`;
    else if (seconds < 3600) time = `${(seconds / 60).toFixed(2)} minutes`;
    else if (seconds < 86400) time = `${(seconds / 3600).toFixed(2)} hours`;
    else if (seconds < 31536000) time = `${(seconds / 86400).toFixed(2)} days`;
    else if (seconds < 3153600000) time = `${(seconds / 31536000).toFixed(2)} years`;
    else time = `${(seconds / 3153600000).toFixed(2)} centuries`;
    return { bits, pool, time };
  };

  const result = calculateEntropy(password);

  const strength = result.bits < 28 ? { label: 'Very Weak', color: 'bg-red-500' } :
    result.bits < 36 ? { label: 'Weak', color: 'bg-orange-500' } :
    result.bits < 60 ? { label: 'Reasonable', color: 'bg-yellow-500' } :
    result.bits < 128 ? { label: 'Strong', color: 'bg-blue-500' } :
    { label: 'Very Strong', color: 'bg-green-500' };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Password Entropy Calculator</h1>
          <p className="text-sm text-muted-foreground">Analyze password randomness and brute-force time</p>
        </div>
      </div>

      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter a password to analyze..."
        className="w-full rounded-md border px-3 py-2 text-sm font-mono mb-6"
      />

      {password && (
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Entropy</span>
              <span className="text-2xl font-bold">{result.bits.toFixed(1)} bits</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className={`h-full ${strength.color} transition-all`} style={{ width: `${Math.min(100, (result.bits / 128) * 100)}%` }} />
            </div>
            <div className="text-sm font-medium mt-2">{strength.label}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border bg-card p-4 text-center">
              <div className="text-xl font-bold">{result.pool}</div>
              <div className="text-xs text-muted-foreground mt-1">Character Pool</div>
            </div>
            <div className="rounded-lg border bg-card p-4 text-center">
              <div className="text-xl font-bold">{result.time}</div>
              <div className="text-xs text-muted-foreground mt-1">Brute-force Time</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
