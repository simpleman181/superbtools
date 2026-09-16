import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gantt Chart — MyToolMate',
  description: 'Build project timeline Gantt charts and export to image.',
  openGraph: {
    title: 'Gantt Chart — MyToolMate',
    description: 'Build project timeline Gantt charts and export to image.',
    url: 'https://www.mytoolmate.top/gantt-chart',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
