'use client';

import { useState, useRef, useEffect } from "react";
import { Barcode, Download, AlertCircle } from "lucide-react";

// Full Code128 barcode encoder (industry-standard 1D barcode)
const CODE128_CHARS: Record<string, number> = {};
const CODE128_PATTERNS: string[] = [
  "11011001100","11001101100","11001100110","10010011000","10010001100",
  "10001001100","10011001000","10011000100","10001100100","11001001000",
  "11001000100","11000100100","10110011100","10011011100","10011001110",
  "10111001100","10011101100","10011100110","11001110010","11001011100",
  "11001001110","11011100100","11001110100","11101101110","11101001100",
  "11100101100","11100100110","11101100100","11100110100","11100110010",
  "11011011000","11011000110","11000110110","10100011000","10001011000",
  "10001000110","10110001000","10001101000","10001100010","11010001000",
  "11000101000","11000100010","10110111000","10110001110","10001101110",
  "10111011000","10111000110","10001110110","11101110110","11010001110",
  "11000101110","11011101000","11011100010","11011101110","11101011000",
  "11101000110","11100010110","11101101000","11101100010","11100011010",
  "11101111010","11001000010","11110001010","10100110000","10100001100",
  "10010110000","10010000110","10000101100","10000100110","10110010000",
  "10110000100","10011010000","10011000010","10000110100","10000110010",
  "11000010010","11001010000","11110111010","11000010100","10001111010",
  "10100111100","10010111100","10010011110","10111100100","10011110100",
  "10011110010","11110100100","11110010100","11110010010","11011011110",
  "11011110110","11110110110","10101111000","10100011110","10001011110",
  "10111101000","10111100010","11110101000","11110100010","10111011110",
  "10111101110","11101011110","11110101110","11010000100","11010010000",
  "11010011100","1100011101011",
];

function encodeCode128(text: string): string {
  let value = 104; // Start B
  let checksum = 104;
  let bars = CODE128_PATTERNS[104];
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i) - 32;
    checksum += code * (i + 1);
    bars += CODE128_PATTERNS[code];
    value = code;
  }
  bars += CODE128_PATTERNS[checksum % 103];
  bars += CODE128_PATTERNS[106]; // Stop
  return bars;
}

function encodeEAN13(digits: string): string | null {
  const d = digits.replace(/\D/g, '').padStart(12, '0').slice(0, 12);
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += parseInt(d[i]) * (i % 2 === 0 ? 1 : 3);
  const check = (10 - (sum % 10)) % 10;
  const full = d + check;

  const L = ["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"];
  const G = ["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"];
  const R = ["1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100"];
  const PARITIES = ["LLLLLL","LLGLGG","LLGGLG","LLGGGL","LGLLGG","LGGLLG","LGGGLL","LGLGLG","LGLGGL","LGGLGL"];
  const parity = PARITIES[parseInt(full[0])];

  let bars = "101"; // Start
  for (let i = 0; i < 6; i++) {
    const enc = parity[i] === 'L' ? L : G;
    bars += enc[parseInt(full[i + 1])];
  }
  bars += "01010"; // Middle
  for (let i = 7; i < 13; i++) bars += R[parseInt(full[i])];
  bars += "101"; // End
  return bars;
}

type BarcodeType = 'Code128' | 'EAN-13' | 'UPC-A';

export default function BarcodeGenerator() {
  const [text, setText] = useState('Hello MyToolMate');
  const [type, setType] = useState<BarcodeType>('Code128');
  const [showText, setShowText] = useState(true);
  const [barColor, setBarColor] = useState('#000000');
  const [error, setError] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !text.trim()) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    setError('');

    let bars = '';
    try {
      if (type === 'Code128') {
        bars = encodeCode128(text);
      } else {
        const encoded = encodeEAN13(text);
        if (!encoded) throw new Error('Invalid EAN-13 input');
        bars = encoded;
      }
    } catch (e: any) {
      setError(e.message);
      return;
    }

    const UNIT = 2;
    const HEIGHT = 80;
    const PAD = 20;
    const width = bars.length * UNIT + PAD * 2;
    const totalHeight = HEIGHT + (showText ? 30 : 0) + 20;
    canvas.width = width;
    canvas.height = totalHeight;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, totalHeight);
    ctx.fillStyle = barColor;

    for (let i = 0; i < bars.length; i++) {
      if (bars[i] === '1') ctx.fillRect(PAD + i * UNIT, 10, UNIT, HEIGHT);
    }

    if (showText) {
      ctx.fillStyle = '#000000';
      ctx.font = `${13}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(type === 'Code128' ? text : text.slice(0, 13).padStart(13, '0'), width / 2, HEIGHT + 28);
    }
  }, [text, type, showText, barColor]);

  const download = () => {
    if (!canvasRef.current) return;
    const a = document.createElement('a');
    a.href = canvasRef.current.toDataURL('image/png');
    a.download = `barcode-${type}.png`;
    a.click();
  };

  const placeholders: Record<BarcodeType, string> = {
    'Code128': 'Any text or numbers',
    'EAN-13': '12 digits (check digit auto-calculated)',
    'UPC-A': '11 digits (check digit auto-calculated)',
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Barcode className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Barcode Generator</h1>
          <p className="text-sm text-muted-foreground">Generate real Code128 and EAN-13 barcodes</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex gap-2">
          {(['Code128', 'EAN-13', 'UPC-A'] as BarcodeType[]).map(t => (
            <button key={t} onClick={() => { setType(t); setText(t === 'Code128' ? 'Hello MyToolMate' : '590123412345'); }}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${type === t ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>{t}</button>
          ))}
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Content</label>
          <input value={text} onChange={(e) => setText(e.target.value)}
            placeholder={placeholders[type]}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        {error && (
          <div className="flex items-center gap-2 text-destructive text-sm">
            <AlertCircle className="h-4 w-4" />{error}
          </div>
        )}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Bar Color</label>
            <input type="color" value={barColor} onChange={(e) => setBarColor(e.target.value)}
              className="h-8 w-16 rounded border cursor-pointer" />
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={showText} onChange={(e) => setShowText(e.target.checked)} className="rounded" />
            Show text below
          </label>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="border rounded-lg p-4 bg-white shadow-sm overflow-x-auto max-w-full">
          <canvas ref={canvasRef} />
        </div>
        <button onClick={download}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
          <Download className="h-4 w-4" /> Download PNG
        </button>
      </div>
    </div>
  );
}
