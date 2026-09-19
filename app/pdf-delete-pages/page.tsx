'use client';
import { useState, useCallback } from 'react';
import { Trash2, Upload, Download, Loader2, AlertCircle } from 'lucide-react';

export default function PdfDeletePages() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setFile(f); setSelected(new Set()); setError(''); setStatus('');
    setLoading(true);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const doc = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
      setPageCount(doc.getPageCount());
    } catch(e: any) { setError('Could not read PDF: ' + e.message); }
    setLoading(false);
  };

  const toggle = (i: number) => setSelected(s => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });

  const apply = useCallback(async () => {
    if (!file || selected.size === 0) return;
    setLoading(true); setError('');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      // Remove in reverse order to preserve indices
      [...selected].sort((a,b)=>b-a).forEach(i => doc.removePage(i));
      const out = await doc.save();
      const url = URL.createObjectURL(new Blob([out as unknown as BlobPart], { type:'application/pdf' }));
      const a = document.createElement('a'); a.href=url; a.download=file.name.replace('.pdf','-deleted.pdf'); a.click();
      URL.revokeObjectURL(url);
      setStatus(`✅ Removed ${selected.size} page(s) — downloaded!`);
    } catch(e:any) { setError(e.message); }
    setLoading(false);
  }, [file, selected]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Trash2 className="h-8 w-8 text-primary" />
        <div><h1 className="text-2xl font-bold">Delete PDF Pages</h1>
          <p className="text-sm text-muted-foreground">Select pages to remove — 100% in-browser</p></div>
      </div>
      <label htmlFor="del-file" className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-xl p-10 mb-6 cursor-pointer hover:border-primary/50 transition-colors">
        <Upload className="h-10 w-10 text-muted-foreground mb-2"/>
        <p className="text-sm font-medium">Upload PDF</p>
        <input id="del-file" type="file" accept=".pdf" onChange={handleFile} className="hidden"/>
      </label>
      {file && pageCount > 0 && (
        <div className="rounded-xl border bg-card p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium">{file.name} — {pageCount} pages</p>
            <div className="flex gap-2">
              <button onClick={()=>setSelected(new Set(Array.from({length:pageCount},(_,i)=>i)))} className="text-xs text-primary hover:underline">Select all</button>
              <button onClick={()=>setSelected(new Set())} className="text-xs text-muted-foreground hover:underline">Clear</button>
            </div>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-8 gap-2 max-h-64 overflow-y-auto">
            {Array.from({length:pageCount},(_,i)=>(
              <button key={i} onClick={()=>toggle(i)}
                className={`rounded-lg border p-2 text-center text-xs font-medium transition-colors ${selected.has(i)?'bg-destructive text-destructive-foreground border-destructive':'bg-background hover:bg-accent'}`}>
                {i+1}
              </button>
            ))}
          </div>
          {selected.size > 0 && <p className="text-xs text-destructive mt-2">{selected.size} page(s) marked for deletion — {pageCount-selected.size} will remain</p>}
        </div>
      )}
      {error && <div className="flex items-center gap-2 text-destructive text-sm mb-3"><AlertCircle className="h-4 w-4"/>{error}</div>}
      {status && <div className="text-sm text-green-600 mb-3">{status}</div>}
      {file && pageCount > 0 && (
        <button onClick={apply} disabled={loading||selected.size===0}
          className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
          {loading?<Loader2 className="h-4 w-4 animate-spin"/>:<Download className="h-4 w-4"/>}
          {loading?'Processing...':selected.size>0?`Delete ${selected.size} Page(s) & Download`:'Select pages to delete'}
        </button>
      )}
    </div>
  );
}
