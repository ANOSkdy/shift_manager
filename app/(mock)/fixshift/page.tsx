import Link from 'next/link';
import { HeroPanel, SectionCard, StatusTag } from '@/components/mock/ui';

export default function FixShiftPage() {
  return (
    <div className="page-stack">
      <HeroPanel
        title="配信完了"
        description="調整済みのシフトを各メンバーへ配信しました。"
      />

      <SectionCard title="完了ステータス" action={<StatusTag tone="success">配信済み</StatusTag>}>
        <p style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.6rem' }}>配信が完了しました。</p>
        <p className="muted">凍結済みシフトはダッシュボードでいつでも確認できます。内容の最終確認に進んでください。</p>

        <div className="status-row" style={{ marginTop: '1rem' }}>
          <Link href="/dashboard" className="primary-button">
            ダッシュボードへ進む
          </Link>
          <Link href="/adjustment" className="chip">
            調整画面へ戻る
          </Link>
        </div>
      </SectionCard>
    </div>
  );
}
