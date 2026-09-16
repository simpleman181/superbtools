import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML Entity Converter — MyToolMate',
  description: 'Encode special characters to HTML entities or decode them back — never converts spaces to &nbsp;',
  openGraph: {
    title: 'HTML Entity Converter — MyToolMate',
    description: 'Encode special characters to HTML entities or decode them back — never converts spaces to &nbsp;',
    url: 'https://www.mytoolmate.top/html-entity',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
