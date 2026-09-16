import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base Converter — MyToolMate',
  description: 'Convert numbers between binary, octal, decimal and hexadecimal number bases.',
  openGraph: {
    title: 'Base Converter — MyToolMate',
    description: 'Convert numbers between binary, octal, decimal and hexadecimal number bases.',
    url: 'https://www.mytoolmate.top/base-converter',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
