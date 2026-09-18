import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — MyToolMate',
  description: 'MyToolMate privacy policy — how we handle your data. Spoiler: all tools run in your browser, we collect almost nothing.',
  openGraph: {
    title: 'Privacy Policy — MyToolMate',
    description: 'MyToolMate privacy policy — how we handle your data. Spoiler: all tools run in your browser, we collect almost nothing.',
    url: 'https://www.mytoolmate.top/privacy-policy',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
