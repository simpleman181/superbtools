'use client';
import { useState, useCallback, useRef } from 'react';
import { LayoutGrid, Upload, Download, Loader2, AlertCircle, RotateCw, Trash2, FilePlus, ArrowDown, ArrowUp } from 'lucide-react';

interface PageInfo {
  srcFile: number;   // index into loadedFiles
  srcPage: number;   // 0-based page index in that file
  thumb: string;
  rotation: number;
  label: string;     // display name e.g. "File1 · P3"
}

interface LoadedFile {
  file: File;
  pageCount: number;
}

export default function PdfOrganise() {
  const [loadedFiles, setLoadedFiles] = useState<LoadedFile[]>([]);
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [insertAfter, setInsertAfter] = useState<number | ''>('');
  const dragIdx = useRef<number | null>(null);
  const dragOver = useRef<number | null>(null);

  // Load a PDF file and render thumbnails
  const loadFile = useCallback(async (file: File, fileIdx: number, insertPosition?: number) => {
    setLoading(true);
    setProgress(`Loading ${file.name}…`);
    setError('');
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
      const bytes = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      const newPages: PageInfo[] = [];
      const shortName = file.name.replace('.pdf', '').slice(0, 12);
      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(`Rendering page ${i}/${pdf.numPages} of ${file.name}…`);
        const page = await pdf.getPage(i);
        const vp = page.getViewport({ scale: 0.25 });
        const canvas = document.createElement('canvas');
        canvas.width = vp.width;
        canvas.height = vp.height;
        await (page as any).render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
        newPages.push({
          srcFile: fileIdx,
          srcPage: i - 1,
          thumb: canvas.toDataURL('image/jpeg', 0.5),
          rotation: 0,
          label: `${shortName} · P${i}`,
        });
      }
      if (insertPosition !== undefined) {
        // Insert after specific page number (1-based)
        setPages(prev => {
          const arr = [...prev];
          arr.splice(insertPosition, 0, ...newPages);
          return arr;
        });
      } else {
        setPages(prev => [...prev, ...newPages]);
      }
    } catch (e: any) {
      setError('Could not load ' + file.name + ': ' + e.message);
    }
    setProgress('');
    setLoading(false);
  }, []);

  // Handle primary PDF upload
  const handlePrimary = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setPages([]);
    setLoadedFiles([]);
    setStatus('');
    setError('');
    const newLoaded: LoadedFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      // Dummy count — real count filled after load
      newLoaded.push({ file: f, pageCount: 0 });
    }
    setLoadedFiles(newLoaded);
    // Load all files sequentially, appending pages
    let totalPages = 0;
    for (let i = 0; i < files.length; i++) {
      await loadFile(files[i], i);
    }
  };

  // Handle append PDF
  const handleAppend = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const pos = insertAfter === '' ? pages.length : Number(insertAfter);
    const clampedPos = Math.max(0, Math.min(pages.length, pos));
    const newIdx = loadedFiles.length;
    setLoadedFiles(prev => [...prev, { file, pageCount: 0 }]);
    await loadFile(file, newIdx, clampedPos);
    setStatus(`✅ Inserted ${file.name} after page ${clampedPos === 0 ? 'beginning' : clampedPos}`);
    // Reset input
    e.target.value = '';
  };

  // Drag-and-drop reorder
  const onDragStart = (i: number) => { dragIdx.current = i; };
  const onDragEnter = (i: number) => { dragOver.current = i; };
  const onDragEnd = () => {
    if (dragIdx.current === null || dragOver.current === null || dragIdx.current === dragOver.current) return;
    const arr = [...pages];
    const [moved] = arr.splice(dragIdx.current, 1);
    arr.splice(dragOver.current, 0, moved);
    setPages(arr);
    dragIdx.current = null;
    dragOver.current = null;
  };

  const moveUp = (i: number) => {
    if (i === 0) return;
    const arr = [...pages];
    [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
    setPages(arr);
  };

  const moveDown = (i: number) => {
    if (i === pages.length - 1) return;
    const arr = [...pages];
    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    setPages(arr);
  };

  const rotateOne = (i: number) =>
    setPages(ps => ps.map((p, j) => j === i ? { ...p, rotation: (p.rotation + 90) % 360 } : p));

  const deleteOne = (i: number) =>
    setPages(ps => ps.filter((_, j) => j !== i));

  // Download final PDF
  const download = useCallback(async () => {
    if (!pages.length || !loadedFiles.length) return;
    setLoading(true);
    setProgress('Building PDF…');
    setError('');
    try {
      const { PDFDocument, degrees } = await import('pdf-lib');
      // Load all source PDFs once
      const srcDocs: any[] = [];
      for (const lf of loadedFiles) {
        const bytes = await lf.file.arrayBuffer();
        srcDocs.push(await PDFDocument.load(bytes, { ignoreEncryption: true }));
      }
      const out = await PDFDocument.create();
      for (const p of pages) {
        const srcDoc = srcDocs[p.srcFile];
        const [copied] = await out.copyPages(srcDoc, [p.srcPage]);
        if (p.rotation) copied.setRotation(degrees(p.rotation));
        out.addPage(copied);
      }
      const bytes = await out.save();
      const url = URL.createObjectURL(new Blob([bytes as unknown as BlobPart], { type: 'application/pdf' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'organised.pdf';
      a.click();
      URL.revokeObjectURL(url);
      setStatus(`✅ Downloaded — ${pages.length} pages from ${loadedFiles.length} file(s)`);
    } catch (e: any) {
      setError(e.message);
    }
    setProgress('');
    setLoading(false);
  }, [pages, loadedFiles]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <LayoutGrid className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Organise PDF</h1>
          <p className="text-sm text-muted-foreground">
            Merge, reorder, rotate and delete pages — insert PDFs at any position — 100% in-browser
          </p>
        </div>
      </div>

      {/* Step 1 — Upload base PDF(s) */}
      <div className="rounded-xl border bg-card p-5 mb-4">
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
          Upload PDF(s) to start
        </h2>
        <label htmlFor="org-primary" className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-xl p-6 cursor-pointer hover:border-primary/50 transition-colors">
          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm font-medium">
            {pages.length > 0 ? `${pages.length} pages loaded from ${loadedFiles.length} file(s)` : 'Upload one or more PDFs'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Multiple files will be merged in order</p>
          <input id="org-primary" type="file" accept=".pdf" multiple onChange={handlePrimary} className="hidden" />
        </label>
      </div>

      {/* Step 2 — Insert additional PDF */}
      {pages.length > 0 && (
        <div className="rounded-xl border bg-card p-5 mb-4">
          <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
            Insert another PDF at a specific position
          </h2>
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">
                Insert after page number <span className="text-muted-foreground">(leave blank = append at end)</span>
              </label>
              <input
                type="number"
                min={0}
                max={pages.length}
                value={insertAfter}
                onChange={e => setInsertAfter(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder={`0–${pages.length}`}
                className="w-28 rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p className="text-xs text-muted-foreground mt-1">0 = before all pages · {pages.length} = after all pages</p>
            </div>
            <div>
              <label htmlFor="org-append" className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-md text-sm cursor-pointer hover:bg-accent transition-colors">
                <FilePlus className="h-4 w-4" />
                Choose PDF to insert
              </label>
              <input id="org-append" type="file" accept=".pdf" onChange={handleAppend} className="hidden" />
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Loader2 className="h-4 w-4 animate-spin" />
          {progress || 'Processing…'}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm mb-3 p-3 rounded-md bg-destructive/10">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />{error}
        </div>
      )}
      {status && !error && (
        <div className="text-sm text-green-600 mb-3 p-3 rounded-md bg-green-50 dark:bg-green-900/20">{status}</div>
      )}

      {/* Step 3 — Page grid */}
      {pages.length > 0 && (
        <div className="rounded-xl border bg-card p-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">3</span>
              Arrange pages ({pages.length} total)
            </h2>
            <p className="text-xs text-muted-foreground">Drag to reorder · use ↑↓ arrows · rotate or delete individual pages</p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {pages.map((p, i) => (
              <div
                key={i}
                draggable
                onDragStart={() => onDragStart(i)}
                onDragEnter={() => onDragEnter(i)}
                onDragEnd={onDragEnd}
                onDragOver={e => e.preventDefault()}
                className="group relative border-2 border-muted rounded-lg overflow-hidden cursor-grab active:cursor-grabbing hover:border-primary transition-colors bg-white"
              >
                {/* Thumbnail */}
                <img
                  src={p.thumb}
                  alt={`Page ${i + 1}`}
                  className="w-full object-contain block"
                  style={{ transform: `rotate(${p.rotation}deg)`, transition: 'transform 0.2s' }}
                />

                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                  <div className="flex gap-1">
                    <button onClick={() => moveUp(i)} disabled={i === 0}
                      className="p-1 rounded bg-white/20 hover:bg-white/40 text-white disabled:opacity-30" title="Move up">
                      <ArrowUp className="h-3 w-3" />
                    </button>
                    <button onClick={() => moveDown(i)} disabled={i === pages.length - 1}
                      className="p-1 rounded bg-white/20 hover:bg-white/40 text-white disabled:opacity-30" title="Move down">
                      <ArrowDown className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => rotateOne(i)}
                      className="p-1 rounded bg-white/20 hover:bg-white/40 text-white" title="Rotate 90°">
                      <RotateCw className="h-3 w-3" />
                    </button>
                    <button onClick={() => deleteOne(i)}
                      className="p-1 rounded bg-red-500/70 hover:bg-red-500 text-white" title="Delete page">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Page number + source label */}
                <div className="bg-muted/80 text-center py-0.5">
                  <div className="text-[10px] font-semibold leading-tight">{i + 1}</div>
                  <div className="text-[9px] text-muted-foreground truncate px-1 leading-tight">{p.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Download button */}
      {pages.length > 0 && (
        <button
          onClick={download}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 disabled:opacity-60 transition-colors"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          {loading ? progress || 'Building PDF…' : `Download Organised PDF (${pages.length} pages)`}
        </button>
      )}
    </div>
  );
}
