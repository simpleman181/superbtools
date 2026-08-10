'use client';
"use client";

import { useState, useEffect } from "react";
import { Volume2, Play, Pause, Settings } from "lucide-react";

export default function TtsPlayer() {
  const [text, setText] = useState('Hello! This is a text-to-speech demonstration.');
  const [speaking, setSpeaking] = useState(false);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState('');

  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
      if (v.length > 0 && !selectedVoice) setSelectedVoice(v[0].name);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = () => {
    if (!text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    const voice = voices.find((v) => v.name === selectedVoice);
    if (voice) utterance.voice = voice;
    utterance.onend = () => setSpeaking(false);
    utterance.onstart = () => setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Volume2 className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Text-to-Speech Player</h1>
          <p className="text-sm text-muted-foreground">Read text aloud using your browser's voice engine</p>
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to speak..."
        className="w-full h-32 rounded-md border bg-background px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring mb-4"
      />

      <div className="rounded-lg border bg-card p-4 space-y-4 mb-4">
        <div>
          <label className="text-sm font-medium block mb-1">Voice</label>
          <select value={selectedVoice} onChange={(e) => setSelectedVoice(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm">
            {voices.map((v) => <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Speed: {rate}x</label>
          <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Pitch: {pitch}</label>
          <input type="range" min="0.5" max="2" step="0.1" value={pitch} onChange={(e) => setPitch(Number(e.target.value))} className="w-full" />
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={speak} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium">
          <Play className="h-5 w-5" /> Speak
        </button>
        <button onClick={stop} className="flex items-center gap-2 px-4 py-3 border rounded-lg hover:bg-accent">
          <Pause className="h-5 w-5" /> Stop
        </button>
      </div>
    </div>
  );
}
