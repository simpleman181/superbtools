import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lorem Ipsum — MyToolMate',
  description: 'Generate Lorem Ipsum placeholder text in any number of paragraphs or words.',
  openGraph: {
    title: 'Lorem Ipsum — MyToolMate',
    description: 'Generate Lorem Ipsum placeholder text in any number of paragraphs or words.',
    url: 'https://www.mytoolmate.top/lorem-ipsum',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
