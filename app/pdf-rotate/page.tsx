'use client';
import { useState, useCallback } from 'react';
import { RotateCw, Upload, Download, X, Loader2, AlertCircle } from 'lucide-react';

type Rotation = 0 | 90 | 180 | 270;

export default function PdfRotate() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [rotations, setRotations] = useState<Rotation[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f); setError(''); setStatus('');
    setLoading(true);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const count = doc.getPageCount();
      setPageCount(count);
      setRotations(new Array(count).fill(0));
    } catch (e: any) { setError('Could not read PDF: ' + e.message); }
    setLoading(false);
  };

  const rotate = (idx: number, deg: Rotation) => {
    setRotations(r => r.map((v, i) => i === idx ? deg : v));
  };

  const rotateAll = (deg: Rotation) => setRotations(new Array(pageCount).fill(deg));

  const apply = useCallback(async () => {
    if (!file) return;
    setLoading(true); setError('');
    try {
      const { PDFDocument, degrees } = await import('pdf-lib');
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
      doc.getPages().forEach((p, i) => {
        if (rotations[i] !== 0) p.setRotation(degrees(rotations[i]));
      });
      const out = await doc.save();
      const url = URL.createObjectURL(new Blob([out as unknown as BlobPart], { type: 'application/pdf' }));
      const a = document.createElement('a');
      a.href = url; a.download = file.name.replace('.pdf', '-rotated.pdf'); a.click();
      URL.revokeObjectURL(url);
      setStatus('✅ Downloaded!');
    } catch (e: any) { setError(e.message); }
    setLoading(false);
  }, [file, rotations]);

  const btns: {label: string; deg: Rotation}[] = [
    {label:'0°',deg:0},{label:'90°',deg:90},{label:'180°',deg:180},{label:'270°',deg:270}
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <RotateCw className="h-8 w-8 text-primary" />
        <div><h1 className="text-2xl font-bold">Rotate PDF</h1>
          <p className="text-sm text-muted-foreground">Rotate individual pages or the entire PDF — 100% in-browser</p></div>
      </div>
      <label htmlFor="rot-file" className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-xl p-10 mb-6 cursor-pointer hover:border-primary/50 transition-colors">
        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-sm font-medium">Upload PDF</p>
        <p className="text-xs text-muted-foreground mt-1">Click or drag & drop</p>
        <input id="rot-file" type="file" accept=".pdf" onChange={handleFile} className="hidden" />
      </label>
      {file && pageCount > 0 && (
        <div className="rounded-xl border bg-card p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium">{file.name} — {pageCount} pages</p>
            <div className="flex gap-1">
              {btns.map(b => (
                <button key={b.deg} onClick={() => rotateAll(b.deg)}
                  className="px-2 py-1 text-xs rounded border hover:bg-accent">All {b.label}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
            {rotations.map((rot, i) => (
              <div key={i} className="border rounded-lg p-2 text-center">
                <div className="text-xs text-muted-foreground mb-1">Page {i+1}</div>
                <div className="flex gap-1 justify-center flex-wrap">
                  {btns.map(b => (
                    <button key={b.deg} onClick={() => rotate(i, b.deg)}
                      className={`px-1.5 py-0.5 text-xs rounded ${rot === b.deg ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {error && <div className="flex items-center gap-2 text-destructive text-sm mb-3"><AlertCircle className="h-4 w-4"/>{error}</div>}
      {status && <div className="text-sm text-green-600 mb-3">{status}</div>}
      {file && pageCount > 0 && (
        <button onClick={apply} disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
          {loading ? <Loader2 className="h-4 w-4 animate-spin"/> : <Download className="h-4 w-4"/>}
          {loading ? 'Processing...' : 'Apply Rotations & Download'}
        </button>
      )}
    </div>
  );
}
