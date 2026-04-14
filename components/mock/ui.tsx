import type { ReactNode } from 'react';
import type { ProcessStep, SiteBalance, StatusTone } from '@/lib/mock/shift-data';

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

export function ProcessFlow({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="process-flow" aria-label="シフト作成プロセス">
      {steps.map((step) => (
        <li key={step.id} className={`process-step process-step--${step.status}`}>
          <span className="process-step__dot" aria-hidden="true" />
          <div>
            <p className="process-step__label">{step.label}</p>
            <p className="process-step__detail">{step.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function DonutChartCard({ title, value, total, labels }: { title: string; value: number; total: number; labels: [string, string] }) {
  const degree = Math.round((value / total) * 360);
  const percent = Math.round((value / total) * 100);
  return (
    <article className="chart-card">
      <p className="chart-card__title">{title}</p>
      <div className="donut-wrap">
        <div className="donut" style={{ background: `conic-gradient(var(--primary) ${degree}deg, #e8eef4 ${degree}deg)` }}>
          <span>{percent}%</span>
        </div>
        <div className="chart-legend">
          <p>
            <span className="legend-dot legend-dot--primary" /> {labels[0]}: {value}
          </p>
          <p>
            <span className="legend-dot" /> {labels[1]}: {total - value}
          </p>
        </div>
      </div>
    </article>
  );
}

export function SiteBalanceChart({ data }: { data: SiteBalance[] }) {
  const max = Math.max(...data.map((item) => item.required));
  return (
    <article className="chart-card">
      <p className="chart-card__title">現場別 必要人数 / 配置人数</p>
      <div className="bar-list">
        {data.map((item) => (
          <div key={item.site} className="bar-item">
            <p>{item.site}</p>
            <div className="bar-track">
              <span className="bar-required" style={{ width: `${(item.required / max) * 100}%` }} />
              <span className="bar-assigned" style={{ width: `${(item.assigned / max) * 100}%` }} />
            </div>
            <p className="muted">
              {item.assigned}/{item.required}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
