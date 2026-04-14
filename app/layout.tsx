import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'シフト管理システム',
  description: 'シフト作成から確認・確定までを一元管理するシフト管理システム'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
