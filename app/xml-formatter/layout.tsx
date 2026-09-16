import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'XML Formatter — MyToolMate',
  description: 'Format and validate XML documents with proper indentation and structure.',
  openGraph: {
    title: 'XML Formatter — MyToolMate',
    description: 'Format and validate XML documents with proper indentation and structure.',
    url: 'https://www.mytoolmate.top/xml-formatter',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
