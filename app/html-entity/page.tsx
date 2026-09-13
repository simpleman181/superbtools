'use client';

import { useState, useMemo } from "react";
import { Code, Copy, Check, RefreshCw } from "lucide-react";

// ─── Entity tables ────────────────────────────────────────────────────────────

// ENCODE-ONLY: characters that MUST always be escaped for valid HTML
// Critically: regular space (U+0020) is NOT in this list — it must never become &nbsp;
// Newlines are NOT converted to <br/> — that's a HTML transformation, not encoding
const MUST_ESCAPE: Record<string, string> = {
  '&': '&amp;',   // Must be first so we don't double-encode
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
};

// OPTIONAL named entities — special/typographic characters the user intentionally typed
// Forward slash and backslash deliberately excluded — they are safe unescaped in HTML
const NAMED_ENTITIES: Record<string, string> = {
  // Quotes & punctuation
  "'":  '&#x27;',
  '\u00A0': '&nbsp;',   // Non-breaking space (U+00A0) — the REAL nbsp character
  '©':  '&copy;',
  '®':  '&reg;',
  '™':  '&trade;',
  // Currency
  '€':  '&euro;',
  '£':  '&pound;',
  '¥':  '&yen;',
  '¢':  '&cent;',
  // Typography
  '§':  '&sect;',
  '¶':  '&para;',
  '•':  '&bull;',
  '…':  '&hellip;',
  '–':  '&ndash;',
  '—':  '&mdash;',
  '\u2018': '&lsquo;',
  '\u2019': '&rsquo;',
  '\u201C': '&ldquo;',
  '\u201D': '&rdquo;',
  '«':  '&laquo;',
  '»':  '&raquo;',
  // Math
  '°':  '&deg;',
  '±':  '&plusmn;',
  '×':  '&times;',
  '÷':  '&divide;',
  '¼':  '&frac14;',
  '½':  '&frac12;',
  '¾':  '&frac34;',
  '¹':  '&sup1;',
  '²':  '&sup2;',
  '³':  '&sup3;',
  '∞':  '&infin;',
  '≠':  '&ne;',
  '≤':  '&le;',
  '≥':  '&ge;',
  '∑':  '&sum;',
  '∏':  '&prod;',
  '√':  '&radic;',
  // Greek letters
  'α':  '&alpha;',
  'β':  '&beta;',
  'γ':  '&gamma;',
  'δ':  '&delta;',
  'π':  '&pi;',
  'σ':  '&sigma;',
  'Ω':  '&Omega;',
  'μ':  '&mu;',
  // Arrows
  '←':  '&larr;',
  '↑':  '&uarr;',
  '→':  '&rarr;',
  '↓':  '&darr;',
  '↔':  '&harr;',
  '⇐':  '&lArr;',
  '⇒':  '&rArr;',
  '⇔':  '&hArr;',
  // Misc
  '♠':  '&spades;',
  '♣':  '&clubs;',
  '♥':  '&hearts;',
  '♦':  '&diams;',
};

// Decode map: all entity → char (must_escape + named)
const DECODE_MAP: Record<string, string> = {};
Object.entries(MUST_ESCAPE).forEach(([c, e]) => (DECODE_MAP[e] = c));
Object.entries(NAMED_ENTITIES).forEach(([c, e]) => (DECODE_MAP[e] = c));

// ─── Encode ───────────────────────────────────────────────────────────────────
type EncodeMode = 'minimal' | 'named' | 'decimal' | 'hex';

function encodeEntities(text: string, mode: EncodeMode, encodeNewlines: boolean): string {
  const result: string[] = [];

  for (const char of text) {
    const code = char.codePointAt(0)!;

    // Newline handling
    if (char === '\n') {
      if (encodeNewlines) result.push('<br>\n');
      else result.push('\n');
      continue;
    }
    if (char === '\r') continue; // strip CR, keep LF

    // Regular ASCII space — NEVER encode as &nbsp; (that's U+00A0, not U+0020)
    if (char === ' ') {
      result.push(' ');
      continue;
    }

    // Must-escape chars (&, <, >, ") — always encode these
    if (MUST_ESCAPE[char]) {
      result.push(MUST_ESCAPE[char]);
      continue;
    }

    // Minimal mode: only the 4 must-escape chars, everything else as-is
    if (mode === 'minimal') {
      result.push(char);
      continue;
    }

    // Named mode: use named entity if available, else keep as-is if safe
    if (mode === 'named') {
      if (NAMED_ENTITIES[char]) {
        result.push(NAMED_ENTITIES[char]);
      } else if (code > 127) {
        // Non-ASCII without a named entity → decimal numeric
        result.push(`&#${code};`);
      } else {
        result.push(char);
      }
      continue;
    }

    // Decimal numeric: encode all non-ASCII + must-escape
    if (mode === 'decimal') {
      if (code > 127) {
        result.push(`&#${code};`);
      } else {
        result.push(char);
      }
      continue;
    }

    // Hex numeric: encode all non-ASCII + must-escape
    if (mode === 'hex') {
      if (code > 127) {
        result.push(`&#x${code.toString(16).toUpperCase()};`);
      } else {
        result.push(char);
      }
      continue;
    }
  }

  return result.join('');
}

