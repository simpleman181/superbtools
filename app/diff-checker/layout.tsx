import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diff Checker — MyToolMate',
  description: 'Compare two blocks of text side by side and highlight differences line by line.',
  openGraph: {
    title: 'Diff Checker — MyToolMate',
    description: 'Compare two blocks of text side by side and highlight differences line by line.',
    url: 'https://www.mytoolmate.top/diff-checker',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
