import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EMI Calculator — MyToolMate',
  description: 'Calculate EMI for home, car or personal loans with a full amortization schedule.',
  openGraph: {
    title: 'EMI Calculator — MyToolMate',
    description: 'Calculate EMI for home, car or personal loans with a full amortization schedule.',
    url: 'https://www.mytoolmate.top/emi-calculator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
