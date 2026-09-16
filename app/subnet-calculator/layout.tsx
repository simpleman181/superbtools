import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subnet Calculator — MyToolMate',
  description: 'Calculate subnet masks, CIDR notation, host ranges and broadcast addresses.',
  openGraph: {
    title: 'Subnet Calculator — MyToolMate',
    description: 'Calculate subnet masks, CIDR notation, host ranges and broadcast addresses.',
    url: 'https://www.mytoolmate.top/subnet-calculator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
