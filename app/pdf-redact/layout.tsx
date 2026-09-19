import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Redact PDF — MyToolMate',
  description: 'Cover sensitive content with black boxes — add redaction areas by page coordinates.',
  openGraph: {
    title: 'Redact PDF — MyToolMate',
    description: 'Cover sensitive content with black boxes — add redaction areas by page coordinates.',
    url: 'https://www.mytoolmate.top/pdf-redact',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
