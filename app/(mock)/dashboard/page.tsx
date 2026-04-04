import Link from 'next/link';
import { KpiCard, SectionCard } from '@/components/mock/ui';
import { dashboardKpis } from '@/lib/mock/shift-data';

export default function DashboardPage() {
  return (
    <div className="page-stack">
      <SectionCard
        title="進捗サマリー"
        action={
          <Link href="/auto-schedule" className="primary-button">
            自動作成結果を見る
          </Link>
        }
      >
        <div className="kpi-grid">
          {dashboardKpis.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
