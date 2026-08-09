"use client";

import { useState } from "react";
import { Radio, Copy, Check } from "lucide-react";

const morseMap: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
  '9': '----.', '0': '-----', ' ': '/', '.': '.-.-.-', ',': '--..--',
  '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.',
};

const reverseMap = Object.fromEntries(Object.entries(morseMap).map(([k, v]) => [v, k]));

export default function MorseCode() {
  const [input, setInput] = useState('HELLO WORLD');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  const process = () => {
    if (mode === 'encode') {
      return input.toUpperCase().split('').map((c) => morseMap[c] || c).join(' ');
    } else {
      return input.split(' ').map((c) => reverseMap[c] || c).join('');
    }
  };

  const output = process();

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const play = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const morse = process();
    let time = audioCtx.currentTime;

    for (const char of morse) {
      if (char === '.') {
        const osc = audioCtx.createOscillator();
        osc.frequency.value = 700;
        osc.connect(audioCtx.destination);
        osc.start(time);
        osc.stop(time + 0.1);
        time += 0.15;
      } else if (char === '-') {
        const osc = audioCtx.createOscillator();
        osc.frequency.value = 700;
        osc.connect(audioCtx.destination);
        osc.start(time);
        osc.stop(time + 0.3);
        time += 0.35;
      } else {
        time += 0.2;
      }
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Radio className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Morse Code Translator</h1>
          <p className="text-sm text-muted-foreground">Convert text to Morse code with audio playback</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setMode('encode')} className={`px-4 py-2 rounded-md text-sm font-medium ${mode === 'encode' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>Text → Morse</button>
        <button onClick={() => setMode('decode')} className={`px-4 py-2 rounded-md text-sm font-medium ${mode === 'decode' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>Morse → Text</button>
      </div>

      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === 'encode' ? 'Enter text...' : 'Enter Morse code (use spaces between letters)...'} className="w-full h-32 rounded-md border bg-background px-4 py-3 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring mb-4" />

      <div className="rounded-lg border bg-card p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">Result</span>
          <div className="flex gap-2">
            <button onClick={play} className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded">Play Audio</button>
            <button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">{copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}{copied ? "Copied!" : "Copy"}</button>
          </div>
        </div>
        <div className="font-mono text-lg tracking-widest">{output || <span className="text-muted-foreground/50">—</span>}</div>
      </div>
    </div>
  );
}
