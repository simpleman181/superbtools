'use client';
"use client";

import { useState, useEffect, useRef } from "react";
import { Monitor } from "lucide-react";

export default function RefreshRate() {
  const [fps, setFps] = useState(0);
  const [running, setRunning] = useState(false);
  const frameCount = useRef(0);
  const startTime = useRef(0);
  const rafId = useRef<number>(0);

  const measure = () => {
    setRunning(true);
    frameCount.current = 0;
    startTime.current = performance.now();

    const loop = () => {
      frameCount.current++;
      const elapsed = performance.now() - startTime.current;
      if (elapsed >= 1000) {
        setFps(Math.round((frameCount.current / elapsed) * 1000));
        frameCount.current = 0;
        startTime.current = performance.now();
      }
      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);
  };

  const stop = () => {
    cancelAnimationFrame(rafId.current);
    setRunning(false);
    setFps(0);
  };

  useEffect(() => {
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Monitor className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Display Refresh Rate Detector</h1>
          <p className="text-sm text-muted-foreground">Measure your monitor's refresh rate using animation frames</p>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-8 text-center mb-6">
        <div className="text-6xl font-bold text-primary">{fps || '—'}</div>
        <div className="text-sm text-muted-foreground mt-2">Estimated Refresh Rate (Hz)</div>
      </div>

      <div className="flex gap-2 justify-center">
        <button onClick={measure} disabled={running} className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium disabled:opacity-50">
          {running ? 'Measuring...' : 'Start Measurement'}
        </button>
        <button onClick={stop} className="px-4 py-3 border rounded-lg hover:bg-accent">
          Stop
        </button>
      </div>

      <p className="text-sm text-muted-foreground mt-4 text-center">
        Common refresh rates: 60Hz, 120Hz, 144Hz, 240Hz
      </p>
    </div>
  );
}
