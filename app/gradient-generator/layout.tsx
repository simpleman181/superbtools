import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gradient Generator — MyToolMate',
  description: 'Generate CSS gradient code visually — linear and radial gradients with color stops.',
  openGraph: {
    title: 'Gradient Generator — MyToolMate',
    description: 'Generate CSS gradient code visually — linear and radial gradients with color stops.',
    url: 'https://www.mytoolmate.top/gradient-generator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
