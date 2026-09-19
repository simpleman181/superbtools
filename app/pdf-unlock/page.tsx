'use client';
import { useState, useCallback } from 'react';
import { Unlock, Upload, Download, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function PdfUnlock() {
  const [file, setFile] = useState<File|null>(null);
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const apply = useCallback(async () => {
    if (!file) return;
    setLoading(true); setError('');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const bytes = await file.arrayBuffer();
      let doc;
      try {
        doc = await (PDFDocument as any).load(bytes, { password: password || undefined });
      } catch {
        try { doc = await PDFDocument.load(bytes, { ignoreEncryption: true }); }
        catch (e2: any) { throw new Error('Wrong password or could not decrypt: ' + e2.message); }
      }
      const out = await doc.save();
      const url = URL.createObjectURL(new Blob([out as unknown as BlobPart], { type: 'application/pdf' }));
      const a = document.createElement('a'); a.href = url; a.download = file.name.replace('.pdf', '-unlocked.pdf'); a.click();
      URL.revokeObjectURL(url);
      setStatus('✅ PDF unlocked and downloaded!');
    } catch (e: any) { setError(e.message); }
    setLoading(false);
  }, [file, password]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Unlock className="h-8 w-8 text-primary" />
        <div><h1 className="text-2xl font-bold">Unlock PDF</h1>
          <p className="text-sm text-muted-foreground">Remove password protection from a PDF you own — 100% in-browser</p></div>
      </div>
      <div className="mb-4 text-xs rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 px-3 py-2">
        <strong>Note:</strong> Only use this tool on PDFs you own or have permission to unlock. The file never leaves your device.
      </div>
      <label htmlFor="unl-file" className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 mb-6 cursor-pointer hover:border-primary/50 transition-colors">
        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-sm font-medium">{file ? file.name : 'Upload password-protected PDF'}</p>
        <input id="unl-file" type="file" accept=".pdf" onChange={e => { setFile(e.target.files?.[0] || null); setStatus(''); setError(''); }} className="hidden" />
      </label>
      <div className="rounded-xl border bg-card p-4 mb-4">
        <label className="text-sm font-medium block mb-1">Password <span className="text-muted-foreground text-xs">(leave blank to try without)</span></label>
        <div className="relative">
          <input type={show ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter PDF password"
            className="w-full rounded-md border bg-background px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <button onClick={() => setShow(v => !v)} className="absolute right-3 top-2.5 text-muted-foreground">{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
        </div>
      </div>
      {error && <div className="flex items-center gap-2 text-destructive text-sm mb-3"><AlertCircle className="h-4 w-4" />{error}</div>}
      {status && <div className="text-sm text-green-600 mb-3">{status}</div>}
      <button onClick={apply} disabled={loading || !file}
        className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Unlock className="h-4 w-4" />}
        {loading ? 'Unlocking...' : 'Unlock & Download'}
      </button>
    </div>
  );
}
