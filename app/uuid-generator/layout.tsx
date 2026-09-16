import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UUID Generator — MyToolMate',
  description: 'Free online UUID Generator tool on MyToolMate.',
  openGraph: {
    title: 'UUID Generator — MyToolMate',
    description: 'Free online UUID Generator tool on MyToolMate.',
    url: 'https://www.mytoolmate.top/uuid-generator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
