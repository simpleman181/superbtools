import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Percentage Calc — MyToolMate',
  description: 'Calculate percentages, discounts, tips and percentage change between two values.',
  openGraph: {
    title: 'Percentage Calc — MyToolMate',
    description: 'Calculate percentages, discounts, tips and percentage change between two values.',
    url: 'https://www.mytoolmate.top/percentage-calculator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
