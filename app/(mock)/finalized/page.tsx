import { HeroPanel, SectionCard, StatusTag } from '@/components/mock/ui';
import { finalizedSummary, targetWeek } from '@/lib/mock/shift-data';

export default function FinalizedPage() {
  return (
    <div className="page-stack">
      <HeroPanel title="確定したシフトを各チャネルへ配布しました" description="共有完了後のサマリーです。必要に応じて再配布メモを残せます。" />
      <SectionCard title="配布完了サマリー">
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
        <div className="status-row">
          <StatusTag tone="success">{finalizedSummary.status}</StatusTag>
          <StatusTag tone="insight">次週テンプレートへ反映済み</StatusTag>
        </div>
      </SectionCard>
    </div>
  );
}
