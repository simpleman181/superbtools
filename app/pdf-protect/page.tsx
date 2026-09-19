'use client';
import { useState, useCallback } from 'react';
import { Lock, Upload, Download, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function PdfProtect() {
  const [file, setFile] = useState<File|null>(null);
  const [userPwd, setUserPwd] = useState('');
  const [ownerPwd, setOwnerPwd] = useState('');
  const [showU, setShowU] = useState(false);
  const [showO, setShowO] = useState(false);
  const [allowPrint, setAllowPrint] = useState(true);
  const [allowCopy, setAllowCopy] = useState(false);
  const [allowEdit, setAllowEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const apply = useCallback(async () => {
    if (!file || !userPwd) return;
    setLoading(true); setError('');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      // pdf-lib encrypt() before save
      (doc as any).encrypt({
        userPassword: userPwd,
        ownerPassword: ownerPwd || userPwd,
        permissions: {
          printing: allowPrint ? 'highResolution' : 'none',
          copying: allowCopy,
          modifying: allowEdit,
          annotating: allowEdit,
          fillingForms: allowEdit,
        },
      });
      const encrypted = await doc.save();
      const url = URL.createObjectURL(new Blob([encrypted as unknown as BlobPart], { type: 'application/pdf' }));
      const a = document.createElement('a'); a.href = url; a.download = file.name.replace('.pdf', '-protected.pdf'); a.click();
      URL.revokeObjectURL(url);
      setStatus('✅ Password-protected PDF downloaded!');
    } catch (e: any) { setError(e.message); }
    setLoading(false);
  }, [file, userPwd, ownerPwd, allowPrint, allowCopy, allowEdit]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Lock className="h-8 w-8 text-primary" />
        <div><h1 className="text-2xl font-bold">Protect PDF</h1>
          <p className="text-sm text-muted-foreground">Password-protect and restrict permissions — 100% in-browser</p></div>
      </div>
      <label htmlFor="prot-file" className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 mb-6 cursor-pointer hover:border-primary/50 transition-colors">
        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-sm font-medium">{file ? file.name : 'Upload PDF'}</p>
        <input id="prot-file" type="file" accept=".pdf" onChange={e => { setFile(e.target.files?.[0] || null); setStatus(''); setError(''); }} className="hidden" />
      </label>
      <div className="rounded-xl border bg-card p-4 mb-4 space-y-4">
        <div><label className="text-sm font-medium block mb-1">User Password <span className="text-destructive">*</span> <span className="text-muted-foreground text-xs">(required to open)</span></label>
          <div className="relative">
            <input type={showU ? 'text' : 'password'} value={userPwd} onChange={e => setUserPwd(e.target.value)} placeholder="Set open password"
              className="w-full rounded-md border bg-background px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <button onClick={() => setShowU(v => !v)} className="absolute right-3 top-2.5 text-muted-foreground">{showU ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
          </div></div>
        <div><label className="text-sm font-medium block mb-1">Owner Password <span className="text-muted-foreground text-xs">(controls permissions — defaults to user password)</span></label>
          <div className="relative">
            <input type={showO ? 'text' : 'password'} value={ownerPwd} onChange={e => setOwnerPwd(e.target.value)} placeholder="Optional — leave blank to use user password"
              className="w-full rounded-md border bg-background px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <button onClick={() => setShowO(v => !v)} className="absolute right-3 top-2.5 text-muted-foreground">{showO ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
          </div></div>
        <div><label className="text-sm font-medium block mb-2">Permissions</label>
          <div className="space-y-2">
            {[['allowPrint', allowPrint, setAllowPrint, 'Allow printing'],
              ['allowCopy', allowCopy, setAllowCopy, 'Allow copying text'],
              ['allowEdit', allowEdit, setAllowEdit, 'Allow editing & annotations']
            ].map(([key, val, setter, label]) => (
              <label key={String(key)} className="flex items-center gap-2 cursor-pointer text-sm">
                <input type="checkbox" checked={val as boolean} onChange={e => (setter as any)(e.target.checked)} className="rounded accent-primary" />
                {label as string}
              </label>
            ))}</div></div>
      </div>
      {error && <div className="flex items-center gap-2 text-destructive text-sm mb-3"><AlertCircle className="h-4 w-4" />{error}</div>}
      {status && <div className="text-sm text-green-600 mb-3">{status}</div>}
      <button onClick={apply} disabled={loading || !file || !userPwd}
        className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
        {loading ? 'Encrypting...' : 'Protect & Download'}
      </button>
    </div>
  );
}
