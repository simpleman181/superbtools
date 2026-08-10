'use client';
"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, Play, Square } from "lucide-react";

export default function AudioTester() {
  const [freq, setFreq] = useState(1000);
  const [playing, setPlaying] = useState(false);
  const oscRef = useRef<OscillatorNode | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);

  const play = () => {
    if (!ctxRef.current) ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = ctxRef.current;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;
    osc.connect(ctx.destination);
    osc.start();
    oscRef.current = osc;
    setPlaying(true);
  };

  const stop = () => {
    if (oscRef.current) {
      oscRef.current.stop();
      oscRef.current = null;
    }
    setPlaying(false);
  };

  useEffect(() => {
    if (playing && oscRef.current) {
      oscRef.current.frequency.value = freq;
    }
  }, [freq]);

  const presets = [
    { label: '20 Hz (Low)', value: 20 },
    { label: '100 Hz', value: 100 },
    { label: '1 kHz', value: 1000 },
    { label: '5 kHz', value: 5000 },
    { label: '10 kHz', value: 10000 },
    { label: '15 kHz (High)', value: 15000 },
    { label: '20 kHz (Limit)', value: 20000 },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Volume2 className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Audio Frequency & Speaker Tester</h1>
          <p className="text-sm text-muted-foreground">Generate pure sine waves to test speakers and hearing</p>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 space-y-6 mb-6">
        <div>
          <label className="text-sm font-medium block mb-1">Frequency: {freq} Hz</label>
          <input type="range" min="20" max="20000" value={freq} onChange={(e) => setFreq(Number(e.target.value))} className="w-full" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>20 Hz</span>
            <span>10 kHz</span>
            <span>20 kHz</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={play} disabled={playing} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium disabled:opacity-50">
            <Play className="h-5 w-5" /> Play
          </button>
          <button onClick={stop} className="flex items-center gap-2 px-4 py-3 border rounded-lg hover:bg-accent">
            <Square className="h-5 w-5" /> Stop
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <button key={p.value} onClick={() => setFreq(p.value)} className={`px-3 py-1.5 rounded-md text-xs ${freq === p.value ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
