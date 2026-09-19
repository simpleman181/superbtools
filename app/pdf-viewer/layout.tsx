import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF Viewer — MyToolMate',
  description: 'View any PDF in your browser — page navigation, zoom and scroll — no upload needed.',
  openGraph: {
    title: 'PDF Viewer — MyToolMate',
    description: 'View any PDF in your browser — page navigation, zoom and scroll — no upload needed.',
    url: 'https://www.mytoolmate.top/pdf-viewer',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
