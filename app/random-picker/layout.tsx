import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Random Picker — MyToolMate',
  description: 'Pick a random item from a list — great for raffles, decisions and random selection.',
  openGraph: {
    title: 'Random Picker — MyToolMate',
    description: 'Pick a random item from a list — great for raffles, decisions and random selection.',
    url: 'https://www.mytoolmate.top/random-picker',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
