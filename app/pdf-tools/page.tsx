'use client';
"use client";

import { useState } from "react";
import { FileText, Split, Merge } from "lucide-react";

export default function PdfTools() {
  const [mode, setMode] = useState<'split' | 'merge'>('merge');
  const [files, setFiles] = useState<File[]>([]);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">PDF Splitter & Merger</h1>
          <p className="text-sm text-muted-foreground">Combine or split PDFs (requires PDF-lib for full functionality)</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <button onClick={() => setMode('merge')} className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${mode === 'merge' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}><Merge className="h-4 w-4" /> Merge</button>
        <button onClick={() => setMode('split')} className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${mode === 'split' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}><Split className="h-4 w-4" /> Split</button>
      </div>

      <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center mb-4">
        <input type="file" accept=".pdf" multiple={mode === 'merge'} onChange={handleFiles} className="hidden" id="pdf-input" />
        <label htmlFor="pdf-input" className="cursor-pointer">
          <FileText className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-sm font-medium">{mode === 'merge' ? 'Select PDFs to merge' : 'Select a PDF to split'}</p>
        </label>
      </div>

      {files.length > 0 && (
        <div className="rounded-lg border bg-card p-4">
          <h3 className="text-sm font-semibold mb-2">Selected Files</h3>
          <div className="space-y-1">
            {files.map((f, i) => (
              <div key={i} className="flex items-center justify-between text-sm px-3 py-2 rounded bg-muted">
                <span>{f.name}</span>
                <span className="text-xs text-muted-foreground">{(f.size / 1024).toFixed(0)} KB</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
            {mode === 'merge' ? 'Merge PDFs' : 'Split PDF'}
          </button>
          <p className="text-xs text-muted-foreground mt-2">Note: Install pdf-lib for full PDF manipulation.</p>
        </div>
      )}
    </div>
  );
}
