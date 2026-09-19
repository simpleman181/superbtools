import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF Form Filler — MyToolMate',
  description: 'Fill interactive AcroForm PDF fields — text inputs and checkboxes — 100% in-browser.',
  openGraph: {
    title: 'PDF Form Filler — MyToolMate',
    description: 'Fill interactive AcroForm PDF fields — text inputs and checkboxes — 100% in-browser.',
    url: 'https://www.mytoolmate.top/pdf-form',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
