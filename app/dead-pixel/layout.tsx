import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dead Pixel — MyToolMate',
  description: 'Test your monitor for dead or stuck pixels with a full-screen color flash test.',
  openGraph: {
    title: 'Dead Pixel — MyToolMate',
    description: 'Test your monitor for dead or stuck pixels with a full-screen color flash test.',
    url: 'https://www.mytoolmate.top/dead-pixel',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
