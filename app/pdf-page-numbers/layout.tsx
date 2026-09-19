import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Page Numbers — MyToolMate',
  description: 'Stamp page numbers on PDF pages — customise position, prefix and starting number.',
  openGraph: {
    title: 'Add Page Numbers — MyToolMate',
    description: 'Stamp page numbers on PDF pages — customise position, prefix and starting number.',
    url: 'https://www.mytoolmate.top/pdf-page-numbers',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
