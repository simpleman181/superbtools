import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refresh Rate — MyToolMate',
  description: 'Measure your monitor\'s actual refresh rate using the browser animation loop.',
  openGraph: {
    title: 'Refresh Rate — MyToolMate',
    description: 'Measure your monitor\'s actual refresh rate using the browser animation loop.',
    url: 'https://www.mytoolmate.top/refresh-rate',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
