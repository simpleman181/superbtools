import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Password Generator — MyToolMate',
  description: 'Generate cryptographically secure passwords with custom length and character rules.',
  openGraph: {
    title: 'Password Generator — MyToolMate',
    description: 'Generate cryptographically secure passwords with custom length and character rules.',
    url: 'https://www.mytoolmate.top/password-generator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