// ─── Decode ───────────────────────────────────────────────────────────────────
function decodeEntities(text: string): string {
  return text
    // Named entities
    .replace(/&[a-zA-Z]+;/g, (match) => DECODE_MAP[match] ?? match)
    // Decimal numeric entities &#123;
    .replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(parseInt(num, 10)))
    // Hex numeric entities &#x1F;
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)));
}

// ─── Reference table entries ──────────────────────────────────────────────────
const REFERENCE_ENTRIES = [
  { char: '&',  entity: '&amp;',    desc: 'Ampersand' },
  { char: '<',  entity: '&lt;',     desc: 'Less than' },
  { char: '>',  entity: '&gt;',     desc: 'Greater than' },
  { char: '"',  entity: '&quot;',   desc: 'Double quote' },
  { char: "'",  entity: '&#x27;',   desc: 'Single quote' },
  { char: '\u00A0', entity: '&nbsp;', desc: 'Non-breaking space (U+00A0)' },
  { char: '©',  entity: '&copy;',   desc: 'Copyright' },
  { char: '®',  entity: '&reg;',    desc: 'Registered' },
  { char: '™',  entity: '&trade;',  desc: 'Trademark' },
  { char: '€',  entity: '&euro;',   desc: 'Euro sign' },
  { char: '£',  entity: '&pound;',  desc: 'Pound sign' },
  { char: '¥',  entity: '&yen;',    desc: 'Yen sign' },
  { char: '°',  entity: '&deg;',    desc: 'Degree' },
  { char: '±',  entity: '&plusmn;', desc: 'Plus-minus' },
  { char: '×',  entity: '&times;',  desc: 'Multiply' },
  { char: '÷',  entity: '&divide;', desc: 'Divide' },
  { char: '½',  entity: '&frac12;', desc: 'One half' },
  { char: '…',  entity: '&hellip;', desc: 'Ellipsis' },
  { char: '–',  entity: '&ndash;',  desc: 'En dash' },
  { char: '—',  entity: '&mdash;',  desc: 'Em dash' },
  { char: '←',  entity: '&larr;',   desc: 'Left arrow' },
  { char: '→',  entity: '&rarr;',   desc: 'Right arrow' },
  { char: '↑',  entity: '&uarr;',   desc: 'Up arrow' },
  { char: '↓',  entity: '&darr;',   desc: 'Down arrow' },
  { char: '∞',  entity: '&infin;',  desc: 'Infinity' },
  { char: '≠',  entity: '&ne;',     desc: 'Not equal' },
  { char: '≤',  entity: '&le;',     desc: 'Less or equal' },
  { char: '≥',  entity: '&ge;',     desc: 'Greater or equal' },
  { char: 'α',  entity: '&alpha;',  desc: 'Alpha' },
  { char: 'β',  entity: '&beta;',   desc: 'Beta' },
  { char: 'π',  entity: '&pi;',     desc: 'Pi' },
];

const SAMPLE_ENCODE = `<div class="greeting">Hello & Welcome!</div>
Price: £49.99 — was €59.00
Copyright © 2025 MyToolMate™`;

const SAMPLE_DECODE = `&lt;div class=&quot;greeting&quot;&gt;Hello &amp; Welcome!&lt;/div&gt;
Price: &pound;49.99 &mdash; was &euro;59.00
Copyright &copy; 2025 MyToolMate&trade;`;

