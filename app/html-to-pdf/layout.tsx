import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML to PDF — MyToolMate',
  description: 'Convert HTML and CSS to a PDF document — live preview, A4 and Letter page sizes.',
  openGraph: {
    title: 'HTML to PDF — MyToolMate',
    description: 'Convert HTML and CSS to a PDF document — live preview, A4 and Letter page sizes.',
    url: 'https://www.mytoolmate.top/html-to-pdf',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
