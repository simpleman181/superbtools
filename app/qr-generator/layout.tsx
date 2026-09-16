import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QR Generator — MyToolMate',
  description: 'Generate real scannable QR codes from URLs, text, WiFi credentials or phone numbers.',
  openGraph: {
    title: 'QR Generator — MyToolMate',
    description: 'Generate real scannable QR codes from URLs, text, WiFi credentials or phone numbers.',
    url: 'https://www.mytoolmate.top/qr-generator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
