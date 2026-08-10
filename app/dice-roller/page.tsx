'use client';
"use client";

import { useState } from "react";
import { Dices, RotateCcw } from "lucide-react";

export default function DiceRoller() {
  const [diceCount, setDiceCount] = useState(1);
  const [sides, setSides] = useState(6);
  const [results, setResults] = useState<number[]>([]);
  const [total, setTotal] = useState(0);
  const [coin, setCoin] = useState<string | null>(null);

  const roll = () => {
    const res = Array.from({ length: diceCount }, () => Math.floor(Math.random() * sides) + 1);
    setResults(res);
    setTotal(res.reduce((a, b) => a + b, 0));
  };

  const flipCoin = () => {
    setCoin(Math.random() < 0.5 ? 'Heads' : 'Tails');
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Dices className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Dice Roller & Coin Flipper</h1>
          <p className="text-sm text-muted-foreground">Fair random number generator</p>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium block mb-1">Dice Count</label>
            <input type="number" min="1" max="20" value={diceCount} onChange={(e) => setDiceCount(Number(e.target.value))} className="w-full rounded-md border px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Sides per Die</label>
            <select value={sides} onChange={(e) => setSides(Number(e.target.value))} className="w-full rounded-md border px-3 py-2 text-sm">
              {[4, 6, 8, 10, 12, 20, 100].map((s) => <option key={s} value={s}>d{s}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={roll} className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium">Roll Dice</button>
          <button onClick={flipCoin} className="px-4 py-3 border rounded-lg hover:bg-accent font-medium">Flip Coin</button>
        </div>
      </div>

      {results.length > 0 && (
        <div className="rounded-lg border bg-card p-6 text-center mb-4">
          <div className="flex justify-center gap-3 mb-3">
            {results.map((r, i) => (
              <div key={i} className="w-14 h-14 rounded-lg border-2 border-primary flex items-center justify-center text-2xl font-bold">{r}</div>
            ))}
          </div>
          <div className="text-lg font-medium">Total: <span className="text-primary font-bold text-2xl">{total}</span></div>
        </div>
      )}

      {coin && (
        <div className="rounded-lg border bg-card p-6 text-center">
          <div className="text-4xl font-bold text-primary">{coin}</div>
        </div>
      )}
    </div>
  );
}