// ─── UI ───────────────────────────────────────────────────────────────────────
export default function HtmlEntity() {
  const [input, setInput]           = useState('');
  const [mode, setMode]             = useState<'encode' | 'decode'>('encode');
  const [encodeMode, setEncodeMode] = useState<EncodeMode>('minimal');
  const [encodeNL, setEncodeNL]     = useState(false);
  const [copied, setCopied]         = useState(false);
  const [search, setSearch]         = useState('');

  const output = useMemo(() => {
    if (!input) return '';
    return mode === 'encode'
      ? encodeEntities(input, encodeMode, encodeNL)
      : decodeEntities(input);
  }, [input, mode, encodeMode, encodeNL]);

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const swap = () => {
    setInput(output);
    setMode(m => m === 'encode' ? 'decode' : 'encode');
  };

  const filteredRef = REFERENCE_ENTRIES.filter(e =>
    !search || e.char.includes(search) || e.entity.toLowerCase().includes(search.toLowerCase()) || e.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Code className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">HTML Entity Converter</h1>
          <p className="text-sm text-muted-foreground">
            Encode / decode HTML entities — spaces stay as spaces, not &amp;nbsp;
          </p>
        </div>
      </div>

      {/* Mode tabs */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <button onClick={() => setMode('encode')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${mode === 'encode' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
          Encode →
        </button>
        <button onClick={() => setMode('decode')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${mode === 'decode' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
          ← Decode
        </button>
        <button onClick={swap} title="Swap input ↔ output"
          className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm hover:bg-accent">
          <RefreshCw className="h-3.5 w-3.5" /> Swap
        </button>

        {/* Sample loaders */}
        <button onClick={() => { setInput(SAMPLE_ENCODE); setMode('encode'); }}
          className="px-3 py-2 border rounded-md text-xs hover:bg-accent ml-auto">
          Load encode sample
        </button>
        <button onClick={() => { setInput(SAMPLE_DECODE); setMode('decode'); }}
          className="px-3 py-2 border rounded-md text-xs hover:bg-accent">
          Load decode sample
        </button>
      </div>

      {/* Encode options */}
      {mode === 'encode' && (
        <div className="flex flex-wrap items-center gap-3 mb-4 p-3 rounded-lg bg-muted/50 text-sm">
          <span className="font-medium text-muted-foreground">Encoding:</span>
          {([
            ['minimal',  'Minimal (& < > " only)'],
            ['named',    'Named entities'],
            ['decimal',  'Decimal numeric'],
            ['hex',      'Hex numeric'],
          ] as [EncodeMode, string][]).map(([val, label]) => (
            <label key={val} className="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" name="encmode" value={val}
                checked={encodeMode === val}
                onChange={() => setEncodeMode(val)}
                className="accent-primary" />
              {label}
            </label>
          ))}
          <label className="flex items-center gap-1.5 cursor-pointer ml-2 border-l pl-3">
            <input type="checkbox" checked={encodeNL}
              onChange={e => setEncodeNL(e.target.checked)}
              className="accent-primary rounded" />
            Convert newlines → &lt;br&gt;
          </label>
        </div>
      )}

      {/* ⚠️ Space note */}
      {mode === 'encode' && (
        <div className="mb-4 text-xs rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 px-3 py-2">
          <strong>Note:</strong> Regular spaces (U+0020) are preserved as plain spaces — they are never converted to <code>&amp;nbsp;</code>.
          The real non-breaking space character (U+00A0, typed via Alt+Space on Mac or copy-pasted) <em>will</em> be encoded as <code>&amp;nbsp;</code>.
        </div>
      )}

      {/* Input / Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium block mb-1.5">Input</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={mode === 'encode'
              ? 'Type or paste text with <HTML> & special chars…'
              : 'Type or paste &lt;encoded&gt; &amp;entities; here…'}
            className="w-full h-52 rounded-md border bg-background px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="text-xs text-muted-foreground mt-1">{input.length} chars</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium">Output</label>
            {output && (
              <button onClick={copy}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Result appears here…"
            className="w-full h-52 rounded-md border bg-muted/50 px-3 py-2 text-sm font-mono resize-none focus:outline-none"
          />
          <p className="text-xs text-muted-foreground mt-1">{output.length} chars</p>
        </div>
      </div>

      {/* Reference table */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold">Entity Reference</h2>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search…"
            className="text-xs rounded-md border bg-background px-2 py-1 w-36 focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="text-left px-3 py-2 font-medium w-16">Char</th>
                <th className="text-left px-3 py-2 font-medium w-36">Entity</th>
                <th className="text-left px-3 py-2 font-medium">Description</th>
                <th className="text-right px-3 py-2 font-medium w-16">Insert</th>
              </tr>
            </thead>
            <tbody className="font-mono divide-y">
              {filteredRef.map(({ char, entity, desc }) => (
                <tr key={entity} className="hover:bg-muted/30">
                  <td className="px-3 py-1.5 text-base text-center">
                    {char === '\u00A0' ? <span className="text-muted-foreground text-xs font-sans">NBSP</span> : char}
                  </td>
                  <td className="px-3 py-1.5 text-primary">{entity}</td>
                  <td className="px-3 py-1.5 text-muted-foreground font-sans">{desc}</td>
                  <td className="px-3 py-1.5 text-right">
                    <button
                      onClick={() => setInput(p => p + (char === '\u00A0' ? '\u00A0' : char))}
                      className="px-2 py-0.5 rounded border text-xs hover:bg-accent">
                      +
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
