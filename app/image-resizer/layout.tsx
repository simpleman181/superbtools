import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Resizer — MyToolMate',
  description: 'Resize images to exact pixel dimensions in your browser — no server upload needed.',
  openGraph: {
    title: 'Image Resizer — MyToolMate',
    description: 'Resize images to exact pixel dimensions in your browser — no server upload needed.',
    url: 'https://www.mytoolmate.top/image-resizer',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
