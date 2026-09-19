import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete PDF Pages — MyToolMate',
  description: 'Select and permanently remove pages from any PDF — no upload, no server.',
  openGraph: {
    title: 'Delete PDF Pages — MyToolMate',
    description: 'Select and permanently remove pages from any PDF — no upload, no server.',
    url: 'https://www.mytoolmate.top/pdf-delete-pages',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
