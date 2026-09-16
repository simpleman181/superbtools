import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TTS Player — MyToolMate',
  description: 'Convert text to speech using your browser built-in speech synthesis engine.',
  openGraph: {
    title: 'TTS Player — MyToolMate',
    description: 'Convert text to speech using your browser built-in speech synthesis engine.',
    url: 'https://www.mytoolmate.top/tts-player',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
