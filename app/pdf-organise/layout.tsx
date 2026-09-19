import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Organise PDF — MyToolMate',
  description: 'Drag to reorder, rotate or delete PDF pages — thumbnail view for easy management.',
  openGraph: {
    title: 'Organise PDF — MyToolMate',
    description: 'Drag to reorder, rotate or delete PDF pages — thumbnail view for easy management.',
    url: 'https://www.mytoolmate.top/pdf-organise',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
