import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Favicon Generator — MyToolMate',
  description: 'Generate favicon files in all required sizes from any uploaded image.',
  openGraph: {
    title: 'Favicon Generator — MyToolMate',
    description: 'Generate favicon files in all required sizes from any uploaded image.',
    url: 'https://www.mytoolmate.top/favicon-generator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
