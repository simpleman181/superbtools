import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Word Counter — MyToolMate',
  description: 'Count words, characters, sentences and reading time for any block of text.',
  openGraph: {
    title: 'Word Counter — MyToolMate',
    description: 'Count words, characters, sentences and reading time for any block of text.',
    url: 'https://www.mytoolmate.top/word-counter',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
