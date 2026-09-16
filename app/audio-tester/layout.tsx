import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Audio Test — MyToolMate',
  description: 'Test speakers and headphones with frequency sweeps and channel audio checks.',
  openGraph: {
    title: 'Audio Test — MyToolMate',
    description: 'Test speakers and headphones with frequency sweeps and channel audio checks.',
    url: 'https://www.mytoolmate.top/audio-tester',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
