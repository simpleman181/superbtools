import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compress PDF — MyToolMate',
  description: 'Reduce PDF file size with metadata stripping and object stream compression.',
  openGraph: {
    title: 'Compress PDF — MyToolMate',
    description: 'Reduce PDF file size with metadata stripping and object stream compression.',
    url: 'https://www.mytoolmate.top/pdf-compress',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
