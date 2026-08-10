'use client';
"use client";

import { useState } from "react";
import { Network } from "lucide-react";

export default function SubnetCalculator() {
  const [ip, setIp] = useState('192.168.1.0');
  const [cidr, setCidr] = useState(24);

  const calculate = () => {
    const parts = ip.split('.').map(Number);
    if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) return null;

    const mask = ~((1 << (32 - cidr)) - 1) >>> 0;
    const ipNum = (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
    const networkNum = (ipNum & mask) >>> 0;
    const broadcastNum = (networkNum | (~mask >>> 0)) >>> 0;
    const firstHost = (networkNum + 1) >>> 0;
    const lastHost = (broadcastNum - 1) >>> 0;
    const hosts = Math.max(0, (1 << (32 - cidr)) - 2);

    const toIp = (n: number) => [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff].join('.');
    const toMask = (n: number) => toIp(n);

    return {
      network: toIp(networkNum),
      broadcast: toIp(broadcastNum),
      firstHost: toIp(firstHost),
      lastHost: toIp(lastHost),
      mask: toMask(mask),
      hosts,
    };
  };

  const result = calculate();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Network className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Subnet Calculator</h1>
          <p className="text-sm text-muted-foreground">Calculate network boundaries from IP and CIDR</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <label className="text-sm font-medium block mb-1">IP Address</label>
          <input value={ip} onChange={(e) => setIp(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm font-mono" />
        </div>
        <div className="w-24">
          <label className="text-sm font-medium block mb-1">CIDR</label>
          <input type="number" min="0" max="32" value={cidr} onChange={(e) => setCidr(Number(e.target.value))} className="w-full rounded-md border px-3 py-2 text-sm" />
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border bg-card p-4 text-center"><div className="text-lg font-bold font-mono">{result.network}</div><div className="text-xs text-muted-foreground mt-1">Network Address</div></div>
          <div className="rounded-lg border bg-card p-4 text-center"><div className="text-lg font-bold font-mono">{result.broadcast}</div><div className="text-xs text-muted-foreground mt-1">Broadcast</div></div>
          <div className="rounded-lg border bg-card p-4 text-center"><div className="text-lg font-bold font-mono">{result.mask}</div><div className="text-xs text-muted-foreground mt-1">Subnet Mask</div></div>
          <div className="rounded-lg border bg-card p-4 text-center"><div className="text-lg font-bold font-mono">{result.hosts.toLocaleString()}</div><div className="text-xs text-muted-foreground mt-1">Usable Hosts</div></div>
          <div className="rounded-lg border bg-card p-4 text-center"><div className="text-lg font-bold font-mono">{result.firstHost}</div><div className="text-xs text-muted-foreground mt-1">First Host</div></div>
          <div className="rounded-lg border bg-card p-4 text-center"><div className="text-lg font-bold font-mono">{result.lastHost}</div><div className="text-xs text-muted-foreground mt-1">Last Host</div></div>
        </div>
      )}
    </div>
  );
}
