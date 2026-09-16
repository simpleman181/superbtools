import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EXIF Remover — MyToolMate',
  description: 'Strip EXIF metadata from JPEG images to protect your location and privacy.',
  openGraph: {
    title: 'EXIF Remover — MyToolMate',
    description: 'Strip EXIF metadata from JPEG images to protect your location and privacy.',
    url: 'https://www.mytoolmate.top/exif-remover',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
