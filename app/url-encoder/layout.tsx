import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'URL Encoder — MyToolMate',
  description: 'Encode or decode URL components and query strings — handles all percent-encoding.',
  openGraph: {
    title: 'URL Encoder — MyToolMate',
    description: 'Encode or decode URL components and query strings — handles all percent-encoding.',
    url: 'https://www.mytoolmate.top/url-encoder',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
