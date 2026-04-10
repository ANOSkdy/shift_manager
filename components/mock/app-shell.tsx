'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { targetWeek } from '@/lib/mock/shift-data';

const flowLinks = [
  { href: '/upload', label: 'アップロード' },
  { href: '/autoview', label: '自動調整ビュー' },
  { href: '/adjustment', label: '調整' }
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="app-shell">
      <div className="content-area">
        <header className="top-header">
          <div className="top-header__title">
            <p className="sidebar__eyebrow">対象週</p>
            <strong>{targetWeek}</strong>
          </div>
          <nav aria-label="主要画面" className="top-header__nav">
            {flowLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link key={item.href} className={active ? 'chip chip--active' : 'chip'} href={item.href}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
