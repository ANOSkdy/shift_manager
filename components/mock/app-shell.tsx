'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import { targetWeek } from '@/lib/mock/shift-data';

const flowLinks = [
  { href: '/upload', label: 'アップロード' },
  { href: '/autoview', label: '自動調整結果' },
  { href: '/adjustment', label: 'シフト調整' },
  { href: '/dashboard', label: 'ダッシュボード' }
] as const;

const managementLinks = [
  { href: '/staff', label: 'スタッフ管理' },
  { href: '/sites', label: '現場管理' },
  { href: '/rules', label: '配置ルール' },
  { href: '/pair-rules', label: '配置配慮' },
  { href: '/duties', label: '日次当番' }
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="app-shell">
      <div className="content-area">
        <header className="top-header">
          <div className="top-header__title">
            <p className="sidebar__eyebrow">対象週</p>
            <strong>{targetWeek}</strong>
          </div>
          <div className="top-header__menu">
            <button
              type="button"
              className="menu-button"
              aria-expanded={menuOpen}
              aria-controls="primary-nav"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span aria-hidden="true">☰</span>
              メニュー
            </button>
            <nav id="primary-nav" aria-label="主要画面" className={menuOpen ? 'top-header__nav top-header__nav--open' : 'top-header__nav'}>
              <div className="top-header__nav-group">
                <p className="top-header__nav-label">シフト作成</p>
                <div className="top-header__nav-links">
                  {flowLinks.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link key={item.href} className={active ? 'chip chip--active' : 'chip'} href={item.href}>
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="top-header__nav-group">
                <p className="top-header__nav-label">管理設定</p>
                <div className="top-header__nav-links">
                  {managementLinks.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link key={item.href} className={active ? 'chip chip--active' : 'chip'} href={item.href}>
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
