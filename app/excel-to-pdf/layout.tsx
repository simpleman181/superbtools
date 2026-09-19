import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Excel to PDF — MyToolMate',
  description: 'Convert Excel spreadsheets to a formatted PDF table — choose sheet and orientation.',
  openGraph: {
    title: 'Excel to PDF — MyToolMate',
    description: 'Convert Excel spreadsheets to a formatted PDF table — choose sheet and orientation.',
    url: 'https://www.mytoolmate.top/excel-to-pdf',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
