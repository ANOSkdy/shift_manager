import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'シフト管理',
  description: '現場運用に対応したシフト管理システム'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
