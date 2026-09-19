import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF to Image — MyToolMate',
  description: 'Convert PDF pages to PNG or JPG images — choose DPI and quality — 100% in-browser.',
  openGraph: {
    title: 'PDF to Image — MyToolMate',
    description: 'Convert PDF pages to PNG or JPG images — choose DPI and quality — 100% in-browser.',
    url: 'https://www.mytoolmate.top/pdf-to-image',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
