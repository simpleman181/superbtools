import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IP Lookup — MyToolMate',
  description: 'Look up geolocation, ISP and network details for any IPv4 or IPv6 address.',
  openGraph: {
    title: 'IP Lookup — MyToolMate',
    description: 'Look up geolocation, ISP and network details for any IPv4 or IPv6 address.',
    url: 'https://www.mytoolmate.top/ip-lookup',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
