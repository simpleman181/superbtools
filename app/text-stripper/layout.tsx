import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Text Stripper — MyToolMate',
  description: 'Remove HTML tags, extra whitespace and special characters from any text.',
  openGraph: {
    title: 'Text Stripper — MyToolMate',
    description: 'Remove HTML tags, extra whitespace and special characters from any text.',
    url: 'https://www.mytoolmate.top/text-stripper',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
