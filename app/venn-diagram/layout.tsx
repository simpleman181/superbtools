import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Venn Diagram — MyToolMate',
  description: 'Create Venn diagrams with custom labels and export as SVG or PNG.',
  openGraph: {
    title: 'Venn Diagram — MyToolMate',
    description: 'Create Venn diagrams with custom labels and export as SVG or PNG.',
    url: 'https://www.mytoolmate.top/venn-diagram',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
