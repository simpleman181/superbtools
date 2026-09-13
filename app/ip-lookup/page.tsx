'use client';

import { useState, useEffect } from "react";
import { Globe, Copy, Check, Loader2, AlertCircle, RefreshCw } from "lucide-react";

interface GeoInfo {
  ip?: string;
  city?: string;
  region?: string;
  country_name?: string;
  country?: string;
  org?: string;
  timezone?: string;
  latitude?: number;
  longitude?: number;
  postal?: string;
  asn?: string;
  currency?: string;
  languages?: string;
}

// Multiple fallback APIs to handle CORS/rate-limits
const IP_APIS = [
  { name: 'ipapi.co', url: () => 'https://ipapi.co/json/', parse: (d: any): GeoInfo => ({ ip: d.ip, city: d.city, region: d.region, country_name: d.country_name, org: d.org, timezone: d.timezone, latitude: d.latitude, longitude: d.longitude, postal: d.postal, asn: d.asn, currency: d.currency, languages: d.languages }) },
  { name: 'ip-api.com', url: () => 'http://ip-api.com/json/?fields=status,message,country,regionName,city,zip,lat,lon,timezone,org,as,query', parse: (d: any): GeoInfo => ({ ip: d.query, city: d.city, region: d.regionName, country_name: d.country, org: d.org, timezone: d.timezone, latitude: d.lat, longitude: d.lon, postal: d.zip, asn: d.as }) },
  { name: 'ipwho.is', url: () => 'https://ipwho.is/', parse: (d: any): GeoInfo => ({ ip: d.ip, city: d.city, region: d.region, country_name: d.country, org: d.connection?.org, timezone: d.timezone?.id, latitude: d.latitude, longitude: d.longitude, postal: d.postal }) },
];

export default function IpLookup() {
  const [info, setInfo] = useState<GeoInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [source, setSource] = useState('');
  const [copied, setCopied] = useState(false);
  const [ua, setUa] = useState('');
  const [manualIp, setManualIp] = useState('');
  const [mode, setMode] = useState<'mine' | 'lookup'>('mine');

  useEffect(() => {
    setUa(navigator.userAgent);
    fetchMyIp();
  }, []);

  const fetchMyIp = async () => {
    setLoading(true); setError(''); setInfo(null);
    for (const api of IP_APIS) {
      try {
        const res = await fetch(api.url(), { signal: AbortSignal.timeout(5000) });
        if (!res.ok) continue;
        const data = await res.json();
        if (data.error || data.status === 'fail') continue;
        setInfo(api.parse(data));
        setSource(api.name);
        setLoading(false);
        return;
      } catch { continue; }
    }
    setError('Could not retrieve IP info. Check your connection and try again.');
    setLoading(false);
  };

  const lookupIp = async () => {
    if (!manualIp.trim()) return;
    setLoading(true); setError(''); setInfo(null);
    const targets = [
      { name: 'ipapi.co', url: `https://ipapi.co/${manualIp.trim()}/json/`, parse: IP_APIS[0].parse },
      { name: 'ipwho.is', url: `https://ipwho.is/${manualIp.trim()}`, parse: IP_APIS[2].parse },
    ];
    for (const api of targets) {
      try {
        const res = await fetch(api.url, { signal: AbortSignal.timeout(5000) });
        if (!res.ok) continue;
        const data = await res.json();
        if (data.error || data.reserved) { setError(`IP ${manualIp} is a reserved/private address.`); break; }
        setInfo(api.parse(data));
        setSource(api.name);
        setLoading(false);
        return;
      } catch { continue; }
    }
    if (!info) setError(`Could not look up ${manualIp}. Check the IP address and try again.`);
    setLoading(false);
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const fields = [
    { label: 'City', value: info?.city },
    { label: 'Region', value: info?.region },
    { label: 'Country', value: info?.country_name },
    { label: 'Postal', value: info?.postal },
    { label: 'ISP / Org', value: info?.org },
    { label: 'ASN', value: info?.asn },
    { label: 'Timezone', value: info?.timezone },
    { label: 'Currency', value: info?.currency },
    { label: 'Languages', value: info?.languages },
    { label: 'Latitude', value: info?.latitude?.toString() },
    { label: 'Longitude', value: info?.longitude?.toString() },
  ].filter(f => f.value);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Globe className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">IP Address Lookup</h1>
          <p className="text-sm text-muted-foreground">Get geolocation and network info for any IP</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => { setMode('mine'); fetchMyIp(); }}
          className={`px-3 py-1.5 rounded-md text-sm font-medium ${mode === 'mine' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>My IP</button>
        <button onClick={() => setMode('lookup')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium ${mode === 'lookup' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>Lookup IP</button>
      </div>

      {mode === 'lookup' && (
        <div className="flex gap-2 mb-4">
          <input value={manualIp} onChange={(e) => setManualIp(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && lookupIp()}
            placeholder="e.g. 8.8.8.8 or 2001:4860:4860::8888"
            className="flex-1 rounded-md border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring" />
          <button onClick={lookupIp} disabled={loading}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Lookup'}
          </button>
        </div>
      )}

      {mode === 'mine' && (
        <button onClick={fetchMyIp} disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60 mb-4">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          {loading ? 'Fetching...' : 'Refresh'}
        </button>
      )}

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm p-3 rounded-md bg-destructive/10 mb-4">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />{error}
        </div>
      )}

      {info?.ip && (
        <div className="rounded-lg border bg-card p-4 mb-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground mb-0.5">IP Address</div>
            <div className="text-2xl font-mono font-bold">{info.ip}</div>
            {source && <div className="text-xs text-muted-foreground mt-1">via {source}</div>}
          </div>
          <button onClick={() => copy(info.ip!)}
            className="p-2 border rounded-md hover:bg-accent flex items-center gap-1 text-xs">
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}

      {fields.length > 0 && (
        <div className="rounded-lg border bg-card p-4 mb-4">
          <h3 className="text-sm font-semibold mb-3">Geolocation & Network</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {fields.map(f => (
              <div key={f.label} className="contents">
                <div className="text-muted-foreground">{f.label}</div>
                <div className="font-medium truncate">{f.value}</div>
              </div>
            ))}
          </div>
          {info?.latitude && info?.longitude && (
            <a href={`https://www.openstreetmap.org/?mlat=${info.latitude}&mlon=${info.longitude}&zoom=10`}
              target="_blank" rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline">
              View on map ↗
            </a>
          )}
        </div>
      )}

      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-sm font-semibold mb-2">Your Browser</h3>
        <div className="text-xs font-mono break-all text-muted-foreground leading-relaxed">{ua}</div>
      </div>
    </div>
  );
}
