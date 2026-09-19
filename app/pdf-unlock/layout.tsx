import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unlock PDF — MyToolMate',
  description: 'Remove password protection from a PDF you own — enter the password to unlock.',
  openGraph: {
    title: 'Unlock PDF — MyToolMate',
    description: 'Remove password protection from a PDF you own — enter the password to unlock.',
    url: 'https://www.mytoolmate.top/pdf-unlock',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
