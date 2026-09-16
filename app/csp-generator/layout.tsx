import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSP Generator — MyToolMate',
  description: 'Build Content Security Policy headers visually to protect your site from XSS attacks.',
  openGraph: {
    title: 'CSP Generator — MyToolMate',
    description: 'Build Content Security Policy headers visually to protect your site from XSS attacks.',
    url: 'https://www.mytoolmate.top/csp-generator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
