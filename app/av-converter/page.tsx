"use client";

import { useState } from "react";
import { Music, FileAudio } from "lucide-react";

export default function AvConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const convert = async () => {
    if (!file) return;
    setConverting(true);
    // Browser-based audio conversion is complex; this is a simplified demo
    setTimeout(() => setConverting(false), 2000);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Music className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Audio/Video Converter</h1>
          <p className="text-sm text-muted-foreground">Transcode media files in the browser (demo)</p>
        </div>
      </div>

      <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-12 text-center mb-6">
        <input type="file" accept="audio/*,video/*" onChange={handleFile} className="hidden" id="av-input" />
        <label htmlFor="av-input" className="cursor-pointer">
          <FileAudio className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-sm font-medium">Upload audio or video file</p>
          <p className="text-xs text-muted-foreground mt-1">MP3, WAV, MP4, WebM supported</p>
        </label>
      </div>

      {file && (
        <div className="rounded-lg border bg-card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{file.name}</span>
            <span className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Convert to:</label>
            <select className="rounded-md border px-3 py-1.5 text-sm">
              <option>MP3</option>
              <option>WAV</option>
              <option>OGG</option>
              <option>WebM</option>
            </select>
          </div>
          <button onClick={convert} disabled={converting} className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50">
            {converting ? 'Converting...' : 'Convert'}
          </button>
          <p className="text-xs text-muted-foreground">Note: Full audio transcoding requires ffmpeg.wasm. This is a UI demo.</p>
        </div>
      )}
    </div>
  );
}
