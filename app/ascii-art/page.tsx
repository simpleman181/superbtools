'use client';
"use client";

import { useState } from "react";
import { Type, Copy, Check } from "lucide-react";

const blockLetters: Record<string, string[]> = {
  'A': [' ███ ', '█   █', '█████', '█   █', '█   █'],
  'B': ['████ ', '█   █', '████ ', '█   █', '████ '],
  'C': [' ████', '█    ', '█    ', '█    ', ' ████'],
  'D': ['████ ', '█   █', '█   █', '█   █', '████ '],
  'E': ['█████', '█    ', '████ ', '█    ', '█████'],
  'F': ['█████', '█    ', '████ ', '█    ', '█    '],
  'G': [' ████', '█    ', '█  ██', '█   █', ' ████'],
  'H': ['█   █', '█   █', '█████', '█   █', '█   █'],
  'I': ['█████', '  █  ', '  █  ', '  █  ', '█████'],
  'J': ['█████', '   █ ', '   █ ', '█  █ ', ' ██  '],
  'K': ['█   █', '█  █ ', '███  ', '█  █ ', '█   █'],
  'L': ['█    ', '█    ', '█    ', '█    ', '█████'],
  'M': ['█   █', '██ ██', '█ █ █', '█   █', '█   █'],
  'N': ['█   █', '██  █', '█ █ █', '█  ██', '█   █'],
  'O': [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
  'P': ['████ ', '█   █', '████ ', '█    ', '█    '],
  'Q': [' ███ ', '█   █', '█   █', '█  ██', ' ████'],
  'R': ['████ ', '█   █', '████ ', '█  █ ', '█   █'],
  'S': [' ████', '█    ', ' ███ ', '    █', '████ '],
  'T': ['█████', '  █  ', '  █  ', '  █  ', '  █  '],
  'U': ['█   █', '█   █', '█   █', '█   █', ' ███ '],
  'V': ['█   █', '█   █', '█   █', ' █ █ ', '  █  '],
  'W': ['█   █', '█   █', '█ █ █', '██ ██', '█   █'],
  'X': ['█   █', ' █ █ ', '  █  ', ' █ █ ', '█   █'],
  'Y': ['█   █', ' █ █ ', '  █  ', '  █  ', '  █  '],
  'Z': ['█████', '   █ ', '  █  ', ' █   ', '█████'],
  ' ': ['     ', '     ', '     ', '     ', '     '],
};

export default function AsciiArt() {
  const [text, setText] = useState('HELLO');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const lines = ['', '', '', '', ''];
    for (const char of text.toUpperCase()) {
      const letter = blockLetters[char] || blockLetters[' '];
      for (let i = 0; i < 5; i++) {
        lines[i] += letter[i] + '  ';
      }
    }
    return lines.join('\n');
  };

  const art = generate();

  const copy = () => {
    navigator.clipboard.writeText(art);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Type className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">ASCII Text Art Generator</h1>
          <p className="text-sm text-muted-foreground">Convert text to block characters</p>
        </div>
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
        className="w-full rounded-md border px-3 py-2 text-sm font-mono mb-4"
        maxLength={20}
      />

      <div className="rounded-lg border bg-card p-6 mb-4">
        <pre className="font-mono text-sm leading-tight overflow-auto">{art}</pre>
      </div>

      <button onClick={copy} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied!" : "Copy ASCII"}
      </button>
    </div>
  );
}
