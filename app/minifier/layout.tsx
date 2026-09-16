import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Minifier — MyToolMate',
  description: 'Minify JavaScript and CSS — remove whitespace and comments to reduce file size.',
  openGraph: {
    title: 'Minifier — MyToolMate',
    description: 'Minify JavaScript and CSS — remove whitespace and comments to reduce file size.',
    url: 'https://www.mytoolmate.top/minifier',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
