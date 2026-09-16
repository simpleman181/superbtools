import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Math Renderer — MyToolMate',
  description: 'Render LaTeX math formulas — fractions, square roots, Greek letters and more.',
  openGraph: {
    title: 'Math Renderer — MyToolMate',
    description: 'Render LaTeX math formulas — fractions, square roots, Greek letters and more.',
    url: 'https://www.mytoolmate.top/math-renderer',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
