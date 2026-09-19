import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Protect PDF — MyToolMate',
  description: 'Password-protect a PDF and restrict printing, copying and editing permissions.',
  openGraph: {
    title: 'Protect PDF — MyToolMate',
    description: 'Password-protect a PDF and restrict printing, copying and editing permissions.',
    url: 'https://www.mytoolmate.top/pdf-protect',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
