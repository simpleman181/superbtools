import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stopwatch — MyToolMate',
  description: 'Browser-based stopwatch with lap tracking and split times.',
  openGraph: {
    title: 'Stopwatch — MyToolMate',
    description: 'Browser-based stopwatch with lap tracking and split times.',
    url: 'https://www.mytoolmate.top/stopwatch',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
