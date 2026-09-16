import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SQL Formatter — MyToolMate',
  description: 'Format SQL queries with proper indentation, keyword casing and clause alignment.',
  openGraph: {
    title: 'SQL Formatter — MyToolMate',
    description: 'Format SQL queries with proper indentation, keyword casing and clause alignment.',
    url: 'https://www.mytoolmate.top/sql-formatter',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
