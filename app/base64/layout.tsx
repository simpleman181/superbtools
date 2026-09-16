import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base64 Encoder/Decoder — MyToolMate',
  description: 'Encode and decode Base64 strings, files and images directly in your browser.',
  openGraph: {
    title: 'Base64 Encoder/Decoder — MyToolMate',
    description: 'Encode and decode Base64 strings, files and images directly in your browser.',
    url: 'https://www.mytoolmate.top/base64',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
