import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON Formatter — MyToolMate',
  description: 'Format, validate and prettify JSON with instant syntax highlighting and error detection.',
  openGraph: {
    title: 'JSON Formatter — MyToolMate',
    description: 'Format, validate and prettify JSON with instant syntax highlighting and error detection.',
    url: 'https://www.mytoolmate.top/json-formatter',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
