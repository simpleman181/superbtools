import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy — MyToolMate',
  description: 'MyToolMate cookie policy — what cookies we use and how to control them.',
  openGraph: {
    title: 'Cookie Policy — MyToolMate',
    description: 'MyToolMate cookie policy — what cookies we use and how to control them.',
    url: 'https://www.mytoolmate.top/cookie-policy',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
