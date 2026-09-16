import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Timezone — MyToolMate',
  description: 'Convert times between world time zones with live clocks and DST awareness.',
  openGraph: {
    title: 'Timezone — MyToolMate',
    description: 'Convert times between world time zones with live clocks and DST awareness.',
    url: 'https://www.mytoolmate.top/timezone-converter',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
