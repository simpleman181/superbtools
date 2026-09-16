import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSV to JSON — MyToolMate',
  description: 'Convert CSV data to JSON with custom delimiter and header detection.',
  openGraph: {
    title: 'CSV to JSON — MyToolMate',
    description: 'Convert CSV data to JSON with custom delimiter and header detection.',
    url: 'https://www.mytoolmate.top/csv-to-json',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
