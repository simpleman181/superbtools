"use client";

import { useState } from "react";
import { Monitor, Maximize2 } from "lucide-react";

const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffffff', '#000000', '#ffff00', '#00ffff', '#ff00ff'];

export default function DeadPixel() {
  const [active, setActive] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);

  if (active) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
        style={{ backgroundColor: colors[colorIndex] }}
        onClick={() => {
          setColorIndex((prev) => (prev + 1) % colors.length);
        }}
      >
        <div className="absolute top-4 left-4 text-white/50 text-sm font-medium">
          Click to change color • Press ESC to exit
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Monitor className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Screen Dead Pixel Tester</h1>
          <p className="text-sm text-muted-foreground">Fill screen with solid colors to detect stuck pixels</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {colors.map((c, i) => (
          <button
            key={c}
            onClick={() => { setColorIndex(i); setActive(true); }}
            className="h-20 rounded-lg border-2 border-transparent hover:border-primary transition-colors"
            style={{ backgroundColor: c }}
          />
        ))}
      </div>

      <button
        onClick={() => setActive(true)}
        className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
      >
        <Maximize2 className="h-5 w-5" />
        Start Full Screen Test
      </button>

      <p className="text-sm text-muted-foreground mt-4">Click anywhere on the fullscreen color to cycle through colors. Click rapidly or press ESC to exit.</p>
    </div>
  );
}
