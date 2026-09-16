import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SVG Optimizer — MyToolMate',
  description: 'Clean and optimize SVG markup to reduce file size without losing visual quality.',
  openGraph: {
    title: 'SVG Optimizer — MyToolMate',
    description: 'Clean and optimize SVG markup to reduce file size without losing visual quality.',
    url: 'https://www.mytoolmate.top/svg-optimizer',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
