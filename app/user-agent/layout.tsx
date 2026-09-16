import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User-Agent — MyToolMate',
  description: 'Parse your browser User-Agent string — OS, browser version and device information.',
  openGraph: {
    title: 'User-Agent — MyToolMate',
    description: 'Parse your browser User-Agent string — OS, browser version and device information.',
    url: 'https://www.mytoolmate.top/user-agent',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
