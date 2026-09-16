import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Barcode — MyToolMate',
  description: 'Generate real, scannable Code128 and EAN-13 barcodes and download as PNG.',
  openGraph: {
    title: 'Barcode — MyToolMate',
    description: 'Generate real, scannable Code128 and EAN-13 barcodes and download as PNG.',
    url: 'https://www.mytoolmate.top/barcode-generator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
