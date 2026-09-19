import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TXT to PDF — MyToolMate',
  description: 'Convert plain text files to a formatted PDF — choose font, size and page layout.',
  openGraph: {
    title: 'TXT to PDF — MyToolMate',
    description: 'Convert plain text files to a formatted PDF — choose font, size and page layout.',
    url: 'https://www.mytoolmate.top/txt-to-pdf',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
