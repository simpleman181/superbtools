import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Converter — MyToolMate',
  description: 'Convert text between UPPERCASE, lowercase, Title Case, camelCase and snake_case.',
  openGraph: {
    title: 'Case Converter — MyToolMate',
    description: 'Convert text between UPPERCASE, lowercase, Title Case, camelCase and snake_case.',
    url: 'https://www.mytoolmate.top/case-converter',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
