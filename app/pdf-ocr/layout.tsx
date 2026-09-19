import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF OCR — MyToolMate',
  description: 'Extract text from scanned PDFs using Tesseract OCR — supports 10 languages — in-browser.',
  openGraph: {
    title: 'PDF OCR — MyToolMate',
    description: 'Extract text from scanned PDFs using Tesseract OCR — supports 10 languages — in-browser.',
    url: 'https://www.mytoolmate.top/pdf-ocr',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
