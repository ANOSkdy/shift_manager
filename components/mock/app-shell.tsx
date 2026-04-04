'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { navItems, targetWeek } from '@/lib/mock/shift-data';

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="sidebar__eyebrow">Shift Mock PR3</p>
          <h1>シフト作成モック</h1>
        </div>
        <nav aria-label="シフト作成フロー">
          <ul className="sidebar__nav">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link className={active ? 'active' : ''} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <div className="content-area">
        <header className="top-header">
          <div>
            <p className="sidebar__eyebrow">対象週</p>
            <strong>{targetWeek}</strong>
          </div>
          <Link href="/availability" className="primary-button">
            希望確認へ
          </Link>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
