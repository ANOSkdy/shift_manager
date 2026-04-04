'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AlertPanel, SectionCard, StatusTag } from '@/components/mock/ui';
import { preFinalChecklist, warnings } from '@/lib/mock/shift-data';

export default function PreFinalPage() {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const checkedCount = useMemo(() => Object.values(checks).filter(Boolean).length, [checks]);
  const isReady = checkedCount === preFinalChecklist.length;

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
            <li key={warning.id}>
              <StatusTag tone={warning.tone}>{warning.message}</StatusTag>
            </li>
          ))}
        </ul>
      </AlertPanel>

      <SectionCard
        title="確定前チェック"
        action={
          isReady ? (
            <Link href="/finalized" className="primary-button">
              確定して配布
            </Link>
          ) : (
            <button type="button" className="primary-button" disabled aria-disabled="true" title="チェック完了で有効化されます">
              確定して配布
            </button>
          )
        }
      >
        <p className="helper-text">チェック完了で「確定して配布」が有効になります。（モックのため保存はされません）</p>
        <StatusTag tone={isReady ? 'success' : 'warning'}>
          チェック完了 {checkedCount} / {preFinalChecklist.length}
        </StatusTag>
        <ul className="checklist">
          {preFinalChecklist.map((item) => (
            <li key={item}>
              <input
                type="checkbox"
                aria-label={item}
                checked={Boolean(checks[item])}
                onChange={(event) => setChecks((prev) => ({ ...prev, [item]: event.target.checked }))}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}
