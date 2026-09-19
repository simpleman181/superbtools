'use client';
import { useState, useCallback, useRef } from 'react';
import { Code, Download, Loader2, AlertCircle, Eye } from 'lucide-react';

const SAMPLE = `<!DOCTYPE html>
<html>
<head><style>
  body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
  h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 8px; }
  table { border-collapse: collapse; width: 100%; margin-top: 20px; }
  th { background: #2563eb; color: white; padding: 8px 12px; }
  td { border: 1px solid #ddd; padding: 8px 12px; }
  tr:nth-child(even) { background: #f3f4f6; }
</style></head>
<body>
  <h1>MyToolMate Report</h1>
  <p>Generated on: <strong>${new Date().toLocaleDateString()}</strong></p>
  <table>
    <tr><th>Item</th><th>Value</th><th>Status</th></tr>
    <tr><td>Alpha</td><td>100</td><td>✅ Done</td></tr>
    <tr><td>Beta</td><td>250</td><td>🔄 In Progress</td></tr>
    <tr><td>Gamma</td><td>75</td><td>⏳ Pending</td></tr>
  </table>
</body>
</html>`;

export default function HtmlToPdf() {
  const [html, setHtml] = useState(SAMPLE);
  const [fileName, setFileName] = useState('document');
  const [pageSize, setPageSize] = useState<'a4'|'letter'>('a4');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const convert = useCallback(async () => {
    if (!html.trim()) return;
    setLoading(true); setError('');
    try {
      const PAGE = pageSize === 'a4' ? { w: 794, h: 1123 } : { w: 816, h: 1056 };
      // Create hidden iframe for rendering
      const iframe = document.createElement('iframe');
      iframe.style.cssText = `position:fixed;left:-9999px;top:0;width:${PAGE.w}px;height:${PAGE.h}px;border:none;`;
      document.body.appendChild(iframe);
      const iDoc = iframe.contentDocument!;
      iDoc.open(); iDoc.write(html); iDoc.close();
      await new Promise(r => setTimeout(r, 800)); // wait for render

      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(iDoc.body, { scale: 2, useCORS: true, width: PAGE.w, windowWidth: PAGE.w });
      document.body.removeChild(iframe);

      const { PDFDocument } = await import('pdf-lib');
      const doc = await PDFDocument.create();
      const imgData = canvas.toDataURL('image/png');
      const img = await doc.embedPng(imgData);

      // Paginate if content is taller than one page
      const PDF_W = pageSize === 'a4' ? 595 : 612;
      const PDF_H = pageSize === 'a4' ? 842 : 792;
      const scale = PDF_W / canvas.width;
      const scaledH = canvas.height * scale;
      const pagesNeeded = Math.ceil(scaledH / PDF_H);

      for (let i = 0; i < pagesNeeded; i++) {
        const page = doc.addPage([PDF_W, PDF_H]);
        page.drawImage(img, { x: 0, y: -(i * PDF_H) + (scaledH - PDF_H * pagesNeeded), width: PDF_W, height: scaledH });
      }

      const out = await doc.save();
      const url = URL.createObjectURL(new Blob([out as unknown as BlobPart], { type:'application/pdf' }));
      const a = document.createElement('a'); a.href=url; a.download=`${fileName}.pdf`; a.click();
      URL.revokeObjectURL(url);
      setStatus(`✅ PDF created — ${pagesNeeded} page(s)!`);
    } catch (e: any) { setError('Conversion failed: ' + e.message); }
    setLoading(false);
  }, [html, fileName, pageSize]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Code className="h-8 w-8 text-primary" />
        <div><h1 className="text-2xl font-bold">HTML to PDF</h1>
          <p className="text-sm text-muted-foreground">Convert HTML + CSS to a PDF document — 100% in-browser</p></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium">HTML Input</label>
            <button onClick={() => setHtml(SAMPLE)} className="text-xs text-primary hover:underline">Load sample</button>
          </div>
          <textarea value={html} onChange={e => setHtml(e.target.value)}
            className="w-full h-80 rounded-md border bg-background px-3 py-2 text-xs font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium">Preview</label>
            <button onClick={() => setPreview(v => !v)} className="flex items-center gap-1 text-xs text-primary hover:underline"><Eye className="h-3.5 w-3.5" />{preview?'Hide':'Show'}</button>
          </div>
          {preview
            ? <iframe ref={iframeRef} srcDoc={html} className="w-full h-80 rounded-md border bg-white" sandbox="allow-same-origin" />
            : <div className="w-full h-80 rounded-md border bg-muted/30 flex items-center justify-center text-sm text-muted-foreground">Click Show to preview</div>}
        </div>
      </div>
      <div className="rounded-xl border bg-card p-4 mb-4 flex flex-wrap gap-4">
        <div><label className="text-xs text-muted-foreground block mb-1">Filename</label>
          <input value={fileName} onChange={e => setFileName(e.target.value)}
            className="rounded-md border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
        <div><label className="text-xs text-muted-foreground block mb-1">Page size</label>
          <select value={pageSize} onChange={e => setPageSize(e.target.value as any)}
            className="rounded-md border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="a4">A4</option>
            <option value="letter">US Letter</option>
          </select></div>
      </div>
      {error && <div className="flex items-center gap-2 text-destructive text-sm mb-3"><AlertCircle className="h-4 w-4" />{error}</div>}
      {status && <div className="text-sm text-green-600 mb-3">{status}</div>}
      <button onClick={convert} disabled={loading || !html.trim()}
        className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {loading ? 'Converting…' : 'Convert to PDF & Download'}
      </button>
    </div>
  );
}
