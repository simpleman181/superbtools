'use client';
"use client";

import { useState } from "react";
import { Sigma } from "lucide-react";

export default function MathRenderer() {
  const [latex, setLatex] = useState('\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}');

  const renderSimple = (input: string) => {
    let html = input
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '<span class="inline-flex flex-col items-center align-middle mx-1"><span class="border-b px-1">$1</span><span class="px-1">$2</span></span>')
      .replace(/\\sqrt\{([^}]+)\}/g, '<span class="inline-flex items-start"><span class="text-lg">√</span><span class="border-t pt-0.5 px-0.5">$1</span></span>')
      .replace(/\\pm/g, '±')
      .replace(/\\times/g, '×')
      .replace(/\\div/g, '÷')
      .replace(/\\alpha/g, 'α')
      .replace(/\\beta/g, 'β')
      .replace(/\\pi/g, 'π')
      .replace(/\\infty/g, '∞')
      .replace(/\\sum/g, 'Σ')
      .replace(/\\int/g, '∫')
      .replace(/\\leq/g, '≤')
      .replace(/\\geq/g, '≥')
      .replace(/\\neq/g, '≠')
      .replace(/\\approx/g, '≈')
      .replace(/\\cdot/g, '·')
      .replace(/\\to/g, '→')
      .replace(/\\left\(/g, '(')
      .replace(/\\right\)/g, ')')
      .replace(/\\left\[/g, '[')
      .replace(/\\right\]/g, ']')
      .replace(/\\left\{/g, '{')
      .replace(/\\right\}/g, '}')
      .replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>')
      .replace(/\^([a-zA-Z0-9])/g, '<sup>$1</sup>')
      .replace(/_\{([^}]+)\}/g, '<sub>$1</sub>')
      .replace(/_([a-zA-Z0-9])/g, '<sub>$1</sub>');
    return html;
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Sigma className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Math Equation Renderer</h1>
          <p className="text-sm text-muted-foreground">Convert LaTeX to typeset equations</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium block mb-1">LaTeX Input</label>
        <textarea
          value={latex}
          onChange={(e) => setLatex(e.target.value)}
          className="w-full h-24 rounded-md border bg-background px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="rounded-lg border bg-card p-8 text-center min-h-[120px] flex items-center justify-center">
        <div className="text-2xl" dangerouslySetInnerHTML={{ __html: renderSimple(latex) }} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {['\\frac{a}{b}', '\\sqrt{x}', 'x^2', '\\alpha', '\\pi', '\\sum', '\\int', '\\pm', '\\leq', '\\geq'].map((cmd) => (
          <button key={cmd} onClick={() => setLatex((p) => p + cmd)} className="px-2 py-1 rounded border text-xs font-mono hover:bg-accent">{cmd}</button>
        ))}
      </div>
    </div>
  );
}
