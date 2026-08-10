'use client';
"use client";

import { useState } from "react";
import { KeyRound, AlertCircle } from "lucide-react";

function base64UrlDecode(str: string) {
  try {
    const padding = "=".repeat((4 - (str.length % 4)) % 4);
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/") + padding;
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export default function JwtDebugger() {
  const [token, setToken] = useState('');

  const parts = token.trim().split('.');
  const header = parts[0] ? base64UrlDecode(parts[0]) : null;
  const payload = parts[1] ? base64UrlDecode(parts[1]) : null;
  const signature = parts[2] || '';
  const isValid = parts.length === 3 && header && payload;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <KeyRound className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">JWT Debugger</h1>
          <p className="text-sm text-muted-foreground">Decode and inspect JSON Web Tokens</p>
        </div>
      </div>

      <textarea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Paste your JWT token here (header.payload.signature)..."
        className="w-full h-32 rounded-md border bg-background px-4 py-3 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring mb-4"
      />

      {token && !isValid && (
        <div className="mb-4 flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          Invalid JWT format
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg border bg-card p-4">
          <h3 className="text-sm font-semibold mb-2 text-muted-foreground">HEADER: ALGORITHM & TOKEN TYPE</h3>
          <pre className="text-xs font-mono bg-muted rounded p-3 overflow-auto max-h-48">
            {header ? JSON.stringify(header, null, 2) : <span className="text-muted-foreground">—</span>}
          </pre>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <h3 className="text-sm font-semibold mb-2 text-muted-foreground">PAYLOAD: DATA</h3>
          <pre className="text-xs font-mono bg-muted rounded p-3 overflow-auto max-h-48">
            {payload ? JSON.stringify(payload, null, 2) : <span className="text-muted-foreground">—</span>}
          </pre>
        </div>
      </div>

      {signature && (
        <div className="mt-4 rounded-lg border bg-card p-4">
          <h3 className="text-sm font-semibold mb-2 text-muted-foreground">SIGNATURE</h3>
          <code className="text-xs font-mono break-all">{signature}</code>
        </div>
      )}

      {payload && payload.exp && (
        <div className="mt-4 rounded-lg border bg-card p-4">
          <h3 className="text-sm font-semibold mb-2">Token Expiry</h3>
          <p className="text-sm">
            Expires: {new Date(payload.exp * 1000).toLocaleString()} <br />
            <span className={Date.now() > payload.exp * 1000 ? 'text-destructive' : 'text-green-600'}>
              {Date.now() > payload.exp * 1000 ? '⚠️ Token has expired' : '✓ Token is valid'}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
