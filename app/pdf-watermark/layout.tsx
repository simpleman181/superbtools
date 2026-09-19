import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Watermark PDF — MyToolMate',
  description: 'Add custom text watermarks to every PDF page — diagonal, header or footer placement.',
  openGraph: {
    title: 'Watermark PDF — MyToolMate',
    description: 'Add custom text watermarks to every PDF page — diagonal, header or footer placement.',
    url: 'https://www.mytoolmate.top/pdf-watermark',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
