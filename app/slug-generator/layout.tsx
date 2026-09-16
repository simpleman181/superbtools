import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Slug Generator — MyToolMate',
  description: 'Generate clean, SEO-friendly URL slugs from any title or text string.',
  openGraph: {
    title: 'Slug Generator — MyToolMate',
    description: 'Generate clean, SEO-friendly URL slugs from any title or text string.',
    url: 'https://www.mytoolmate.top/slug-generator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
