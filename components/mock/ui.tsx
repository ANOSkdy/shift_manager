import type { ReactNode } from 'react';
import type { StatusTone } from '@/lib/mock/shift-data';

type CardProps = {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
};

export function SectionCard({ title, action, children }: CardProps) {
  return (
    <section className="section-card">
      {(title || action) && (
        <header className="section-card__header">
          {title ? <h2>{title}</h2> : <span />}
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

export function StatusTag({ tone = 'default', children }: { tone?: StatusTone; children: ReactNode }) {
  return <span className={`status-tag status-tag--${tone}`}>{children}</span>;
}

export function KpiCard({ label, value, note, tone = 'default' }: { label: string; value: string; note?: string; tone?: StatusTone }) {
  return (
    <article className="kpi-card">
      <p className="kpi-card__label">{label}</p>
      <p className={`kpi-card__value kpi-card__value--${tone}`}>{value}</p>
      {note ? <p className="kpi-card__note">{note}</p> : null}
    </article>
  );
}

export function AlertPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="alert-panel" aria-live="polite">
      <h2>{title}</h2>
      <div className="alert-panel__body">{children}</div>
    </section>
  );
}
