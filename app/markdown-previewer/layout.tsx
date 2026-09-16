import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Markdown Previewer — MyToolMate',
  description: 'Live Markdown editor with instant HTML preview and GitHub-flavored markdown support.',
  openGraph: {
    title: 'Markdown Previewer — MyToolMate',
    description: 'Live Markdown editor with instant HTML preview and GitHub-flavored markdown support.',
    url: 'https://www.mytoolmate.top/markdown-previewer',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
