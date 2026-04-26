'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { SectionCard, StatusTag } from '@/components/mock/ui';
import { autoShiftRows, provisionalReplacementCandidates, provisionalSiteCandidates, type AllocationStatus } from '@/lib/mock/autoview-data';
import { candidateReasonRows, ruleCheckMockRows } from '@/lib/mock/tas-master-data';

type ProvisionalEdit = {
  employeeName: string;
  assignedSite: string;
  allocationStatus: AllocationStatus;
};

const statusToneMap: Record<AllocationStatus, 'success' | 'primary' | 'warning'> = {
  希望: 'success',
  調整中: 'primary',
  要調整: 'warning'
};

function toneForRuleResult(result: string) {
  if (result === 'OK') return 'success' as const;
  if (result === '警告') return 'warning' as const;
  if (result === 'NG' || result === '要調整') return 'danger' as const;
  return 'primary' as const;
}

export default function AdjustmentPage() {
  const router = useRouter();
  const provisionalRows = useMemo(() => autoShiftRows.filter((row) => row.allocationStatus === '調整中'), []);
  const ruleSummary = useMemo(
    () => ({
      OK: ruleCheckMockRows.filter((row) => row.result === 'OK').length,
      警告: ruleCheckMockRows.filter((row) => row.result === '警告').length,
      NG: ruleCheckMockRows.filter((row) => row.result === 'NG').length,
      管理者確認: ruleCheckMockRows.filter((row) => row.result === '管理者確認').length
    }),
    []
  );
  const [isSending, setIsSending] = useState(false);

  const [edits, setEdits] = useState<Record<string, ProvisionalEdit>>(
    Object.fromEntries(
      provisionalRows.map((row) => [
        row.id,
        {
          employeeName: row.employeeName,
          assignedSite: row.assignedSite,
          allocationStatus: row.allocationStatus
        }
      ])
    )
  );

  const changedCount = provisionalRows.filter((row) => {
    const edit = edits[row.id];
    if (!edit) return false;
    return edit.employeeName !== row.employeeName || edit.assignedSite !== row.assignedSite || edit.allocationStatus !== row.allocationStatus;
  }).length;

  const handleSend = () => {
    if (isSending) return;
    setIsSending(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 3000);
  };

  return (
    <div className="page-stack">
      <SectionCard title="シフト調整">
        <p className="helper-text">編集テーブルを更新し、右側プレビューで確定前の状態を即時確認できます。</p>

        <div className="status-row">
          <StatusTag tone="primary">調整対象 {provisionalRows.length}件</StatusTag>
          <StatusTag tone={changedCount > 0 ? 'warning' : 'insight'}>変更あり {changedCount}件</StatusTag>
          <StatusTag tone="insight">データ種別: 自動調整結果</StatusTag>
        </div>

        <div className="adjustment-layout">
          <div className="adjustment-layout__editor">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>対象シフト</th>
                    <th>担当者</th>
                    <th>配置先</th>
                    <th>状態</th>
                  </tr>
                </thead>
                <tbody>
                  {provisionalRows.map((row) => {
                    const edit = edits[row.id];
                    const replacementCandidates = [row.employeeName, ...(provisionalReplacementCandidates[row.id] ?? [])];
                    const siteCandidates = [row.assignedSite, ...(provisionalSiteCandidates[row.id] ?? [])];

                    return (
                      <tr key={row.id}>
                        <td>
                          <p className="adjustment-target__main">
                            {row.workDate}（{row.weekday}） {row.shiftType}
                          </p>
                          <p className="adjustment-target__sub">
                            {row.customerName} / {row.projectName}
                          </p>
                          <p className="adjustment-target__sub">
                            {row.startTime}-{row.endTime} / {row.taskType} / {row.roleName}
                          </p>
                          <p className="muted">{row.assignedSite}</p>
                        </td>
                        <td>
                          <select
                            value={edit.employeeName}
                            onChange={(event) =>
                              setEdits((prev) => ({
                                ...prev,
                                [row.id]: { ...prev[row.id], employeeName: event.target.value }
                              }))
                            }
                          >
                            {[...new Set(replacementCandidates)].map((name) => (
                              <option key={name} value={name}>
                                {name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select
                            value={edit.assignedSite}
                            onChange={(event) =>
                              setEdits((prev) => ({
                                ...prev,
                                [row.id]: { ...prev[row.id], assignedSite: event.target.value }
                              }))
                            }
                          >
                            {[...new Set(siteCandidates)].map((site) => (
                              <option key={site} value={site}>
                                {site}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select
                            value={edit.allocationStatus}
                            onChange={(event) =>
                              setEdits((prev) => ({
                                ...prev,
                                [row.id]: { ...prev[row.id], allocationStatus: event.target.value as AllocationStatus }
                              }))
                            }
                          >
                            <option value="調整中">調整中</option>
                            <option value="希望">希望</option>
                            <option value="要調整">要調整</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="adjustment-layout__preview" aria-label="更新プレビュー">
            <h3>更新プレビュー</h3>
            <p className="muted">調整後ステータス</p>
            <div className="adjustment-preview-list">
              {provisionalRows.map((row) => {
                const edit = edits[row.id];
                return (
                  <article key={row.id} className="adjustment-preview-item">
                    <p className="adjustment-target__main">
                      {row.workDate} {row.shiftType} / {row.roleName}
                    </p>
                    <p className="adjustment-target__sub">{edit.employeeName} @ {edit.assignedSite}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.25rem' }}>
                      {row.appliedRules.slice(0, 2).map((rule) => (
                        <span key={`${row.id}-${rule}`} className="chip">
                          {rule}
                        </span>
                      ))}
                    </div>
                    <p className="muted">{row.adjustmentReason}</p>
                    <StatusTag tone={statusToneMap[edit.allocationStatus]}>{edit.allocationStatus}</StatusTag>
                    <StatusTag tone={toneForRuleResult(row.ruleResult)}>{row.ruleResult}</StatusTag>
                  </article>
                );
              })}
            </div>
          </aside>
        </div>
        {isSending ? (
          <div className="sending-panel" role="status" aria-live="polite">
            <div className="sending-panel__spinner" aria-hidden="true" />
            <div>
              <p className="sending-panel__title">配信中...</p>
              <p className="sending-panel__text">調整済みシフトを各現場へ反映しています。完了後にダッシュボードへ移動します。</p>
            </div>
          </div>
        ) : null}
        <div className="status-row" style={{ marginTop: '1rem' }}>
          <button type="button" className="primary-button" onClick={handleSend} disabled={isSending}>
            {isSending ? '配信中...' : '配信する'}
          </button>
          <Link href="/autoview" className="chip" aria-disabled={isSending} tabIndex={isSending ? -1 : undefined} onClick={(event) => {
            if (isSending) event.preventDefault();
          }}>
            自動調整結果を確認
          </Link>
        </div>

      </SectionCard>

      <SectionCard title="ルールチェック結果">
        <div className="status-row">
          <StatusTag tone="success">OK {ruleSummary.OK}件</StatusTag>
          <StatusTag tone="warning">警告 {ruleSummary.警告}件</StatusTag>
          <StatusTag tone="danger">NG {ruleSummary.NG}件</StatusTag>
          <StatusTag tone="primary">管理者確認 {ruleSummary.管理者確認}件</StatusTag>
        </div>
        <p className="helper-text">現時点ではモック表示です。実装時は担当者・現場変更に応じて判定を再計算します。</p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>判定</th>
                <th>チェック内容</th>
                <th>関連ルール</th>
              </tr>
            </thead>
            <tbody>
              {ruleCheckMockRows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <StatusTag tone={toneForRuleResult(row.result)}>{row.result}</StatusTag>
                  </td>
                  <td>{row.message}</td>
                  <td>{row.relatedRule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard title="候補者ごとの選定理由">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>候補者</th>
                <th>判定</th>
                <th>理由</th>
                <th>タグ</th>
              </tr>
            </thead>
            <tbody>
              {candidateReasonRows.map((row) => (
                <tr key={row.id}>
                  <td>{row.staffName}</td>
                  <td>
                    <StatusTag tone={toneForRuleResult(row.result)}>{row.result}</StatusTag>
                  </td>
                  <td>{row.reason}</td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                      {row.tags.map((tag) => (
                        <span key={`${row.id}-${tag}`} className="chip">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
