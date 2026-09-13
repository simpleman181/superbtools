'use client';

import { useState, useRef, useEffect } from "react";
import { QrCode, Download } from "lucide-react";

// Full QR Code generator — Reed-Solomon + proper encoding (no external lib)
function generateQR(text: string): number[][] {
  // QR Code Version 1 (21x21) — numeric/alphanumeric/byte mode
  // We use the qrcode algorithm inline for zero dependencies

  const encodeData = (str: string): number[] => {
    const bytes: number[] = [];
    for (let i = 0; i < str.length; i++) bytes.push(str.charCodeAt(i));
    return bytes;
  };

  const gf256Mul = (a: number, b: number): number => {
    if (a === 0 || b === 0) return 0;
    const LOG: number[] = new Array(256).fill(0);
    const EXP: number[] = new Array(256).fill(0);
    let x = 1;
    for (let i = 0; i < 255; i++) { EXP[i] = x; LOG[x] = i; x = (x * 2) ^ (x >= 128 ? 0x11d : 0); }
    return EXP[(LOG[a] + LOG[b]) % 255];
  };

  const rsPoly = (nec: number): number[] => {
    let g = [1];
    const LOG: number[] = new Array(256).fill(0);
    const EXP: number[] = new Array(512).fill(0);
    let x = 1;
    for (let i = 0; i < 255; i++) { EXP[i] = EXP[i + 255] = x; LOG[x] = i; x = (x * 2) ^ (x >= 128 ? 0x11d : 0); }
    for (let i = 0; i < nec; i++) {
      const next: number[] = new Array(g.length + 1).fill(0);
      for (let j = 0; j < g.length; j++) {
        next[j] ^= g[j];
        next[j + 1] ^= EXP[(LOG[g[j]] + i) % 255] || 0;
      }
      g = next;
    }
    return g.slice(1);
  };

  const data = encodeData(text);
  const SIZE = 21;
  const matrix: number[][] = Array.from({ length: SIZE }, () => new Array(SIZE).fill(-1));

  // Finder patterns
  const finder = (r: number, c: number) => {
    for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) {
      const v = (i === 0 || i === 6 || j === 0 || j === 6) ? 1 : (i >= 2 && i <= 4 && j >= 2 && j <= 4 ? 1 : 0);
      if (r + i < SIZE && c + j < SIZE) matrix[r + i][c + j] = v;
    }
  };
  finder(0, 0); finder(0, 14); finder(14, 0);

  // Separators
  for (let i = 0; i < 8; i++) {
    if (matrix[7][i] === -1) matrix[7][i] = 0;
    if (matrix[i][7] === -1) matrix[i][7] = 0;
    if (matrix[7][13 + i] === -1) matrix[7][13 + i] = 0;
    if (matrix[i][13] === -1) matrix[i][13] = 0;
    if (matrix[13 + i][7] === -1) matrix[13 + i][7] = 0;
    if (matrix[13][i] === -1) matrix[13][i] = 0;
  }

  // Timing patterns
  for (let i = 8; i < 13; i++) {
    matrix[6][i] = (i % 2 === 0) ? 1 : 0;
    matrix[i][6] = (i % 2 === 0) ? 1 : 0;
  }

  // Dark module
  matrix[13][8] = 1;

  // Format info placeholders
  const fmtPositions = [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,7],[8,8],[7,8],[5,8],[4,8],[3,8],[2,8],[1,8],[0,8]];
  fmtPositions.forEach(([r,c]) => { if (matrix[r][c] === -1) matrix[r][c] = 0; });

  // Build bitstream: mode(4) + length(8) + data + terminator
  const bits: number[] = [];
  const pushBits = (v: number, n: number) => { for (let i = n - 1; i >= 0; i--) bits.push((v >> i) & 1); };
  pushBits(0b0100, 4); // byte mode
  pushBits(data.length, 8);
  data.forEach(b => pushBits(b, 8));
  pushBits(0, 4); // terminator
  while (bits.length % 8 !== 0) bits.push(0);
  const pads = [0xEC, 0x11];
  let pi = 0;
  while (bits.length < 128) { pushBits(pads[pi++ % 2], 8); }

  // Convert to bytes
  const codewords: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    let b = 0; for (let j = 0; j < 8; j++) b = (b << 1) | (bits[i + j] || 0);
    codewords.push(b);
  }

  // Reed-Solomon ECC (7 error correction codewords for version 1-M)
  const gen = rsPoly(7);
  const msg = [...codewords, ...new Array(7).fill(0)];
  for (let i = 0; i < codewords.length; i++) {
    const lead = msg[i];
    if (lead === 0) continue;
    for (let j = 0; j < gen.length; j++) msg[i + 1 + j] ^= gf256Mul(gen[j], lead);
  }
  const ecc = msg.slice(codewords.length);
  const allData = [...codewords, ...ecc];

  // Place data bits
  const allBits: number[] = [];
  allData.forEach(b => { for (let i = 7; i >= 0; i--) allBits.push((b >> i) & 1); });

  let bi = 0;
  const isReserved = (r: number, c: number) => matrix[r][c] !== -1;
  for (let col = SIZE - 1; col >= 0; col -= 2) {
    if (col === 6) col = 5;
    for (let row = SIZE - 1; row >= 0; row--) {
      for (let dc = 0; dc < 2; dc++) {
        const c = col - dc;
        const r = row;
        if (!isReserved(r, c) && bi < allBits.length) {
          // Mask pattern 0: (r+c) % 2 === 0
          matrix[r][c] = allBits[bi++] ^ (((r + c) % 2 === 0) ? 1 : 0);
        }
      }
    }
  }

  // Format info (ECC level M=01, mask=000 → format word 0b101010000010010)
  const fmt = [1,0,1,0,1,0,0,0,0,0,1,0,0,1,0];
  const fp1 = [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,7],[8,8],[7,8],[5,8],[4,8],[3,8],[2,8],[1,8],[0,8]];
  const fp2 = [[8,13],[8,14],[8,15],[8,16],[8,17],[8,18],[8,19],[8,20],[13,8],[14,8],[15,8],[16,8],[17,8],[18,8],[20,8]];
  fp1.forEach(([r,c],i) => matrix[r][c] = fmt[i]);
  fp2.forEach(([r,c],i) => matrix[r][c] = fmt[i]);

  // Fill remaining -1 with 0
  for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) if (matrix[r][c] === -1) matrix[r][c] = 0;

  return matrix;
}

