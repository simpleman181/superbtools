"use client";

import { useState, useRef, useEffect } from "react";
import { Clock, Play, Pause, RotateCcw, Flag } from "lucide-react";

export default function Stopwatch() {
  const [tab, setTab] = useState<'stopwatch' | 'countdown'>('stopwatch');
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [countdownTime, setCountdownTime] = useState(60);
  const [countdownLeft, setCountdownLeft] = useState(60);
  const [countdownRunning, setCountdownRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running) {
      const start = Date.now() - time;
      intervalRef.current = setInterval(() => setTime(Date.now() - start), 10);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  useEffect(() => {
    if (countdownRunning && countdownLeft > 0) {
      intervalRef.current = setInterval(() => {
        setCountdownLeft((prev) => {
          if (prev <= 1) { setCountdownRunning(false); return 0; }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [countdownRunning]);

  const formatTime = (ms: number) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  const formatCountdown = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Stopwatch & Countdown</h1>
          <p className="text-sm text-muted-foreground">Browser-based timer with lap tracking</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab('stopwatch')} className={`px-4 py-2 rounded-md text-sm font-medium ${tab === 'stopwatch' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>Stopwatch</button>
        <button onClick={() => setTab('countdown')} className={`px-4 py-2 rounded-md text-sm font-medium ${tab === 'countdown' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>Countdown</button>
      </div>

      {tab === 'stopwatch' ? (
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-8 text-center">
            <div className="text-5xl font-mono font-bold tracking-wider">{formatTime(time)}</div>
          </div>
          <div className="flex justify-center gap-2">
            <button onClick={() => setRunning(!running)} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium">
              {running ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              {running ? 'Pause' : 'Start'}
            </button>
            <button onClick={() => setLaps([...laps, time])} className="flex items-center gap-2 px-4 py-3 border rounded-lg hover:bg-accent">
              <Flag className="h-5 w-5" /> Lap
            </button>
            <button onClick={() => { setRunning(false); setTime(0); setLaps([]); }} className="flex items-center gap-2 px-4 py-3 border rounded-lg hover:bg-accent">
              <RotateCcw className="h-5 w-5" /> Reset
            </button>
          </div>
          {laps.length > 0 && (
            <div className="rounded-lg border bg-card p-4 max-h-48 overflow-auto">
              <h3 className="text-sm font-semibold mb-2">Laps</h3>
              <div className="space-y-1">
                {laps.map((lap, i) => (
                  <div key={i} className="flex justify-between text-sm px-3 py-1.5 rounded bg-muted">
                    <span>Lap {i + 1}</span>
                    <span className="font-mono">{formatTime(lap)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-8 text-center">
            <div className="text-5xl font-mono font-bold tracking-wider">{formatCountdown(countdownLeft)}</div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <label className="text-sm font-medium">Seconds:</label>
            <input type="number" value={countdownTime} onChange={(e) => { setCountdownTime(Number(e.target.value)); setCountdownLeft(Number(e.target.value)); }} className="w-24 rounded-md border px-3 py-2 text-sm" />
          </div>
          <div className="flex justify-center gap-2">
            <button onClick={() => setCountdownRunning(!countdownRunning)} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium">
              {countdownRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              {countdownRunning ? 'Pause' : 'Start'}
            </button>
            <button onClick={() => { setCountdownRunning(false); setCountdownLeft(countdownTime); }} className="flex items-center gap-2 px-4 py-3 border rounded-lg hover:bg-accent">
              <RotateCcw className="h-5 w-5" /> Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
