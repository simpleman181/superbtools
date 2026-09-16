import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cron Generator — MyToolMate',
  description: 'Build and validate cron expressions visually with human-readable schedule descriptions.',
  openGraph: {
    title: 'Cron Generator — MyToolMate',
    description: 'Build and validate cron expressions visually with human-readable schedule descriptions.',
    url: 'https://www.mytoolmate.top/cron-generator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
