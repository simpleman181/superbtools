"use client";

import { useState, useEffect } from "react";
import { Monitor } from "lucide-react";

export default function UserAgent() {
  const [ua, setUa] = useState('');

  useEffect(() => {
    setUa(navigator.userAgent);
  }, []);

  const parse = () => {
    const result: Record<string, string> = {};
    result['User Agent'] = ua;
    result['Platform'] = navigator.platform;
    result['Language'] = navigator.language;
    result['Online'] = navigator.onLine ? 'Yes' : 'No';
    result['Cookies'] = navigator.cookieEnabled ? 'Enabled' : 'Disabled';
    result['Touch'] = navigator.maxTouchPoints > 0 ? `Yes (${navigator.maxTouchPoints} points)` : 'No';
    result['Cores'] = String(navigator.hardwareConcurrency || 'Unknown');
    result['Memory'] = (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB` : 'Unknown';

    if (ua.includes('Windows')) result['OS'] = 'Windows';
    else if (ua.includes('Mac')) result['OS'] = 'macOS';
    else if (ua.includes('Linux')) result['OS'] = 'Linux';
    else if (ua.includes('Android')) result['OS'] = 'Android';
    else if (ua.includes('iPhone') || ua.includes('iPad')) result['OS'] = 'iOS';
    else result['OS'] = 'Unknown';

    if (ua.includes('Chrome') && !ua.includes('Edg')) result['Browser'] = 'Chrome';
    else if (ua.includes('Firefox')) result['Browser'] = 'Firefox';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) result['Browser'] = 'Safari';
    else if (ua.includes('Edg')) result['Browser'] = 'Edge';
    else result['Browser'] = 'Unknown';

    const match = ua.match(/(Chrome|Firefox|Safari|Edg)\/([\d.]+)/);
    result['Version'] = match ? match[2] : 'Unknown';

    if (ua.includes('Mobile')) result['Device'] = 'Mobile';
    else if (ua.includes('Tablet')) result['Device'] = 'Tablet';
    else result['Device'] = 'Desktop';

    return result;
  };

  const data = parse();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Monitor className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">User-Agent Parser</h1>
          <p className="text-sm text-muted-foreground">Decode browser and OS information</p>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4 mb-4">
        <label className="text-xs text-muted-foreground block mb-1">Raw User-Agent</label>
        <div className="text-xs font-mono break-all">{ua}</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="rounded-lg border bg-card p-3">
            <div className="text-xs text-muted-foreground">{key}</div>
            <div className="text-sm font-medium">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
