import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Visualizer — MyToolMate',
  description: 'Visualize data with bar, line and pie charts from your own pasted data.',
  openGraph: {
    title: 'Data Visualizer — MyToolMate',
    description: 'Visualize data with bar, line and pie charts from your own pasted data.',
    url: 'https://www.mytoolmate.top/data-visualizer',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
