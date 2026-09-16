import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SVG Path Editor — MyToolMate',
  description: 'Inspect and edit SVG path data and visualize bezier curves and anchor points.',
  openGraph: {
    title: 'SVG Path Editor — MyToolMate',
    description: 'Inspect and edit SVG path data and visualize bezier curves and anchor points.',
    url: 'https://www.mytoolmate.top/svg-path-editor',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