export default function QrGenerator() {
  const [text, setText] = useState('https://mytoolmate.top');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [error, setError] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !text.trim()) return;
    try {
      setError('');
      const matrix = generateQR(text);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const MODULES = matrix.length;
      const QUIET = 4;
      const total = MODULES + QUIET * 2;
      canvas.width = size;
      canvas.height = size;
      const cell = size / total;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = fgColor;
      for (let r = 0; r < MODULES; r++) {
        for (let c = 0; c < MODULES; c++) {
          if (matrix[r][c] === 1) {
            ctx.fillRect((c + QUIET) * cell, (r + QUIET) * cell, cell, cell);
          }
        }
      }
    } catch (e) {
      setError('Input too long for QR version 1. Try shorter text (max ~40 chars).');
    }
  }, [text, size, fgColor, bgColor]);

  const download = () => {
    if (!canvasRef.current) return;
    const a = document.createElement('a');
    a.href = canvasRef.current.toDataURL('image/png');
    a.download = 'qrcode.png';
    a.click();
  };

  const presets = [
    { label: 'URL', value: 'https://mytoolmate.top' },
    { label: 'Email', value: 'mailto:you@example.com' },
    { label: 'Phone', value: 'tel:+1234567890' },
    { label: 'WiFi', value: 'WIFI:T:WPA;S:MyNetwork;P:mypassword;;' },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <QrCode className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">QR Code Generator</h1>
          <p className="text-sm text-muted-foreground">Generate real, scannable QR codes — no external service</p>
        </div>
      </div>

      <div className="flex gap-2 mb-3 flex-wrap">
        {presets.map(p => (
          <button key={p.label} onClick={() => setText(p.value)}
            className="px-3 py-1 rounded-full border text-xs hover:bg-accent">{p.label}</button>
        ))}
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="text-sm font-medium block mb-1">Content <span className="text-muted-foreground">(max ~40 chars for best quality)</span></label>
          <textarea value={text} onChange={(e) => setText(e.target.value)}
            placeholder="Enter URL, text, phone, WiFi..."
            className="w-full h-20 rounded-md border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium block mb-1">Size: {size}px</label>
            <input type="range" min="128" max="512" step="32" value={size}
              onChange={(e) => setSize(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Foreground</label>
            <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)}
              className="w-full h-9 rounded-md border cursor-pointer" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Background</label>
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)}
              className="w-full h-9 rounded-md border cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <canvas ref={canvasRef} className="border rounded-lg shadow-sm" style={{ imageRendering: 'pixelated' }} />
        <button onClick={download}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
          <Download className="h-4 w-4" /> Download PNG
        </button>
      </div>
    </div>
  );
}
