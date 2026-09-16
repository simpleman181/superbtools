import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hash Generator — MyToolMate',
  description: 'Generate MD5, SHA-1, SHA-256 and SHA-512 hashes from any text input.',
  openGraph: {
    title: 'Hash Generator — MyToolMate',
    description: 'Generate MD5, SHA-1, SHA-256 and SHA-512 hashes from any text input.',
    url: 'https://www.mytoolmate.top/hash-generator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
