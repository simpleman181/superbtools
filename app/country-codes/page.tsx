'use client';
"use client";

import { useState } from "react";
import { Globe, Search } from "lucide-react";

const countries = [
  { name: "United States", code: "US", tld: ".us", dial: "+1" },
  { name: "United Kingdom", code: "GB", tld: ".uk", dial: "+44" },
  { name: "Canada", code: "CA", tld: ".ca", dial: "+1" },
  { name: "Australia", code: "AU", tld: ".au", dial: "+61" },
  { name: "Germany", code: "DE", tld: ".de", dial: "+49" },
  { name: "France", code: "FR", tld: ".fr", dial: "+33" },
  { name: "Japan", code: "JP", tld: ".jp", dial: "+81" },
  { name: "China", code: "CN", tld: ".cn", dial: "+86" },
  { name: "India", code: "IN", tld: ".in", dial: "+91" },
  { name: "Brazil", code: "BR", tld: ".br", dial: "+55" },
  { name: "Russia", code: "RU", tld: ".ru", dial: "+7" },
  { name: "South Korea", code: "KR", tld: ".kr", dial: "+82" },
  { name: "Mexico", code: "MX", tld: ".mx", dial: "+52" },
  { name: "Italy", code: "IT", tld: ".it", dial: "+39" },
  { name: "Spain", code: "ES", tld: ".es", dial: "+34" },
  { name: "Netherlands", code: "NL", tld: ".nl", dial: "+31" },
  { name: "Switzerland", code: "CH", tld: ".ch", dial: "+41" },
  { name: "Sweden", code: "SE", tld: ".se", dial: "+46" },
  { name: "Singapore", code: "SG", tld: ".sg", dial: "+65" },
  { name: "UAE", code: "AE", tld: ".ae", dial: "+971" },
];

export default function CountryCodes() {
  const [search, setSearch] = useState('');
  const filtered = countries.filter((c) => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.dial.includes(search)
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Globe className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Country Code & Dialling Directory</h1>
          <p className="text-sm text-muted-foreground">ISO codes, TLDs, and phone prefixes</p>
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search countries..." className="w-full rounded-md border pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
      </div>

      <div className="rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted"><tr><th className="px-3 py-2 text-left">Country</th><th className="px-3 py-2">ISO</th><th className="px-3 py-2">TLD</th><th className="px-3 py-2">Dial</th></tr></thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.code} className="border-t"><td className="px-3 py-2 font-medium">{c.name}</td><td className="px-3 py-2 text-center font-mono text-xs">{c.code}</td><td className="px-3 py-2 text-center font-mono text-xs">{c.tld}</td><td className="px-3 py-2 text-center font-mono text-xs">{c.dial}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
