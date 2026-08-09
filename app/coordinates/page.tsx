"use client";

import { useState, useEffect } from "react";
import { MapPin, Locate } from "lucide-react";

export default function Coordinates() {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getLocation = () => {
    setLoading(true);
    setError('');
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude.toFixed(6));
        setLng(pos.coords.longitude.toFixed(6));
        setLoading(false);
      },
      () => {
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <MapPin className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Latitude / Longitude Finder</h1>
          <p className="text-sm text-muted-foreground">Get your current GPS coordinates</p>
        </div>
      </div>

      <button onClick={getLocation} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 mb-6">
        <Locate className="h-4 w-4" />
        {loading ? 'Locating...' : 'Get My Coordinates'}
      </button>

      {error && <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}

      {lat && lng && (
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-primary/5 p-4 text-center">
              <div className="text-xs text-muted-foreground mb-1">Latitude</div>
              <div className="text-2xl font-mono font-bold">{lat}</div>
            </div>
            <div className="rounded-lg bg-primary/5 p-4 text-center">
              <div className="text-xs text-muted-foreground mb-1">Longitude</div>
              <div className="text-2xl font-mono font-bold">{lng}</div>
            </div>
          </div>
          <div className="text-center">
            <a href={`https://www.google.com/maps?q=${lat},${lng}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">View on Google Maps →</a>
          </div>
        </div>
      )}
    </div>
  );
}
