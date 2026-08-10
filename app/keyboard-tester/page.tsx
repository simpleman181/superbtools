'use client';
"use client";

import { useState, useEffect } from "react";
import { Keyboard } from "lucide-react";

const rows = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Fn', 'Ctrl'],
];

export default function KeyboardTester() {
  const [pressed, setPressed] = useState<Set<string>>(new Set());
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      e.preventDefault();
      setPressed((prev) => new Set([...prev, e.key]));
      setHistory((prev) => [e.key, ...prev].slice(0, 20));
    };
    const up = (e: KeyboardEvent) => {
      setPressed((prev) => {
        const next = new Set(prev);
        next.delete(e.key);
        return next;
      });
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Keyboard className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Keyboard Rollover Tester</h1>
          <p className="text-sm text-muted-foreground">Test which keys register simultaneously</p>
        </div>
      </div>

      <div className="space-y-1 mb-6">
        {rows.map((row, ri) => (
          <div key={ri} className="flex gap-1 justify-center">
            {row.map((key) => {
              const isPressed = pressed.has(key) || pressed.has(key.toLowerCase());
              const width = key === 'Space' ? 'w-64' : key === 'Backspace' || key === 'Tab' || key === 'Caps' || key === 'Enter' || key === 'Shift' ? 'w-20' : 'w-10';
              return (
                <div
                  key={key}
                  className={`h-10 rounded border flex items-center justify-center text-xs font-medium transition-colors ${width} ${isPressed ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-muted'}`}
                >
                  {key}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-sm font-semibold mb-2">Key History</h3>
        <div className="flex flex-wrap gap-1">
          {history.map((k, i) => (
            <span key={i} className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-mono">{k}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
