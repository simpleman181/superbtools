import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cert Decoder — MyToolMate',
  description: 'Decode X.509 SSL certificates — view issuer, expiry dates and subject alternative names.',
  openGraph: {
    title: 'Cert Decoder — MyToolMate',
    description: 'Decode X.509 SSL certificates — view issuer, expiry dates and subject alternative names.',
    url: 'https://www.mytoolmate.top/cert-decoder',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
