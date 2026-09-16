import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Age Calculator — MyToolMate',
  description: 'Calculate exact age in years, months and days from any date of birth.',
  openGraph: {
    title: 'Age Calculator — MyToolMate',
    description: 'Calculate exact age in years, months and days from any date of birth.',
    url: 'https://www.mytoolmate.top/age-calculator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
