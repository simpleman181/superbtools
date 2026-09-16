import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSS to Tailwind Converter — MyToolMate',
  description: 'Convert plain CSS to equivalent Tailwind CSS utility classes instantly.',
  openGraph: {
    title: 'CSS to Tailwind Converter — MyToolMate',
    description: 'Convert plain CSS to equivalent Tailwind CSS utility classes instantly.',
    url: 'https://www.mytoolmate.top/css-tailwind',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
