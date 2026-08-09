"use client";

import { useState } from "react";
import { Search, Globe } from "lucide-react";

const statuses: Record<number, { message: string; desc: string; category: string }> = {
  100: { message: "Continue", desc: "The server has received the request headers.", category: "Informational" },
  200: { message: "OK", desc: "The request has succeeded.", category: "Success" },
  201: { message: "Created", desc: "The request has succeeded and a new resource has been created.", category: "Success" },
  204: { message: "No Content", desc: "The server successfully processed the request but is not returning any content.", category: "Success" },
  301: { message: "Moved Permanently", desc: "The requested resource has been permanently moved.", category: "Redirect" },
  302: { message: "Found", desc: "The requested resource temporarily resides under a different URI.", category: "Redirect" },
  304: { message: "Not Modified", desc: "The resource has not been modified since the version specified by the request headers.", category: "Redirect" },
  400: { message: "Bad Request", desc: "The server cannot process the request due to client error.", category: "Client Error" },
  401: { message: "Unauthorized", desc: "Authentication is required and has failed or has not been provided.", category: "Client Error" },
  403: { message: "Forbidden", desc: "The server understood the request but refuses to authorize it.", category: "Client Error" },
  404: { message: "Not Found", desc: "The requested resource could not be found.", category: "Client Error" },
  405: { message: "Method Not Allowed", desc: "The request method is not supported for the resource.", category: "Client Error" },
  409: { message: "Conflict", desc: "The request could not be completed due to a conflict with the current state.", category: "Client Error" },
  422: { message: "Unprocessable Entity", desc: "The request was well-formed but contains semantic errors.", category: "Client Error" },
  429: { message: "Too Many Requests", desc: "The user has sent too many requests in a given amount of time.", category: "Client Error" },
  500: { message: "Internal Server Error", desc: "The server encountered an unexpected condition.", category: "Server Error" },
  502: { message: "Bad Gateway", desc: "The server received an invalid response from the upstream server.", category: "Server Error" },
  503: { message: "Service Unavailable", desc: "The server is currently unable to handle the request.", category: "Server Error" },
  504: { message: "Gateway Timeout", desc: "The server did not receive a timely response from the upstream server.", category: "Server Error" },
};

const catColors: Record<string, string> = {
  "Informational": "bg-blue-100 text-blue-700",
  "Success": "bg-green-100 text-green-700",
  "Redirect": "bg-yellow-100 text-yellow-700",
  "Client Error": "bg-orange-100 text-orange-700",
  "Server Error": "bg-red-100 text-red-700",
};

export default function HttpStatus() {
  const [search, setSearch] = useState('');
  const filtered = Object.entries(statuses).filter(([code, data]) => 
    code.includes(search) || data.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Globe className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">HTTP Status Code Lookup</h1>
          <p className="text-sm text-muted-foreground">Search and understand web status codes</p>
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search status codes or messages..." className="w-full rounded-md border pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
      </div>

      <div className="space-y-2">
        {filtered.map(([code, data]) => (
          <div key={code} className="flex items-start gap-4 rounded-lg border bg-card p-4">
            <div className={`px-3 py-1 rounded-md text-sm font-bold ${catColors[data.category] || 'bg-muted'}`}>{code}</div>
            <div className="flex-1">
              <div className="font-semibold">{data.message}</div>
              <div className="text-sm text-muted-foreground">{data.desc}</div>
            </div>
            <span className="text-xs px-2 py-1 rounded bg-muted">{data.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
