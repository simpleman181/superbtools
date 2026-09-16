import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON to Excel — MyToolMate',
  description: 'Convert JSON arrays to Excel spreadsheets and download them directly in your browser.',
  openGraph: {
    title: 'JSON to Excel — MyToolMate',
    description: 'Convert JSON arrays to Excel spreadsheets and download them directly in your browser.',
    url: 'https://www.mytoolmate.top/json-excel',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
