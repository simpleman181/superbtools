import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoice — MyToolMate',
  description: 'Create professional invoices with line items and tax and download as PDF.',
  openGraph: {
    title: 'Invoice — MyToolMate',
    description: 'Create professional invoices with line items and tax and download as PDF.',
    url: 'https://www.mytoolmate.top/invoice-generator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
