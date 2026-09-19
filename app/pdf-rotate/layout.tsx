import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rotate PDF — MyToolMate',
  description: 'Rotate individual PDF pages or the whole document — 90°, 180°, 270° — 100% in-browser.',
  openGraph: {
    title: 'Rotate PDF — MyToolMate',
    description: 'Rotate individual PDF pages or the whole document — 90°, 180°, 270° — 100% in-browser.',
    url: 'https://www.mytoolmate.top/pdf-rotate',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
