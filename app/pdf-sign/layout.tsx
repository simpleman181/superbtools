import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign PDF — MyToolMate',
  description: 'Draw your signature on a canvas and embed it into any PDF page — 100% in-browser.',
  openGraph: {
    title: 'Sign PDF — MyToolMate',
    description: 'Draw your signature on a canvas and embed it into any PDF page — 100% in-browser.',
    url: 'https://www.mytoolmate.top/pdf-sign',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
