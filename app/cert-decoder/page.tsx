"use client";

import { useState } from "react";
import { Lock, AlertCircle } from "lucide-react";

export default function CertDecoder() {
  const [cert, setCert] = useState('');
  const [decoded, setDecoded] = useState<any>(null);
  const [error, setError] = useState('');

  const decode = () => {
    setError('');
    try {
      // Simple PEM parser for demo
      const pem = cert.replace(/-----BEGIN CERTIFICATE-----/g, '').replace(/-----END CERTIFICATE-----/g, '').replace(/\s/g, '');
      if (!pem) { setDecoded(null); return; }

      // Decode base64 and extract some info
      const binary = atob(pem);
      const info: any = {};

      // Extract common name
      const cnMatch = binary.match(/CN=([^,\x00]+)/);
      if (cnMatch) info.commonName = cnMatch[1];

      // Extract dates (simplified)
      const dateMatch = binary.match(/(\d{12,14}Z)/g);
      if (dateMatch) {
        info.notBefore = dateMatch[0];
        info.notAfter = dateMatch[1];
      }

      // Extract issuer
      const issuerMatch = binary.match(/O=([^,\x00]+)/);
      if (issuerMatch) info.issuer = issuerMatch[1];

      info.rawLength = pem.length;
      info.derLength = binary.length;

      setDecoded(info);
    } catch (e) {
      setError((e as Error).message);
      setDecoded(null);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Lock className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">X.509 Certificate Decoder</h1>
          <p className="text-sm text-muted-foreground">Parse SSL/TLS certificate details</p>
        </div>
      </div>

      <textarea
        value={cert}
        onChange={(e) => setCert(e.target.value)}
        placeholder="Paste PEM certificate here..."
        className="w-full h-48 rounded-md border bg-background px-4 py-3 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring mb-4"
      />

      <button onClick={decode} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 mb-4">
        Decode Certificate
      </button>

      {error && <div className="mb-4 flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"><AlertCircle className="h-4 w-4" />{error}</div>}

      {decoded && (
        <div className="rounded-lg border bg-card p-4 space-y-2">
          <h3 className="font-semibold mb-2">Certificate Information</h3>
          {Object.entries(decoded).map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm border-b pb-2">
              <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              <span className="font-mono">{String(value)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
