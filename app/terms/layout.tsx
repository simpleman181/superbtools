import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use — MyToolMate',
  description: 'MyToolMate terms of use — the rules and conditions for using our free developer tools.',
  openGraph: {
    title: 'Terms of Use — MyToolMate',
    description: 'MyToolMate terms of use — the rules and conditions for using our free developer tools.',
    url: 'https://www.mytoolmate.top/terms',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
