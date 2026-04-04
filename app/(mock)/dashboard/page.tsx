import Link from 'next/link';
import { DonutChartCard, HeroPanel, KpiCard, ProcessFlow, SectionCard, SiteBalanceChart } from '@/components/mock/ui';
import { dashboardKpis, fillRateChart, processSteps, siteBalances, submissionChart } from '@/lib/mock/shift-data';

export default function DashboardPage() {
  return (
    <div className="page-stack">
      <HeroPanel title="シフト作成の進捗とリスクを一目で確認" description="提出状況・充足率・現場ごとの不足傾向を簡易可視化しています。" />

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

      <SectionCard title="プロセスフロー">
        <ProcessFlow steps={processSteps} />
      </SectionCard>

      <section className="chart-grid">
        <DonutChartCard title="希望提出率" value={submissionChart.submitted} total={submissionChart.submitted + submissionChart.pending} labels={['提出済み', '未提出']} />
        <DonutChartCard title="シフト充足率" value={fillRateChart.filled} total={fillRateChart.filled + fillRateChart.shortage} labels={['充足', '不足']} />
        <SiteBalanceChart data={siteBalances} />
      </section>
    </div>
  );
}
