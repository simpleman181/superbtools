import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About MyToolMate — MyToolMate',
  description: 'Learn about MyToolMate — free, privacy-first developer utilities that run entirely in your browser.',
  openGraph: {
    title: 'About MyToolMate — MyToolMate',
    description: 'Learn about MyToolMate — free, privacy-first developer utilities that run entirely in your browser.',
    url: 'https://www.mytoolmate.top/about',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
