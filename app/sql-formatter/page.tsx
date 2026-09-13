'use client';

import { useState } from "react";
import { Database, Copy, Check, ChevronDown } from "lucide-react";

// ─── Tokenizer ────────────────────────────────────────────────────────────────
type TokenType = 'keyword' | 'compound' | 'identifier' | 'string' | 'number' |
                 'operator' | 'comma' | 'paren_open' | 'paren_close' | 'semicolon' | 'whitespace';

interface Token { type: TokenType; value: string; }

// Compound keywords that must NEVER be split across lines
const COMPOUNDS = [
  'ORDER BY', 'GROUP BY', 'PARTITION BY', 'INNER JOIN', 'LEFT JOIN',
  'RIGHT JOIN', 'FULL JOIN', 'CROSS JOIN', 'LEFT OUTER JOIN',
  'RIGHT OUTER JOIN', 'FULL OUTER JOIN', 'NOT IN', 'NOT LIKE',
  'NOT EXISTS', 'NOT NULL', 'IS NOT', 'IS NULL', 'UNION ALL',
  'INSERT INTO', 'CREATE TABLE', 'CREATE INDEX', 'CREATE VIEW',
  'DROP TABLE', 'ALTER TABLE', 'GROUP BY ROLLUP', 'GROUP BY CUBE',
];

// Top-level clause starters — each gets its own line at column 0
const TOP_LEVEL = new Set([
  'SELECT', 'FROM', 'WHERE', 'ORDER BY', 'GROUP BY', 'HAVING',
  'LIMIT', 'OFFSET', 'UNION', 'UNION ALL', 'EXCEPT', 'INTERSECT',
  'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'DELETE FROM',
  'CREATE TABLE', 'CREATE INDEX', 'CREATE VIEW', 'DROP TABLE',
  'ALTER TABLE', 'RETURNING',
]);

// JOIN variants — indented one level, never split
const JOINS = new Set([
  'JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN',
  'CROSS JOIN', 'LEFT OUTER JOIN', 'RIGHT OUTER JOIN', 'FULL OUTER JOIN',
]);

// Sub-clause keywords — indented under their parent
const SUB_CLAUSE = new Set(['ON', 'AND', 'OR', 'WHEN', 'THEN', 'ELSE', 'END']);

const SINGLE_KEYWORDS = new Set([
  'SELECT','FROM','WHERE','HAVING','LIMIT','OFFSET','UNION','EXCEPT',
  'INTERSECT','UPDATE','SET','DELETE','VALUES','RETURNING','AS',
  'DISTINCT','ALL','EXISTS','IN','BETWEEN','LIKE','ILIKE','IS',
  'NULL','NOT','ASC','DESC','CASE','WHEN','THEN','ELSE','END',
  'ON','AND','OR','JOIN','INTO','WITH','RECURSIVE','LATERAL',
  'NATURAL','USING','OVER','FILTER','WITHIN','PRECEDING','FOLLOWING',
  'UNBOUNDED','CURRENT','ROW','ROWS','RANGE',
  'COUNT','SUM','AVG','MIN','MAX','COALESCE','NULLIF','CAST',
  'EXTRACT','DATE_TRUNC','TRIM','UPPER','LOWER','LENGTH','SUBSTR',
  'REPLACE','TO_CHAR','TO_DATE','NOW','CURRENT_TIMESTAMP',
]);

