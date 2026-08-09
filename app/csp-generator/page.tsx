"use client";

import { useState } from "react";
import { Shield, Copy, Check } from "lucide-react";

export default function CspGenerator() {
  const [self, setSelf] = useState(true);
  const [unsafeInline, setUnsafeInline] = useState(false);
  const [unsafeEval, setUnsafeEval] = useState(false);
  const [dataUri, setDataUri] = useState(false);
  const [blob, setBlob] = useState(false);
  const [https, setHttps] = useState(true);
  const [none, setNone] = useState(false);
  const [copied, setCopied] = useState(false);

  const directives: Record<string, string[]> = {};
  const sources: string[] = [];
  if (self) sources.push("'self'");
  if (unsafeInline) sources.push("'unsafe-inline'");
  if (unsafeEval) sources.push("'unsafe-eval'");
  if (dataUri) sources.push("data:");
  if (blob) sources.push("blob:");
  if (https) sources.push("https:");
  if (none) sources.push("'none'");

  if (sources.length > 0) {
    directives['default-src'] = sources;
    directives['script-src'] = sources;
    directives['style-src'] = sources;
    directives['img-src'] = [...sources, "data:"];
    directives['font-src'] = sources;
    directives['connect-src'] = sources;
  }

  const header = Object.entries(directives)
    .map(([key, vals]) => `${key} ${vals.join(' ')};`)
    .join(' ');

  const metaTag = `<meta http-equiv="Content-Security-Policy" content="${header}">`;

  const copy = () => {
    navigator.clipboard.writeText(metaTag);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">CSP Generator</h1>
          <p className="text-sm text-muted-foreground">Generate Content Security Policy headers</p>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4 space-y-3 mb-6">
        {[
          { label: "'self' - Allow same origin", state: self, set: setSelf },
          { label: "'unsafe-inline' - Allow inline scripts/styles", state: unsafeInline, set: setUnsafeInline },
          { label: "'unsafe-eval' - Allow eval()", state: unsafeEval, set: setUnsafeEval },
          { label: "data: - Allow data URIs", state: dataUri, set: setDataUri },
          { label: "blob: - Allow blob URIs", state: blob, set: setBlob },
          { label: "https: - Allow HTTPS only", state: https, set: setHttps },
          { label: "'none' - Block everything", state: none, set: setNone },
        ].map((opt) => (
          <label key={opt.label} className="flex items-center gap-3 text-sm cursor-pointer">
            <input type="checkbox" checked={opt.state} onChange={(e) => opt.set(e.target.checked)} className="h-4 w-4" />
            {opt.label}
          </label>
        ))}
      </div>

      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Meta Tag</span>
          <button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">{copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}{copied ? "Copied!" : "Copy"}</button>
        </div>
        <code className="text-xs font-mono break-all">{metaTag}</code>
      </div>
    </div>
  );
}
