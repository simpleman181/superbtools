import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSV to PDF — MyToolMate',
  description: 'Convert CSV data to a formatted PDF table — supports custom delimiters and headers.',
  openGraph: {
    title: 'CSV to PDF — MyToolMate',
    description: 'Convert CSV data to a formatted PDF table — supports custom delimiters and headers.',
    url: 'https://www.mytoolmate.top/csv-to-pdf',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
