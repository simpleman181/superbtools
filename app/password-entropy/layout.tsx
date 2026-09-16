import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Password Entropy — MyToolMate',
  description: 'Calculate password entropy and strength — estimate crack time and bit complexity.',
  openGraph: {
    title: 'Password Entropy — MyToolMate',
    description: 'Calculate password entropy and strength — estimate crack time and bit complexity.',
    url: 'https://www.mytoolmate.top/password-entropy',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
