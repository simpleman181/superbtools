import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Picker — MyToolMate',
  description: 'Pick colors and convert between HEX, RGB, HSL and HSV color formats.',
  openGraph: {
    title: 'Color Picker — MyToolMate',
    description: 'Pick colors and convert between HEX, RGB, HSL and HSV color formats.',
    url: 'https://www.mytoolmate.top/color-picker',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
