'use client';
"use client";

import { useState, useEffect } from "react";
import { Globe, Copy, Check } from "lucide-react";

export default function IpLookup() {
  const [ip, setIp] = useState('');
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [ua, setUa] = useState('');

  useEffect(() => {
    setUa(navigator.userAgent);
  }, []);

  const fetchIp = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      setIp(data.ip);
      // Try to get geo info
      try {
        const geoRes = await fetch(`https://ipapi.co/${data.ip}/json/`);
        const geo = await geoRes.json();
        setInfo(geo);
      } catch {
        setInfo(null);
      }
    } catch {
      setIp('Unable to fetch');
    }
    setLoading(false);
  };

  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Globe className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">IP Address Lookup</h1>
          <p className="text-sm text-muted-foreground">Display your public IP and browser info</p>
        </div>
      </div>

      <button onClick={fetchIp} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 mb-6">
        {loading ? 'Fetching...' : 'Get My IP'}
      </button>

      {ip && (
        <div className="rounded-lg border bg-card p-4 mb-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Your Public IP</div>
            <div className="text-xl font-mono font-bold">{ip}</div>
          </div>
          <button onClick={copy} className="p-2 border rounded-md hover:bg-accent">
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      )}

      {info && (
        <div className="rounded-lg border bg-card p-4 mb-4">
          <h3 className="text-sm font-semibold mb-2">Location Info</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground">City</div><div>{info.city || '—'}</div>
            <div className="text-muted-foreground">Region</div><div>{info.region || '—'}</div>
            <div className="text-muted-foreground">Country</div><div>{info.country_name || '—'}</div>
            <div className="text-muted-foreground">ISP</div><div>{info.org || '—'}</div>
            <div className="text-muted-foreground">Timezone</div><div>{info.timezone || '—'}</div>
          </div>
        </div>
      )}

      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-sm font-semibold mb-2">Browser Information</h3>
        <div className="text-xs font-mono break-all text-muted-foreground">{ua}</div>
      </div>
    </div>
  );
}
