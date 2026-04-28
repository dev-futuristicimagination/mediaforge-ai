import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MediaForge AI — AIがあなたのメディアを自動運営する',
  description: 'Gemini AIを使って記事生成・SEO最適化・自動公開を全自動化。月額固定で何記事でも。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="noise">{children}</body>
    </html>
  );
}
