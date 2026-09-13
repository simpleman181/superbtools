'use client';

import { useState, useCallback } from "react";
import { FileText, Split, Merge, Download, X, AlertCircle, Loader2 } from "lucide-react";

type Mode = 'merge' | 'split';

export default function PdfTools() {
  const [mode, setMode] = useState<Mode>('merge');
  const [files, setFiles] = useState<File[]>([]);
  const [splitRange, setSplitRange] = useState('1-3');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...newFiles]);
    setError('');
  };

  const removeFile = (i: number) => setFiles(prev => prev.filter((_, idx) => idx !== i));

  const mergePDFs = useCallback(async () => {
    if (files.length < 2) { setError('Select at least 2 PDF files to merge.'); return; }
    setLoading(true); setError(''); setStatus('Loading pdf-lib...');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const merged = await PDFDocument.create();
      setStatus('Merging pages...');
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach(p => merged.addPage(p));
      }
      setStatus('Saving...');
      const out = await merged.save();
      const blob = new Blob([out as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'merged.pdf'; a.click();
      URL.revokeObjectURL(url);
      setStatus(`✅ Merged ${files.length} PDFs successfully!`);
    } catch (e: any) {
      setError(`Failed: ${e.message}`);
      setStatus('');
    }
    setLoading(false);
  }, [files]);

  const splitPDF = useCallback(async () => {
    if (files.length === 0) { setError('Select a PDF file to split.'); return; }
    setLoading(true); setError(''); setStatus('Loading pdf-lib...');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const bytes = await files[0].arrayBuffer();
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const total = doc.getPageCount();
      setStatus(`PDF has ${total} pages. Splitting...`);

      // Parse range like "1-3,5,7-9"
      const indices: number[] = [];
      splitRange.split(',').forEach(part => {
        const [a, b] = part.trim().split('-').map(n => parseInt(n.trim()) - 1);
        if (!isNaN(a) && isNaN(b)) indices.push(a);
        else if (!isNaN(a) && !isNaN(b)) for (let i = a; i <= b; i++) indices.push(i);
      });
      const valid = indices.filter(i => i >= 0 && i < total);
      if (valid.length === 0) throw new Error('No valid page numbers in range.');

      // Create one PDF per extracted range group
      const newDoc = await PDFDocument.create();
      const pages = await newDoc.copyPages(doc, valid);
      pages.forEach(p => newDoc.addPage(p));
      const out = await newDoc.save();
      const blob = new Blob([out as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `split-pages-${splitRange.replace(/,/g,'-')}.pdf`; a.click();
      URL.revokeObjectURL(url);
      setStatus(`✅ Extracted pages ${splitRange} (${valid.length} pages)`);
    } catch (e: any) {
      setError(`Failed: ${e.message}`);
      setStatus('');
    }
    setLoading(false);
  }, [files, splitRange]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">PDF Splitter & Merger</h1>
          <p className="text-sm text-muted-foreground">Merge multiple PDFs or extract pages — 100% in-browser</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <button onClick={() => { setMode('merge'); setFiles([]); setStatus(''); setError(''); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${mode === 'merge' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
          <Merge className="h-4 w-4" /> Merge PDFs
        </button>
        <button onClick={() => { setMode('split'); setFiles([]); setStatus(''); setError(''); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${mode === 'split' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
          <Split className="h-4 w-4" /> Split / Extract
        </button>
      </div>

      <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center mb-4 hover:border-primary/50 transition-colors">
        <input type="file" accept=".pdf" multiple={mode === 'merge'} onChange={handleFiles}
          className="hidden" id="pdf-input" />
        <label htmlFor="pdf-input" className="cursor-pointer">
          <FileText className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-sm font-medium">{mode === 'merge' ? 'Select PDFs to merge (multiple)' : 'Select a PDF to split'}</p>
          <p className="text-xs text-muted-foreground mt-1">Click to browse or drag & drop</p>
        </label>
      </div>

      {files.length > 0 && (
        <div className="rounded-lg border bg-card p-4 mb-4">
          <h3 className="text-sm font-semibold mb-2">Selected Files</h3>
          <div className="space-y-1 mb-4">
            {files.map((f, i) => (
              <div key={i} className="flex items-center justify-between text-sm px-3 py-2 rounded bg-muted">
                <span className="truncate flex-1">{f.name}</span>
                <span className="text-xs text-muted-foreground ml-2">{(f.size / 1024).toFixed(0)} KB</span>
                <button onClick={() => removeFile(i)} className="ml-2 text-muted-foreground hover:text-destructive">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {mode === 'split' && (
            <div className="mb-4">
              <label className="text-sm font-medium block mb-1">Page Range</label>
              <input value={splitRange} onChange={(e) => setSplitRange(e.target.value)}
                placeholder="e.g. 1-3,5,7-9"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring" />
              <p className="text-xs text-muted-foreground mt-1">Use commas and dashes. Example: 1-3,5,8-10</p>
            </div>
          )}

          <button onClick={mode === 'merge' ? mergePDFs : splitPDF} disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {loading ? 'Processing...' : mode === 'merge' ? 'Merge & Download' : 'Extract & Download'}
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm p-3 rounded-md bg-destructive/10">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />{error}
        </div>
      )}
      {status && !error && (
        <div className="text-sm text-muted-foreground p-3 rounded-md bg-muted">{status}</div>
      )}
    </div>
  );
}
