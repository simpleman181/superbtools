import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coordinates — MyToolMate',
  description: 'Convert between decimal degrees and DMS and look up GPS coordinates on a map.',
  openGraph: {
    title: 'Coordinates — MyToolMate',
    description: 'Convert between decimal degrees and DMS and look up GPS coordinates on a map.',
    url: 'https://www.mytoolmate.top/coordinates',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
