import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Keyboard Test — MyToolMate',
  description: 'Test every key on your keyboard and identify stuck or broken keys in real time.',
  openGraph: {
    title: 'Keyboard Test — MyToolMate',
    description: 'Test every key on your keyboard and identify stuck or broken keys in real time.',
    url: 'https://www.mytoolmate.top/keyboard-tester',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
