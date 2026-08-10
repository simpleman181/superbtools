'use client';
"use client";

import { useState } from "react";
import { Server, Search } from "lucide-react";

export default function DnsChecker() {
  const [domain, setDomain] = useState('');
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    if (!domain) return;
    setLoading(true);
    setRecords([]);

    // Using Google's DNS-over-HTTPS API
    const types = ['A', 'AAAA', 'MX', 'TXT', 'CNAME', 'NS'];
    const results: any[] = [];

    for (const type of types) {
      try {
        const res = await fetch(`https://dns.google/resolve?name=${domain}&type=${type}`);
        const data = await res.json();
        if (data.Answer) {
          data.Answer.forEach((a: any) => {
            results.push({ type, value: a.data, ttl: a.TTL });
          });
        }
      } catch {
        // Skip failed lookups
      }
    }

    setRecords(results);
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Server className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">DNS Record Checker</h1>
          <p className="text-sm text-muted-foreground">Fetch A, MX, TXT, CNAME records for any domain</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="example.com"
          className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          onKeyDown={(e) => e.key === 'Enter' && check()}
        />
        <button onClick={check} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
          <Search className="h-4 w-4" />
          {loading ? 'Checking...' : 'Lookup'}
        </button>
      </div>

      {records.length > 0 && (
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr><th className="px-3 py-2 text-left">Type</th><th className="px-3 py-2 text-left">Value</th><th className="px-3 py-2 text-right">TTL</th></tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i} className="border-t">
                  <td className="px-3 py-2"><span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">{r.type}</span></td>
                  <td className="px-3 py-2 font-mono text-xs break-all">{r.value}</td>
                  <td className="px-3 py-2 text-right text-muted-foreground">{r.ttl}s</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && records.length === 0 && domain && (
        <div className="text-center py-8 text-muted-foreground text-sm">No records found or lookup failed</div>
      )}
    </div>
  );
}
