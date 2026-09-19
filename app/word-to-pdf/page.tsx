'use client';
import { useState, useCallback } from 'react';
import { FileText, Upload, Download, Loader2, AlertCircle } from 'lucide-react';

export default function WordToPdf() {
  const [file, setFile] = useState<File|null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const convert = useCallback(async () => {
    if (!file) return;
    setLoading(true); setError('');
    try {
      // mammoth: docx → HTML
      const mammoth = await import('mammoth');
      const arrayBuffer = await file.arrayBuffer();
      const { value: html } = await mammoth.convertToHtml({ arrayBuffer });

      // Wrap in styled page
      const fullHtml = `<!DOCTYPE html><html><head><style>
        body{font-family:Georgia,serif;padding:60px;max-width:750px;margin:0 auto;color:#111;line-height:1.6;font-size:12pt;}
        h1,h2,h3{margin-top:1.5em;margin-bottom:0.5em;} h1{font-size:20pt;} h2{font-size:16pt;} h3{font-size:13pt;}
        p{margin:0.6em 0;} table{border-collapse:collapse;width:100%;margin:1em 0;}
        td,th{border:1px solid #ccc;padding:6px 10px;} th{background:#f0f0f0;font-weight:bold;}
        ul,ol{margin:0.5em 0;padding-left:1.5em;} li{margin:0.3em 0;}
        img{max-width:100%;} pre{background:#f5f5f5;padding:12px;border-radius:4px;font-size:10pt;}
      </style></head><body>${html}</body></html>`;

      // html2canvas → pdf-lib
      const iframe = document.createElement('iframe');
      iframe.style.cssText = 'position:fixed;left:-9999px;top:0;width:794px;height:1123px;border:none;';
      document.body.appendChild(iframe);
      const iDoc = iframe.contentDocument!;
      iDoc.open(); iDoc.write(fullHtml); iDoc.close();
      await new Promise(r => setTimeout(r, 1000));

      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(iDoc.body, { scale: 2, useCORS: true, width: 794, windowWidth: 794 });
      document.body.removeChild(iframe);

      const { PDFDocument } = await import('pdf-lib');
      const doc = await PDFDocument.create();
      const imgData = canvas.toDataURL('image/png');
      const img = await doc.embedPng(imgData);
      const PDF_W = 595, PDF_H = 842;
      const scale = PDF_W / canvas.width;
      const scaledH = canvas.height * scale;
      const pagesNeeded = Math.ceil(scaledH / PDF_H);
      for (let i = 0; i < pagesNeeded; i++) {
        const page = doc.addPage([PDF_W, PDF_H]);
        page.drawImage(img, { x:0, y:-(i*PDF_H)+(scaledH-PDF_H*pagesNeeded), width:PDF_W, height:scaledH });
      }
      const out = await doc.save();
      const url = URL.createObjectURL(new Blob([out as unknown as BlobPart],{type:'application/pdf'}));
      const a = document.createElement('a'); a.href=url; a.download=file.name.replace(/\.docx?$/,'.pdf'); a.click();
      URL.revokeObjectURL(url);
      setStatus(`✅ Converted to PDF — ${pagesNeeded} page(s)!`);
    } catch(e:any) { setError('Conversion failed: ' + e.message); }
    setLoading(false);
  }, [file]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-8 w-8 text-primary"/>
        <div><h1 className="text-2xl font-bold">Word to PDF</h1>
          <p className="text-sm text-muted-foreground">Convert .docx files to PDF — 100% in-browser</p></div>
      </div>
      <div className="mb-4 text-xs rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 px-3 py-2">
        <strong>Layout note:</strong> Content, headings and tables are preserved. Complex layouts with custom fonts, text boxes or tracked changes may not render perfectly. For pixel-perfect output, use desktop Word or LibreOffice.
      </div>
      <label htmlFor="word-file" className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-xl p-10 mb-6 cursor-pointer hover:border-primary/50 transition-colors">
        <Upload className="h-10 w-10 text-muted-foreground mb-2"/>
        <p className="text-sm font-medium">{file ? file.name : 'Upload .docx file'}</p>
        <p className="text-xs text-muted-foreground mt-1">.doc and .docx supported</p>
        <input id="word-file" type="file" accept=".docx,.doc" onChange={e=>{setFile(e.target.files?.[0]||null);setStatus('');setError('');}} className="hidden"/>
      </label>
      {error && <div className="flex items-center gap-2 text-destructive text-sm mb-3"><AlertCircle className="h-4 w-4"/>{error}</div>}
      {status && <div className="text-sm text-green-600 mb-3">{status}</div>}
      <button onClick={convert} disabled={loading||!file}
        className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
        {loading?<Loader2 className="h-4 w-4 animate-spin"/>:<Download className="h-4 w-4"/>}
        {loading?'Converting… (may take ~10s)':'Convert to PDF & Download'}
      </button>
    </div>
  );
}
