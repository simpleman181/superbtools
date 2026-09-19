import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crop PDF — MyToolMate',
  description: 'Trim margins from PDF pages — set custom crop box values in points.',
  openGraph: {
    title: 'Crop PDF — MyToolMate',
    description: 'Trim margins from PDF pages — set custom crop box values in points.',
    url: 'https://www.mytoolmate.top/pdf-crop',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
