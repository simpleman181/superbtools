import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regex Tester — MyToolMate',
  description: 'Test regular expressions in real time with match highlighting and group capture display.',
  openGraph: {
    title: 'Regex Tester — MyToolMate',
    description: 'Test regular expressions in real time with match highlighting and group capture display.',
    url: 'https://www.mytoolmate.top/regex-tester',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
