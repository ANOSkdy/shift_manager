import { KpiCard } from "@/components/ui/kpi-card";
import { SectionCard } from "@/components/ui/section-card";
import { StatusTag } from "@/components/ui/status-tag";
import { finalizedSummary, targetWeek } from "@/lib/mock/shift-data";

export default function FinalizedPage() {
  return (
    <div className="pageStack">
      <SectionCard title="確定・配信完了" subtitle="配信ステータスの確認">
        <div className="kpiGrid">
          <KpiCard label="対象週" value={targetWeek} tone="primary" />
          <KpiCard label="対象スタッフ" value={`${finalizedSummary.affectedStaffCount}名`} tone="success" />
          <KpiCard label="配信時刻" value={finalizedSummary.deliveredAt} tone="insight" />
          <KpiCard label="残警告" value={`${finalizedSummary.remainingWarnings}件`} tone="warning" />
        </div>
        <div className="finalRow">
          <StatusTag label="配信済み" tone="success" />
          <p>シフト {finalizedSummary.totalSlots} 枠を配信しました。</p>
        </div>
      </SectionCard>
    </div>
  );
}
