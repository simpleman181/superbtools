import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF Tools — MyToolMate',
  description: 'Merge multiple PDFs or extract pages — fully in-browser, no file upload to server.',
  openGraph: {
    title: 'PDF Tools — MyToolMate',
    description: 'Merge multiple PDFs or extract pages — fully in-browser, no file upload to server.',
    url: 'https://www.mytoolmate.top/pdf-tools',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
