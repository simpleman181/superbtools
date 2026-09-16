import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Code Unpacker — MyToolMate',
  description: 'Unpack and deobfuscate minified JavaScript — decode eval and packer output.',
  openGraph: {
    title: 'Code Unpacker — MyToolMate',
    description: 'Unpack and deobfuscate minified JavaScript — decode eval and packer output.',
    url: 'https://www.mytoolmate.top/code-unpacker',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
