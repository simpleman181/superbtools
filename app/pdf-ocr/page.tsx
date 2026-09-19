'use client';
import { useState, useCallback } from 'react';
import { ScanText, Upload, Download, Loader2, AlertCircle, Copy, Check } from 'lucide-react';

export default function PdfOcr() {
  const [file, setFile] = useState<File|null>(null);
  const [text, setText] = useState('');
  const [lang, setLang] = useState('eng');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const run = useCallback(async () => {
    if (!file) return;
    setLoading(true); setError(''); setText('');
    try {
      // Render PDF pages to canvas via pdfjs, then OCR each page
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
      const bytes = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;

      const { createWorker } = await import('tesseract.js');
      setProgress('Initialising OCR engine…');
      const worker = await createWorker(lang, 1, {
        logger: (m: any) => { if (m.status === 'recognizing text') setProgress(`OCR: ${Math.round(m.progress*100)}%`); }
      });

      const allText: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(`Rendering page ${i}/${pdf.numPages}…`);
        const page = await pdf.getPage(i);
        const vp = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        canvas.width = vp.width; canvas.height = vp.height;
        await (page as any).render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
        setProgress(`OCR page ${i}/${pdf.numPages}…`);
        const { data: { text: pageText } } = await worker.recognize(canvas);
        allText.push(`--- Page ${i} ---\n${pageText.trim()}`);
      }
      await worker.terminate();
      setText(allText.join('\n\n'));
      setProgress('');
    } catch(e:any) { setError('OCR failed: ' + e.message); }
    setLoading(false);
  }, [file, lang]);

  const download = () => {
    const blob = new Blob([text], { type:'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download=file!.name.replace('.pdf','-ocr.txt'); a.click();
    URL.revokeObjectURL(url);
  };

  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(()=>setCopied(false),1500); };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <ScanText className="h-8 w-8 text-primary"/>
        <div><h1 className="text-2xl font-bold">PDF OCR</h1>
          <p className="text-sm text-muted-foreground">Extract text from scanned PDFs using Tesseract — 100% in-browser</p></div>
      </div>
      <div className="mb-4 text-xs rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 px-3 py-2">
        <strong>Performance:</strong> OCR runs entirely in your browser. Expect ~10–30s per page depending on your device. First run downloads the language model (~10 MB).
      </div>
      <label htmlFor="ocr-file" className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 mb-4 cursor-pointer hover:border-primary/50 transition-colors">
        <Upload className="h-10 w-10 text-muted-foreground mb-2"/>
        <p className="text-sm font-medium">{file ? file.name : 'Upload scanned PDF'}</p>
        <p className="text-xs text-muted-foreground mt-1">Works best on clear, high-resolution scans</p>
        <input id="ocr-file" type="file" accept=".pdf" onChange={e=>{setFile(e.target.files?.[0]||null);setText('');setError('');}} className="hidden"/>
      </label>
      <div className="rounded-xl border bg-card p-4 mb-4">
        <label className="text-sm font-medium block mb-2">Language</label>
        <select value={lang} onChange={e=>setLang(e.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
          <option value="eng">English</option>
          <option value="deu">German</option>
          <option value="fra">French</option>
          <option value="spa">Spanish</option>
          <option value="ita">Italian</option>
          <option value="por">Portuguese</option>
          <option value="chi_sim">Chinese (Simplified)</option>
          <option value="jpn">Japanese</option>
          <option value="hin">Hindi</option>
          <option value="ara">Arabic</option>
        </select>
      </div>
      {error && <div className="flex items-center gap-2 text-destructive text-sm mb-3"><AlertCircle className="h-4 w-4"/>{error}</div>}
      <button onClick={run} disabled={loading||!file}
        className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60 mb-4">
        {loading?<Loader2 className="h-4 w-4 animate-spin"/>:<ScanText className="h-4 w-4"/>}
        {loading ? progress||'Running OCR…' : 'Run OCR & Extract Text'}
      </button>
      {text && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Extracted Text ({text.split(/\s+/).length} words)</p>
            <div className="flex gap-2">
              <button onClick={copy} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded border">
                {copied?<Check className="h-3.5 w-3.5 text-green-500"/>:<Copy className="h-3.5 w-3.5"/>} {copied?'Copied':'Copy'}
              </button>
              <button onClick={download} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded border">
                <Download className="h-3.5 w-3.5"/> Save .txt
              </button>
            </div>
          </div>
          <textarea value={text} readOnly
            className="w-full h-64 rounded-md border bg-muted/50 px-3 py-2 text-xs font-mono resize-none focus:outline-none"/>
        </div>
      )}
    </div>
  );
}
