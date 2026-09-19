'use client';
import { useState, useCallback } from 'react';
import { ClipboardList, Upload, Download, Loader2, AlertCircle } from 'lucide-react';

interface FieldInfo { name: string; type: string; value: string; }

export default function PdfForm() {
  const [file, setFile] = useState<File|null>(null);
  const [fields, setFields] = useState<FieldInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const loadFields = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setFile(f); setFields([]); setStatus(''); setError('');
    setLoading(true);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const doc = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
      const form = doc.getForm();
      const detected: FieldInfo[] = [];
      for (const field of form.getFields()) {
        const type = field.constructor.name.replace('PDF','').replace('Field','');
        let value = '';
        try {
          if ('getText' in field) value = (field as any).getText() || '';
          else if ('isChecked' in field) value = (field as any).isChecked() ? 'true' : 'false';
        } catch {}
        detected.push({ name: field.getName(), type, value });
      }
      if (detected.length === 0) setError('No interactive form fields found in this PDF.');
      setFields(detected);
    } catch(e:any) { setError('Could not read PDF: ' + e.message); }
    setLoading(false);
  };

  const updateField = (i: number, value: string) => setFields(fs => fs.map((f,j) => j===i ? {...f,value} : f));

  const apply = useCallback(async () => {
    if (!file) return;
    setSaving(true); setError('');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const form = doc.getForm();
      for (const fieldInfo of fields) {
        try {
          const field = form.getField(fieldInfo.name);
          if ('setText' in field) (field as any).setText(fieldInfo.value);
          else if ('check' in field && fieldInfo.value === 'true') (field as any).check();
          else if ('uncheck' in field && fieldInfo.value !== 'true') (field as any).uncheck();
        } catch {}
      }
      const out = await doc.save();
      const url = URL.createObjectURL(new Blob([out as unknown as BlobPart],{type:'application/pdf'}));
      const a = document.createElement('a'); a.href=url; a.download=file.name.replace('.pdf','-filled.pdf'); a.click();
      URL.revokeObjectURL(url);
      setStatus('✅ Filled form downloaded!');
    } catch(e:any) { setError(e.message); }
    setSaving(false);
  }, [file, fields]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <ClipboardList className="h-8 w-8 text-primary"/>
        <div><h1 className="text-2xl font-bold">PDF Form Filler</h1>
          <p className="text-sm text-muted-foreground">Fill interactive AcroForm PDF fields — 100% in-browser</p></div>
      </div>
      <div className="mb-4 text-xs rounded-md bg-muted/60 border px-3 py-2 text-muted-foreground">
        Works with standard AcroForm PDFs (text fields, checkboxes). XFA-based forms (older Adobe format) are not supported.
      </div>
      <label htmlFor="form-file" className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 mb-6 cursor-pointer hover:border-primary/50 transition-colors">
        <Upload className="h-10 w-10 text-muted-foreground mb-2"/>
        <p className="text-sm font-medium">{file ? file.name : 'Upload PDF with form fields'}</p>
        <input id="form-file" type="file" accept=".pdf" onChange={loadFields} className="hidden"/>
      </label>
      {loading && <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4"><Loader2 className="h-4 w-4 animate-spin"/>Reading form fields…</div>}
      {error && <div className="flex items-center gap-2 text-destructive text-sm mb-3"><AlertCircle className="h-4 w-4"/>{error}</div>}
      {status && <div className="text-sm text-green-600 mb-3">{status}</div>}
      {fields.length > 0 && (
        <div className="rounded-xl border bg-card p-4 mb-4 space-y-3 max-h-96 overflow-y-auto">
          <p className="text-sm font-medium mb-2">{fields.length} field(s) found</p>
          {fields.map((f,i) => (
            <div key={f.name}>
              <label className="text-xs text-muted-foreground block mb-1">
                <span className="font-mono text-foreground">{f.name}</span> <span className="ml-1 text-muted-foreground">({f.type})</span>
              </label>
              {f.type === 'CheckBox' ? (
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input type="checkbox" checked={f.value==='true'} onChange={e=>updateField(i,e.target.checked?'true':'false')} className="rounded accent-primary"/>
                  {f.value==='true' ? 'Checked' : 'Unchecked'}
                </label>
              ) : (
                <input value={f.value} onChange={e=>updateField(i,e.target.value)} placeholder={`Enter ${f.name}…`}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"/>
              )}
            </div>
          ))}
        </div>
      )}
      {fields.length > 0 && (
        <button onClick={apply} disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
          {saving?<Loader2 className="h-4 w-4 animate-spin"/>:<Download className="h-4 w-4"/>}
          {saving?'Saving…':'Save Filled Form & Download'}
        </button>
      )}
    </div>
  );
}
