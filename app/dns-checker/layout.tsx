import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DNS Checker — MyToolMate',
  description: 'Look up DNS records — A, AAAA, MX, TXT, CNAME and NS for any domain.',
  openGraph: {
    title: 'DNS Checker — MyToolMate',
    description: 'Look up DNS records — A, AAAA, MX, TXT, CNAME and NS for any domain.',
    url: 'https://www.mytoolmate.top/dns-checker',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
