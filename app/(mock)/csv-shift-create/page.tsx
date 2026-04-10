import Link from 'next/link';
import { HeroPanel, SectionCard, StatusTag } from '@/components/mock/ui';

const generatedSummary = [
  { label: '取込スタッフ', value: '15名' },
  { label: '作成対象枠', value: '14枠' },
  { label: '自動割当率', value: '86%' }
];

export default function CsvShiftCreatePage() {
  return (
    <div className="page-stack">
      <HeroPanel title="読み込んだCSVを解析してシフト作成" description="アップロード済みCSVの解析結果をもとに、ベースシフト案を生成した想定ページです。" />

      <SectionCard title="解析結果サマリー" action={<StatusTag tone="success">作成準備完了</StatusTag>}>
        <ul className="summary-grid">
          {generatedSummary.map((item) => (
            <li key={item.label} className="summary-item">
              <p className="muted">{item.label}</p>
              <p className="summary-item__value">{item.value}</p>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="次のアクション">
        <p className="helper-text">必要があれば調整画面で不足枠を補完し、確定前チェックに進んでください。</p>
        <div className="status-row">
          <Link href="/adjustment" className="primary-button">
            調整画面へ
          </Link>
          <Link href="/pre-final" className="chip">
            確定前チェックへ
          </Link>
        </div>
      </SectionCard>
    </div>
  );
}
