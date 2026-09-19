import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Word to PDF — MyToolMate',
  description: 'Convert .docx Word documents to PDF — content and headings preserved — in-browser.',
  openGraph: {
    title: 'Word to PDF — MyToolMate',
    description: 'Convert .docx Word documents to PDF — content and headings preserved — in-browser.',
    url: 'https://www.mytoolmate.top/word-to-pdf',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
