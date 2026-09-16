import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Morse Code — MyToolMate',
  description: 'Encode text to Morse code or decode Morse back to text with audio playback.',
  openGraph: {
    title: 'Morse Code — MyToolMate',
    description: 'Encode text to Morse code or decode Morse back to text with audio playback.',
    url: 'https://www.mytoolmate.top/morse-code',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
