import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Converter — MyToolMate',
  description: 'Convert images between PNG, JPEG, WebP and BMP formats in your browser.',
  openGraph: {
    title: 'Image Converter — MyToolMate',
    description: 'Convert images between PNG, JPEG, WebP and BMP formats in your browser.',
    url: 'https://www.mytoolmate.top/image-converter',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
