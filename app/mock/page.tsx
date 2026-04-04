import Link from "next/link";
import { KpiCard } from "@/components/ui/kpi-card";
import { SectionCard } from "@/components/ui/section-card";
import { warnings, availabilityRecords, targetWeek } from "@/lib/mock/shift-data";

export default function DashboardPage() {
  const submitted = availabilityRecords.filter((record) => record.status === "提出済み").length;
  const unsubmitted = availabilityRecords.length - submitted;

  return (
    <div className="pageStack">
      <SectionCard title="シフト作成ダッシュボード" subtitle={`対象週: ${targetWeek}`}>
        <div className="kpiGrid">
          <KpiCard label="進捗" value="希望収集中" tone="primary" />
          <KpiCard label="提出済み" value={`${submitted}名`} tone="success" />
          <KpiCard label="未提出" value={`${unsubmitted}名`} tone="warning" />
          <KpiCard label="不足/競合" value={`${warnings.length}件`} tone="danger" />
        </div>
        <div className="ctaRow">
          <Link href="/mock/availability" className="primaryButton">
            希望確認を開始
          </Link>
        </div>
      </SectionCard>
    </div>
  );
}
