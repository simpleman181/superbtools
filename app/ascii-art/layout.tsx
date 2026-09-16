import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ASCII Art — MyToolMate',
  description: 'Convert text to ASCII art with multiple font and style options.',
  openGraph: {
    title: 'ASCII Art — MyToolMate',
    description: 'Convert text to ASCII art with multiple font and style options.',
    url: 'https://www.mytoolmate.top/ascii-art',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
