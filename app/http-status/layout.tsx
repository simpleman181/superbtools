import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTTP Status — MyToolMate',
  description: 'Look up HTTP status codes — descriptions and usage for all 5xx, 4xx, 3xx and 2xx codes.',
  openGraph: {
    title: 'HTTP Status — MyToolMate',
    description: 'Look up HTTP status codes — descriptions and usage for all 5xx, 4xx, 3xx and 2xx codes.',
    url: 'https://www.mytoolmate.top/http-status',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
