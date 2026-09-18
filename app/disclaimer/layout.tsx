import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer — MyToolMate',
  description: 'MyToolMate disclaimer — important notices about the accuracy and use of our online tools.',
  openGraph: {
    title: 'Disclaimer — MyToolMate',
    description: 'MyToolMate disclaimer — important notices about the accuracy and use of our online tools.',
    url: 'https://www.mytoolmate.top/disclaimer',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
