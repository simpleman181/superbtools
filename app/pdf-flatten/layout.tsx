import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flatten PDF — MyToolMate',
  description: 'Flatten interactive form fields into static content — prevents further editing.',
  openGraph: {
    title: 'Flatten PDF — MyToolMate',
    description: 'Flatten interactive form fields into static content — prevents further editing.',
    url: 'https://www.mytoolmate.top/pdf-flatten',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
