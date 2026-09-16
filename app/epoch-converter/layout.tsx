import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Epoch Converter — MyToolMate',
  description: 'Convert Unix timestamps to readable dates and back — milliseconds supported.',
  openGraph: {
    title: 'Epoch Converter — MyToolMate',
    description: 'Convert Unix timestamps to readable dates and back — milliseconds supported.',
    url: 'https://www.mytoolmate.top/epoch-converter',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
