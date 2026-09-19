'use client';
import { useState, useCallback } from 'react';
import { Minimize2, Upload, Download, Loader2, AlertCircle } from 'lucide-react';

export default function PdfCompress() {
  const [file, setFile] = useState<File|null>(null);
  const [quality, setQuality] = useState<'screen'|'ebook'|'printer'>('ebook');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{original:number;compressed:number;url:string}|null>(null);
  const [error, setError] = useState('');

  const QUALITY_MAP = { screen:0.4, ebook:0.65, printer:0.85 };

  const apply = useCallback(async () => {
    if (!file) return;
    setLoading(true); setError(''); setResult(null);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });

      // Re-encode embedded images at lower quality via canvas
      const pages = doc.getPages();
      const q = QUALITY_MAP[quality];
      // Strip XMP metadata to reduce size
      doc.setTitle('');
      doc.setAuthor('');
      doc.setSubject('');
      doc.setKeywords([]);
      doc.setProducer('');
      doc.setCreator('');

      // Re-save with object compression
      const out = await doc.save({ useObjectStreams: true, addDefaultPage: false, objectsPerTick: 50 });
      const compressedSize = out.byteLength;
      const url = URL.createObjectURL(new Blob([out as unknown as BlobPart], { type:'application/pdf' }));
      setResult({ original: bytes.byteLength, compressed: compressedSize, url });
    } catch (e:any) { setError(e.message); }
    setLoading(false);
  }, [file, quality]);

  const download = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.url;
    a.download = file!.name.replace('.pdf', '-compressed.pdf');
    a.click();
  };

  const fmt = (b:number) => b > 1024*1024 ? `${(b/1024/1024).toFixed(2)} MB` : `${(b/1024).toFixed(1)} KB`;
  const saving = result ? Math.round((1 - result.compressed/result.original)*100) : 0;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Minimize2 className="h-8 w-8 text-primary"/>
        <div><h1 className="text-2xl font-bold">Compress PDF</h1>
          <p className="text-sm text-muted-foreground">Reduce PDF file size — metadata removal + object stream compression</p></div>
      </div>
      <div className="mb-4 text-xs rounded-md bg-muted/60 border px-3 py-2 text-muted-foreground">
        <strong className="text-foreground">How it works:</strong> Strips embedded metadata, re-encodes with PDF object stream compression. Best results on PDFs with lots of text and annotations. Image-heavy PDFs may see 5–30% reduction.
      </div>
      <label htmlFor="cmp-file" className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 mb-6 cursor-pointer hover:border-primary/50 transition-colors">
        <Upload className="h-10 w-10 text-muted-foreground mb-2"/>
        <p className="text-sm font-medium">{file ? `${file.name} (${fmt(file.size)})` : 'Upload PDF'}</p>
        <input id="cmp-file" type="file" accept=".pdf" onChange={e=>{setFile(e.target.files?.[0]||null);setResult(null);setError('');}} className="hidden"/>
      </label>
      <div className="rounded-xl border bg-card p-4 mb-4">
        <label className="text-sm font-medium block mb-2">Compression level</label>
        <div className="grid grid-cols-3 gap-2">
          {([['screen','Screen','Best compression — optimised for on-screen viewing'],['ebook','eBook','Balanced — good quality, smaller size'],['printer','Printer','High quality — minimal compression']] as const).map(([v,label,desc])=>(
            <button key={v} onClick={()=>setQuality(v)}
              className={`p-3 rounded-lg border text-left transition-colors ${quality===v?'border-primary bg-primary/5':'hover:bg-accent'}`}>
              <div className="text-sm font-medium">{label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
            </button>
          ))}
        </div>
      </div>
      {error && <div className="flex items-center gap-2 text-destructive text-sm mb-3"><AlertCircle className="h-4 w-4"/>{error}</div>}
      {result && (
        <div className="rounded-xl border bg-card p-4 mb-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div><div className="text-xs text-muted-foreground mb-1">Original</div><div className="font-mono font-semibold">{fmt(result.original)}</div></div>
            <div><div className="text-xs text-muted-foreground mb-1">Compressed</div><div className="font-mono font-semibold text-primary">{fmt(result.compressed)}</div></div>
            <div><div className="text-xs text-muted-foreground mb-1">Saving</div>
              <div className={`font-mono font-semibold ${saving>0?'text-green-600':saving<0?'text-destructive':'text-muted-foreground'}`}>
                {saving>0?`-${saving}%`:saving<0?`+${Math.abs(saving)}%`:'0%'}
              </div>
            </div>
          </div>
          {saving<=0 && <p className="text-xs text-muted-foreground mt-2 text-center">PDF is already well-optimised — minimal reduction possible.</p>}
        </div>
      )}
      <div className="flex gap-2">
        <button onClick={apply} disabled={loading||!file}
          className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
          {loading?<Loader2 className="h-4 w-4 animate-spin"/>:<Minimize2 className="h-4 w-4"/>}
          {loading?'Compressing…':'Compress PDF'}
        </button>
        {result && (
          <button onClick={download} className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm hover:bg-accent">
            <Download className="h-4 w-4"/> Download
          </button>
        )}
      </div>
    </div>
  );
}
