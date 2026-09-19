'use client';
import { useState, useCallback } from 'react';
import { Layers, Upload, Download, Loader2, AlertCircle } from 'lucide-react';

export default function PdfFlatten() {
  const [file, setFile] = useState<File|null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const apply = useCallback(async () => {
    if (!file) return;
    setLoading(true); setError('');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const form = doc.getForm();
      try { form.flatten(); } catch { /* no form fields — still save clean */ }
      const out = await doc.save();
      const url = URL.createObjectURL(new Blob([out as unknown as BlobPart], { type: 'application/pdf' }));
      const a = document.createElement('a'); a.href = url; a.download = file.name.replace('.pdf', '-flattened.pdf'); a.click();
      URL.revokeObjectURL(url);
      setStatus('✅ PDF flattened and downloaded!');
    } catch (e: any) { setError(e.message); }
    setLoading(false);
  }, [file]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Layers className="h-8 w-8 text-primary" />
        <div><h1 className="text-2xl font-bold">Flatten PDF</h1>
          <p className="text-sm text-muted-foreground">Make form fields and annotations permanent — 100% in-browser</p></div>
      </div>
      <div className="mb-4 text-xs rounded-md bg-muted/60 border px-3 py-2 text-muted-foreground">
        <strong className="text-foreground">What flattening does:</strong> Converts interactive form fields (text inputs, checkboxes, signatures) into static content so they can no longer be edited. Useful before sending filled forms.
      </div>
      <label htmlFor="flat-file" className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-xl p-10 mb-6 cursor-pointer hover:border-primary/50 transition-colors">
        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-sm font-medium">{file ? file.name : 'Upload PDF with form fields'}</p>
        <p className="text-xs text-muted-foreground mt-1">Works on any PDF — plain PDFs are saved as-is</p>
        <input id="flat-file" type="file" accept=".pdf" onChange={e => { setFile(e.target.files?.[0] || null); setStatus(''); setError(''); }} className="hidden" />
      </label>
      {error && <div className="flex items-center gap-2 text-destructive text-sm mb-3"><AlertCircle className="h-4 w-4" />{error}</div>}
      {status && <div className="text-sm text-green-600 mb-3">{status}</div>}
      <button onClick={apply} disabled={loading || !file}
        className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {loading ? 'Flattening...' : 'Flatten & Download'}
      </button>
    </div>
  );
}
