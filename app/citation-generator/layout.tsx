import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Citations — MyToolMate',
  description: 'Generate APA, MLA and Chicago citations for books, websites and journals.',
  openGraph: {
    title: 'Citations — MyToolMate',
    description: 'Generate APA, MLA and Chicago citations for books, websites and journals.',
    url: 'https://www.mytoolmate.top/citation-generator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
