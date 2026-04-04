import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'シフト作成モック PR1',
  description: '固定データで業務導線を確認するシフト作成モック'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
