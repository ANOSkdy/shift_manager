import { SectionCard, StatusTag } from '@/components/mock/ui';
import { finalizedSummary, targetWeek } from '@/lib/mock/shift-data';

export default function FinalizedPage() {
  return (
    <div className="page-stack">
      <SectionCard title="配布完了">
        <div className="summary-grid">
          <p>
            対象週: <strong>{targetWeek}</strong>
          </p>
          <p>
            影響スタッフ数: <strong>{finalizedSummary.affectedStaff}名</strong>
          </p>
          <p>
            配布チャネル: <strong>{finalizedSummary.deliveredChannels.join(' / ')}</strong>
          </p>
          <p>
            配布時刻: <strong>{finalizedSummary.deliveredAt}</strong>
          </p>
        </div>
        <StatusTag tone="success">{finalizedSummary.status}</StatusTag>
      </SectionCard>
    </div>
  );
}
