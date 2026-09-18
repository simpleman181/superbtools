import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — MyToolMate',
  description: 'Get in touch with the MyToolMate team — bug reports, feature suggestions, and feedback welcome.',
  openGraph: {
    title: 'Contact Us — MyToolMate',
    description: 'Get in touch with the MyToolMate team — bug reports, feature suggestions, and feedback welcome.',
    url: 'https://www.mytoolmate.top/contact',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
