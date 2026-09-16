import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'YAML to JSON Converter — MyToolMate',
  description: 'Convert YAML to JSON and back — validate and reformat configuration files.',
  openGraph: {
    title: 'YAML to JSON Converter — MyToolMate',
    description: 'Convert YAML to JSON and back — validate and reformat configuration files.',
    url: 'https://www.mytoolmate.top/yaml-json',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
