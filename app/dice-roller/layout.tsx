import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dice Roller — MyToolMate',
  description: 'Roll D4, D6, D8, D10, D12 and D20 dice with roll history and statistics.',
  openGraph: {
    title: 'Dice Roller — MyToolMate',
    description: 'Roll D4, D6, D8, D10, D12 and D20 dice with roll history and statistics.',
    url: 'https://www.mytoolmate.top/dice-roller',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
