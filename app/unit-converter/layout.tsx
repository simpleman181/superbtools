import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unit Converter — MyToolMate',
  description: 'Convert units of length, weight, temperature, area, volume and speed.',
  openGraph: {
    title: 'Unit Converter — MyToolMate',
    description: 'Convert units of length, weight, temperature, area, volume and speed.',
    url: 'https://www.mytoolmate.top/unit-converter',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
