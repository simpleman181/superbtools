import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Time Card — MyToolMate',
  description: 'Track daily work hours and calculate total time and pay from a digital timecard.',
  openGraph: {
    title: 'Time Card — MyToolMate',
    description: 'Track daily work hours and calculate total time and pay from a digital timecard.',
    url: 'https://www.mytoolmate.top/time-card',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
