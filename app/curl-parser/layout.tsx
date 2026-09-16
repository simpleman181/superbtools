import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'cURL Parser — MyToolMate',
  description: 'Parse cURL commands into readable HTTP request details — headers, body and flags.',
  openGraph: {
    title: 'cURL Parser — MyToolMate',
    description: 'Parse cURL commands into readable HTTP request details — headers, body and flags.',
    url: 'https://www.mytoolmate.top/curl-parser',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
