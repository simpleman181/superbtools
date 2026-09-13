'use client';

import { useState, useRef, useCallback } from "react";
import { Music, FileAudio, Download, Loader2, AlertCircle, CheckCircle } from "lucide-react";

type Format = 'mp3' | 'wav' | 'ogg' | 'webm' | 'aac';

const FORMAT_MIME: Record<Format, string> = {
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  ogg: 'audio/ogg',
  webm: 'audio/webm',
  aac: 'audio/aac',
};

// Check browser codec support
function getSupportedFormats(): Format[] {
  const audio = document.createElement('audio');
  return (['webm', 'ogg', 'wav', 'mp3', 'aac'] as Format[]).filter(f => {
    const r = audio.canPlayType(FORMAT_MIME[f]);
    return r === 'probably' || r === 'maybe';
  });
}

// Convert using Web Audio API + MediaRecorder (browser-native)
async function convertAudio(
  file: File,
  targetFormat: Format,
  onProgress: (s: string) => void
): Promise<Blob> {
  onProgress('Decoding audio...');
  const arrayBuffer = await file.arrayBuffer();
  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

  onProgress('Encoding to ' + targetFormat.toUpperCase() + '...');

  // For WAV: encode directly from PCM
  if (targetFormat === 'wav') {
    const numChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const samples = audioBuffer.length * numChannels;
    const buffer = new ArrayBuffer(44 + samples * 2);
    const view = new DataView(buffer);
    const writeStr = (off: number, str: string) => { for (let i = 0; i < str.length; i++) view.setUint8(off + i, str.charCodeAt(i)); };
    writeStr(0, 'RIFF');
    view.setUint32(4, 36 + samples * 2, true);
    writeStr(8, 'WAVE');
    writeStr(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * 2, true);
    view.setUint16(32, numChannels * 2, true);
    view.setUint16(34, 16, true);
    writeStr(36, 'data');
    view.setUint32(40, samples * 2, true);
    let off = 44;
    for (let i = 0; i < audioBuffer.length; i++) {
      for (let ch = 0; ch < numChannels; ch++) {
        const s = Math.max(-1, Math.min(1, audioBuffer.getChannelData(ch)[i]));
        view.setInt16(off, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        off += 2;
      }
    }
    return new Blob([buffer], { type: 'audio/wav' });
  }

  // For other formats: use MediaRecorder
  return new Promise((resolve, reject) => {
    const dest = audioCtx.createMediaStreamDestination();
    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(dest);

    const mimeType = targetFormat === 'mp3' ? 'audio/webm' : (FORMAT_MIME[targetFormat] || 'audio/webm');
    const recorder = new MediaRecorder(dest.stream, { mimeType: MediaRecorder.isTypeSupported(mimeType) ? mimeType : 'audio/webm' });
    const chunks: Blob[] = [];
    recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
    recorder.onstop = () => resolve(new Blob(chunks, { type: mimeType }));
    recorder.onerror = reject;
    recorder.start();
    source.start(0);
    source.onended = () => { recorder.stop(); audioCtx.close(); };
  });
}

export default function AvConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [targetFmt, setTargetFmt] = useState<Format>('wav');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [supportedFmts, setSupportedFmts] = useState<Format[]>([]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f); setError(''); setStatus(''); setDone(false);
    setSupportedFmts(getSupportedFormats());
  };

  const convert = useCallback(async () => {
    if (!file) return;
    setLoading(true); setError(''); setDone(false);
    try {
      const blob = await convertAudio(file, targetFmt, setStatus);
      setStatus('Done! Downloading...');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      a.href = url;
      a.download = `${baseName}.${targetFmt === 'mp3' ? 'webm' : targetFmt}`;
      a.click();
      URL.revokeObjectURL(url);
      setDone(true);
      setStatus('');
    } catch (e: any) {
      setError(`Conversion failed: ${e.message}. Try WAV format — it works with any audio file.`);
      setStatus('');
    }
    setLoading(false);
  }, [file, targetFmt]);

  const formats: Format[] = ['wav', 'webm', 'ogg', 'mp3', 'aac'];

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Music className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Audio Converter</h1>
          <p className="text-sm text-muted-foreground">Convert audio files in-browser using Web Audio API</p>
        </div>
      </div>

      <div className="rounded-md bg-muted/60 text-xs text-muted-foreground px-3 py-2 mb-4">
        💡 Converts using your browser's native audio engine. WAV output works universally. Other formats depend on browser support.
      </div>

      <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-10 text-center mb-6 hover:border-primary/50 transition-colors">
        <input type="file" accept="audio/*" onChange={handleFile} className="hidden" id="av-input" />
        <label htmlFor="av-input" className="cursor-pointer">
          <FileAudio className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-sm font-medium">Upload audio file</p>
          <p className="text-xs text-muted-foreground mt-1">MP3, WAV, OGG, AAC, FLAC, M4A...</p>
        </label>
      </div>

      {file && (
        <div className="rounded-lg border bg-card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium truncate">{file.name}</span>
            <span className="text-xs text-muted-foreground ml-2">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Convert to:</label>
            <div className="flex gap-2 flex-wrap">
              {formats.map(f => (
                <button key={f} onClick={() => setTargetFmt(f)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium uppercase ${targetFmt === f ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                  {f}
                </button>
              ))}
            </div>
            {supportedFmts.length > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                Your browser supports: {supportedFmts.map(f => f.toUpperCase()).join(', ')}
              </p>
            )}
          </div>

          <button onClick={convert} disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {loading ? status || 'Converting...' : `Convert to ${targetFmt.toUpperCase()}`}
          </button>

          {done && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle className="h-4 w-4" /> Conversion complete — file downloaded!
            </div>
          )}
          {error && (
            <div className="flex items-start gap-2 text-destructive text-sm">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />{error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
