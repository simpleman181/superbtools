"use client";

import { useState, useMemo } from "react";
import { Regex, Copy, Check } from "lucide-react";

export default function RegexTester() {
  const [pattern, setPattern] = useState('[A-Za-z]+');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('Hello World 123');
  const [error, setError] = useState('');

  const matches = useMemo(() => {
    setError('');
    if (!pattern || !text) return [];
    try {
      const regex = new RegExp(pattern, flags);
      const results: { text: string; index: number; groups?: string[] }[] = [];
      let match;
      if (flags.includes('g')) {
        while ((match = regex.exec(text)) !== null) {
          results.push({ text: match[0], index: match.index, groups: match.slice(1) });
          if (match.index === regex.lastIndex) regex.lastIndex++;
        }
      } else {
        match = regex.exec(text);
        if (match) {
          results.push({ text: match[0], index: match.index, groups: match.slice(1) });
        }
      }
      return results;
    } catch (e) {
      setError((e as Error).message);
      return [];
    }
  }, [pattern, flags, text]);

  const highlightedText = useMemo(() => {
    if (!pattern || !text || error) return text;
    try {
      const regex = new RegExp(`(${pattern})`, flags.includes('g') ? flags : flags + 'g');
      return text.replace(regex, '<<<MATCH>>>$1<<<END>>>').split('<<<MATCH>>>').map((part, i) => {
        if (i === 0) return part;
        const [match, ...rest] = part.split('<<<END>>>');
        return (
          <span key={i}>
            <mark className="bg-yellow-200 dark:bg-yellow-700 rounded px-0.5">{match}</mark>
            {rest.join('<<<END>>>')}
          </span>
        );
      });
    } catch {
      return text;
    }
  }, [pattern, flags, text, error]);

  const toggleFlag = (flag: string) => {
    setFlags((prev) => prev.includes(flag) ? prev.replace(flag, '') : prev + flag);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Regex className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Regex Tester</h1>
          <p className="text-sm text-muted-foreground">Test regular expressions with live highlighting</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">/</span>
            <input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
              className="w-full pl-6 pr-12 py-2 rounded-md border bg-background font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">/{flags}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {['g', 'i', 'm', 's', 'u'].map((f) => (
            <button
              key={f}
              onClick={() => toggleFlag(f)}
              className={`px-3 py-1 rounded-md text-xs font-mono font-medium ${flags.includes(f) ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Test Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to test against..."
            className="w-full h-[250px] rounded-md border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Live Highlight</label>
          <div className="w-full h-[250px] rounded-md border bg-card px-3 py-2 text-sm font-mono overflow-auto whitespace-pre-wrap">
            {highlightedText}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">Matches ({matches.length})</h3>
        <div className="space-y-1 max-h-48 overflow-auto">
          {matches.map((m, i) => (
            <div key={i} className="flex items-center gap-3 rounded-md border bg-card px-3 py-2 text-sm">
              <span className="text-xs text-muted-foreground w-6">{i + 1}</span>
              <code className="font-mono text-primary">{m.text}</code>
              <span className="text-xs text-muted-foreground">at index {m.index}</span>
              {m.groups && m.groups.some(Boolean) && (
                <span className="text-xs text-muted-foreground">groups: {m.groups.filter(Boolean).join(', ')}</span>
              )}
            </div>
          ))}
          {matches.length === 0 && !error && (
            <div className="text-sm text-muted-foreground py-4 text-center">No matches found</div>
          )}
        </div>
      </div>
    </div>
  );
}
