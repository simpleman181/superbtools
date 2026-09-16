import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compound Interest — MyToolMate',
  description: 'Calculate compound interest and final balance with growth charts over time.',
  openGraph: {
    title: 'Compound Interest — MyToolMate',
    description: 'Calculate compound interest and final balance with growth charts over time.',
    url: 'https://www.mytoolmate.top/compound-interest',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
