import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GraphQL Beautifier — MyToolMate',
  description: 'Format and prettify GraphQL queries, mutations and schema definitions.',
  openGraph: {
    title: 'GraphQL Beautifier — MyToolMate',
    description: 'Format and prettify GraphQL queries, mutations and schema definitions.',
    url: 'https://www.mytoolmate.top/graphql-beautifier',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
