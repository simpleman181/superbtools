import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Country Codes — MyToolMate',
  description: 'Look up international telephone country dialing codes for every country.',
  openGraph: {
    title: 'Country Codes — MyToolMate',
    description: 'Look up international telephone country dialing codes for every country.',
    url: 'https://www.mytoolmate.top/country-codes',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
