import type { ReactNode } from "react";
import Link from "next/link";

const navItems = [
  { href: "/mock", label: "ダッシュボード" },
  { href: "/mock/availability", label: "希望一覧" },
  { href: "/mock/auto", label: "自動作成結果" },
  { href: "/mock/adjustment", label: "シフト調整" },
  { href: "/mock/pre-final", label: "確定前チェック" },
  { href: "/mock/finalized", label: "確定・配信" },
];

export default function MockLayout({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <aside className="sidebar">
        <h1>Shift Mock</h1>
        <nav>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="navItem">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="mainArea">
        <header className="topHeader">
          <p>提案用モック（固定データ）</p>
          <span>PR1</span>
        </header>
        {children}
      </main>
    </div>
  );
}
