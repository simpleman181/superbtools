import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image to PDF — MyToolMate',
  description: 'Convert JPG and PNG images to a PDF — supports multiple images with page order control.',
  openGraph: {
    title: 'Image to PDF — MyToolMate',
    description: 'Convert JPG and PNG images to a PDF — supports multiple images with page order control.',
    url: 'https://www.mytoolmate.top/image-to-pdf',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
