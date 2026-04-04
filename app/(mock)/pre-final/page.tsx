import Link from 'next/link';
import { AlertPanel, SectionCard, StatusTag } from '@/components/mock/ui';
import { preFinalChecklist, warnings } from '@/lib/mock/shift-data';

export default function PreFinalPage() {
  return (
    <div className="page-stack">
      <AlertPanel title="最終チェックサマリー">
        <div className="status-row">
          <StatusTag tone="danger">不足: 2枠</StatusTag>
          <StatusTag tone="warning">希望未反映: 1件</StatusTag>
          <StatusTag tone="insight">調整メモ: 3件</StatusTag>
        </div>
        <ul className="bullet-list">
          {warnings.map((warning) => (
            <li key={warning.id}>{warning.message}</li>
          ))}
        </ul>
      </AlertPanel>

      <SectionCard
        title="確定前チェック"
        action={
          <Link href="/finalized" className="primary-button">
            確定して配布
          </Link>
        }
      >
        <ul className="checklist">
          {preFinalChecklist.map((item) => (
            <li key={item}>
              <input type="checkbox" aria-label={item} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}
