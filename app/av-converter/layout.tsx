import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AV Converter — MyToolMate',
  description: 'Convert audio files between WAV, WebM and OGG formats using the Web Audio API.',
  openGraph: {
    title: 'AV Converter — MyToolMate',
    description: 'Convert audio files between WAV, WebM and OGG formats using the Web Audio API.',
    url: 'https://www.mytoolmate.top/av-converter',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
