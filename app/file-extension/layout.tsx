import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'File Extension — MyToolMate',
  description: 'Look up any file extension to learn what opens it and its MIME type.',
  openGraph: {
    title: 'File Extension — MyToolMate',
    description: 'Look up any file extension to learn what opens it and its MIME type.',
    url: 'https://www.mytoolmate.top/file-extension',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
