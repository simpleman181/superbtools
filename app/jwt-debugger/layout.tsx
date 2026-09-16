import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JWT Debugger — MyToolMate',
  description: 'Decode and inspect JWT tokens — view header, payload and expiry details.',
  openGraph: {
    title: 'JWT Debugger — MyToolMate',
    description: 'Decode and inspect JWT tokens — view header, payload and expiry details.',
    url: 'https://www.mytoolmate.top/jwt-debugger',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
