"use client";

import { useState } from "react";
import { Shuffle, Trophy, RotateCcw } from "lucide-react";

export default function RandomPicker() {
  const [items, setItems] = useState('');
  const [winner, setWinner] = useState('');
  const [shuffled, setShuffled] = useState<string[]>([]);

  const list = items.split('\n').filter((s) => s.trim());

  const pickWinner = () => {
    if (list.length === 0) return;
    setWinner(list[Math.floor(Math.random() * list.length)]);
  };

  const shuffle = () => {
    const arr = [...list];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setShuffled(arr);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Shuffle className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Random List Picker</h1>
          <p className="text-sm text-muted-foreground">Pick a winner or shuffle a list</p>
        </div>
      </div>

      <textarea
        value={items}
        onChange={(e) => setItems(e.target.value)}
        placeholder="Enter items, one per line..."
        className="w-full h-48 rounded-md border bg-background px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring mb-4"
      />

      <div className="flex gap-2 mb-6">
        <button onClick={pickWinner} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
          <Trophy className="h-4 w-4" />
          Pick Winner
        </button>
        <button onClick={shuffle} className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/80">
          <RotateCcw className="h-4 w-4" />
          Shuffle List
        </button>
        <button onClick={() => { setItems(''); setWinner(''); setShuffled([]); }} className="px-4 py-2 border rounded-md text-sm hover:bg-accent">Clear</button>
      </div>

      {winner && (
        <div className="rounded-lg border bg-primary/5 p-6 text-center mb-4">
          <div className="text-sm text-muted-foreground mb-2">Winner</div>
          <div className="text-2xl font-bold text-primary">{winner}</div>
        </div>
      )}

      {shuffled.length > 0 && (
        <div className="rounded-lg border bg-card p-4">
          <h3 className="text-sm font-semibold mb-2">Shuffled Order</h3>
          <ol className="space-y-1">
            {shuffled.map((item, i) => (
              <li key={i} className="text-sm px-3 py-1.5 rounded bg-muted">{i + 1}. {item}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
