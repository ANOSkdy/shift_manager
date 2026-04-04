'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { navItems, targetWeek } from '@/lib/mock/shift-data';

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="app-shell">
      <aside className={menuOpen ? 'sidebar sidebar--open' : 'sidebar'}>
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
          <div className="top-header__title">
            <button
              type="button"
              className="menu-button"
              aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              ☰
            </button>
            <div>
              <p className="sidebar__eyebrow">対象週</p>
              <strong>{targetWeek}</strong>
            </div>
          </div>
          <Link href="/availability" className="primary-button">
            希望確認へ
          </Link>
        </header>
        <main>{children}</main>
      </div>

      {menuOpen ? <button type="button" className="menu-overlay" aria-label="メニューを閉じる" onClick={() => setMenuOpen(false)} /> : null}
    </div>
  );
}