function tokenize(sql: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const s = sql.trim();

  while (i < s.length) {
    // Whitespace — collapse and skip
    if (/\s/.test(s[i])) {
      while (i < s.length && /\s/.test(s[i])) i++;
      continue;
    }
    // Single-quoted string
    if (s[i] === "'") {
      let j = i + 1;
      while (j < s.length && !(s[j] === "'" && s[j-1] !== '\\')) j++;
      tokens.push({ type: 'string', value: s.slice(i, j + 1) });
      i = j + 1; continue;
    }
    // Double-quoted identifier
    if (s[i] === '"') {
      let j = i + 1;
      while (j < s.length && s[j] !== '"') j++;
      tokens.push({ type: 'identifier', value: s.slice(i, j + 1) });
      i = j + 1; continue;
    }
    // Backtick identifier (MySQL)
    if (s[i] === '`') {
      let j = i + 1;
      while (j < s.length && s[j] !== '`') j++;
      tokens.push({ type: 'identifier', value: s.slice(i, j + 1) });
      i = j + 1; continue;
    }
    // Line comment
    if (s[i] === '-' && s[i+1] === '-') {
      let j = i;
      while (j < s.length && s[j] !== '\n') j++;
      tokens.push({ type: 'identifier', value: s.slice(i, j) });
      i = j; continue;
    }
    // Block comment
    if (s[i] === '/' && s[i+1] === '*') {
      let j = i + 2;
      while (j < s.length && !(s[j] === '*' && s[j+1] === '/')) j++;
      tokens.push({ type: 'identifier', value: s.slice(i, j + 2) });
      i = j + 2; continue;
    }
    // Number
    if (/\d/.test(s[i]) || (s[i] === '.' && /\d/.test(s[i+1] || ''))) {
      let j = i;
      while (j < s.length && /[\d.]/.test(s[j])) j++;
      tokens.push({ type: 'number', value: s.slice(i, j) });
      i = j; continue;
    }
    // Punctuation
    if (s[i] === ',') { tokens.push({ type: 'comma', value: ',' }); i++; continue; }
    if (s[i] === '(') { tokens.push({ type: 'paren_open', value: '(' }); i++; continue; }
    if (s[i] === ')') { tokens.push({ type: 'paren_close', value: ')' }); i++; continue; }
    if (s[i] === ';') { tokens.push({ type: 'semicolon', value: ';' }); i++; continue; }
    // Operators — multi-char first
    if (s.slice(i, i+2).match(/^(<=|>=|<>|!=|::|\|\||->|->>)/)) {
      tokens.push({ type: 'operator', value: s.slice(i, i+2) }); i += 2; continue;
    }
    if ('=<>!+-*/%^&|~'.includes(s[i])) {
      tokens.push({ type: 'operator', value: s[i] }); i++; continue;
    }
    // Word (keyword or identifier)
    if (/[a-zA-Z_]/.test(s[i])) {
      let j = i;
      while (j < s.length && /[a-zA-Z0-9_$.#@]/.test(s[j])) j++;
      const word = s.slice(i, j);
      const upper = word.toUpperCase();
      const type = SINGLE_KEYWORDS.has(upper) ? 'keyword' : 'identifier';
      tokens.push({ type, value: word });
      i = j; continue;
    }
    // Fallthrough
    tokens.push({ type: 'identifier', value: s[i] }); i++;
  }

  // ── Merge compound keywords ──────────────────────────────────────────────
  // Sort longest first so "LEFT OUTER JOIN" beats "LEFT JOIN"
  const sorted = [...COMPOUNDS].sort((a, b) => b.length - a.length);
  for (const compound of sorted) {
    const parts = compound.split(' ');
    for (let k = 0; k <= tokens.length - parts.length; k++) {
      const slice = tokens.slice(k, k + parts.length);
      if (slice.every((t, idx) => t.value.toUpperCase() === parts[idx])) {
        tokens.splice(k, parts.length, { type: 'compound', value: compound });
      }
    }
  }

  return tokens;
}

// ─── Formatter ────────────────────────────────────────────────────────────────
function formatSQL(sql: string, indent: string, uppercase: boolean): string {
  const tokens = tokenize(sql);
  const lines: string[] = [];
  let depth = 0;       // paren nesting depth
  let lineTokens: string[] = [];
  let afterComma = false;
  let inSelectList = false;
  let clauseContext = '';

  const kw = (v: string) => uppercase ? v.toUpperCase() : v.toLowerCase();
  const pad = (d: number) => indent.repeat(Math.max(0, d));

  const flush = (extra = '') => {
    const line = lineTokens.join('').trimEnd();
    if (line) lines.push(line + extra);
    lineTokens = [];
    afterComma = false;
  };

  const pushClause = (label: string, indentLevel: number) => {
    flush();
    lineTokens = [pad(indentLevel) + kw(label)];
  };

  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    const next = tokens[i + 1];
    const upper = (tok.value || '').toUpperCase();
    const isTopLevel = TOP_LEVEL.has(upper);
    const isJoin = JOINS.has(upper);
    const isSubClause = SUB_CLAUSE.has(upper) && depth === 0;

    // ── Top-level clauses ──
    if ((tok.type === 'keyword' || tok.type === 'compound') && isTopLevel && depth === 0) {
      pushClause(upper, 0);
      clauseContext = upper;
      inSelectList = upper === 'SELECT';
      continue;
    }

    // ── JOINs ──
    if ((tok.type === 'keyword' || tok.type === 'compound') && isJoin && depth === 0) {
      pushClause(upper, 1);
      clauseContext = 'JOIN';
      inSelectList = false;
      continue;
    }

    // ── ON, AND, OR at top level ──
    if (tok.type === 'keyword' && isSubClause) {
      if (upper === 'ON') {
        flush();
        lineTokens = [pad(2) + kw('ON') + ' '];
      } else if ((upper === 'AND' || upper === 'OR') && clauseContext !== 'SELECT') {
        flush();
        lineTokens = [pad(clauseContext === 'JOIN' ? 2 : 1) + kw(upper) + ' '];
      } else {
        if (lineTokens.length) lineTokens.push(' ' + kw(upper));
        else lineTokens = [pad(1) + kw(upper)];
      }
      continue;
    }

    // ── Commas: in SELECT/column list → new line; in function args → inline ──
    if (tok.type === 'comma') {
      if (depth === 0 && (inSelectList || clauseContext === 'ORDER BY' || clauseContext === 'GROUP BY')) {
        lineTokens.push(',');
        flush();
        lineTokens = [pad(1)];
        afterComma = true;
      } else {
        lineTokens.push(', ');
      }
      continue;
    }

    // ── Parentheses ──
    if (tok.type === 'paren_open') {
      depth++;
      lineTokens.push('(');
      continue;
    }
    if (tok.type === 'paren_close') {
      depth = Math.max(0, depth - 1);
      lineTokens.push(')');
      continue;
    }

    // ── Semicolon ──
    if (tok.type === 'semicolon') {
      flush(';');
      lines.push('');
      clauseContext = '';
      inSelectList = false;
      continue;
    }

    // ── Operators — always spaced ──
    if (tok.type === 'operator') {
      // No space before/after unary minus in number context
      const prev = tokens[i - 1];
      const isUnary = !prev || prev.type === 'paren_open' || prev.type === 'operator' || prev.type === 'comma';
      if (isUnary && tok.value === '-') {
        lineTokens.push('-');
      } else {
        lineTokens.push(` ${tok.value} `);
      }
      continue;
    }

    // ── Keywords inside parens or inline ──
    if (tok.type === 'keyword') {
      const prevTok = tokens[i - 1];
      const needsSpace = lineTokens.length > 0 &&
        !lineTokens[lineTokens.length - 1].endsWith(' ') &&
        !lineTokens[lineTokens.length - 1].endsWith('(');
      if (needsSpace) lineTokens.push(' ');
      lineTokens.push(kw(upper));
      continue;
    }

    // ── Everything else: identifiers, strings, numbers ──
    const prev = tokens[i - 1];
    const needsSpace = lineTokens.length > 0 && (() => {
      const last = lineTokens[lineTokens.length - 1];
      if (!last) return false;
      const lastChar = last[last.length - 1];
      if (lastChar === ' ' || lastChar === '(') return false;
      if (prev?.type === 'operator') return false; // operator already added spaces
      if (tok.value === '.' || prev?.value === '.') return false; // schema.table.col
      return true;
    })();
    if (needsSpace) lineTokens.push(' ');
    lineTokens.push(tok.value);
  }

  flush();

  // Clean up: remove trailing blank lines, normalise internal blank lines
  return lines
    .map(l => l.trimEnd())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// ─── HTML Encoder (safe — only escapes markup chars, never touches spaces) ───
function encodeHTML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  // ✅ Spaces are intentionally NOT converted to &nbsp;
}

// ─── UI ───────────────────────────────────────────────────────────────────────
const INDENT_OPTIONS = [
  { label: '2 spaces', value: '  ' },
  { label: '4 spaces', value: '    ' },
  { label: 'Tab', value: '\t' },
];

const SAMPLE = `SELECT e.employee_id,e.first_name,e.last_name,d.department_name,s.salary_amount FROM employees e INNER JOIN departments d ON e.department_id=d.department_id LEFT JOIN salaries s ON e.employee_id=s.employee_id WHERE e.hire_date>='2020-01-01' AND e.status='active' AND s.salary_amount>50000 GROUP BY e.employee_id,e.first_name,e.last_name,d.department_name,s.salary_amount ORDER BY DESC,s.salary_amount LIMIT 100;`;

export default function SqlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [uppercase, setUppercase] = useState(true);
  const [indentStr, setIndentStr] = useState('  ');
  const [showIndent, setShowIndent] = useState(false);

  const format = () => {
    if (!input.trim()) return;
    setOutput(formatSQL(input, indentStr, uppercase));
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const loadSample = () => {
    setInput(SAMPLE);
    setOutput('');
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Database className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">SQL Formatter</h1>
          <p className="text-sm text-muted-foreground">
            Beautify SQL — compound clauses intact, operators spaced, consistent indentation
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <button onClick={format}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
          Format SQL
        </button>
        <button onClick={loadSample}
          className="px-4 py-2 border rounded-md text-sm hover:bg-accent">
          Load Sample
        </button>
        <button onClick={() => { setInput(''); setOutput(''); }}
          className="px-4 py-2 border rounded-md text-sm hover:bg-accent">
          Clear
        </button>

        {/* Indent picker */}
        <div className="relative">
          <button onClick={() => setShowIndent(v => !v)}
            className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm hover:bg-accent">
            {INDENT_OPTIONS.find(o => o.value === indentStr)?.label ?? 'Indent'}
            <ChevronDown className="h-3 w-3" />
          </button>
          {showIndent && (
            <div className="absolute top-full left-0 mt-1 z-10 bg-popover border rounded-md shadow-md min-w-[120px]">
              {INDENT_OPTIONS.map(o => (
                <button key={o.label} onClick={() => { setIndentStr(o.value); setShowIndent(false); }}
                  className={`block w-full text-left px-3 py-2 text-sm hover:bg-accent ${indentStr === o.value ? 'font-semibold text-primary' : ''}`}>
                  {o.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Case toggle */}
        <label className="flex items-center gap-2 text-sm cursor-pointer ml-1">
          <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)}
            className="rounded" />
          UPPERCASE keywords
        </label>
      </div>

      {/* Editor panes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input SQL</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); format(); } }}
            placeholder="Paste your SQL here…"
            className="w-full h-[460px] rounded-md border bg-background px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="text-xs text-muted-foreground mt-1">Tip: Ctrl+Enter to format</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Formatted SQL</label>
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
            placeholder="Formatted SQL will appear here…"
            className="w-full h-[460px] rounded-md border bg-muted/50 px-3 py-2 text-sm font-mono resize-none focus:outline-none"
          />
          {output && (
            <p className="text-xs text-muted-foreground mt-1">
              {output.split('\n').length} lines · {output.length} chars
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
