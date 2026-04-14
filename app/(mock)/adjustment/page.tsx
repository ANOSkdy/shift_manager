'use client';

import { useMemo, useState } from 'react';
import { SectionCard, StatusTag } from '@/components/mock/ui';
import { autoShiftRows, provisionalReplacementCandidates, provisionalSiteCandidates, type AllocationStatus } from '@/lib/mock/autoview-data';

type ProvisionalEdit = {
  employeeName: string;
  assignedSite: string;
  allocationStatus: AllocationStatus;
};

const statusToneMap: Record<AllocationStatus, 'success' | 'primary' | 'warning'> = {
  希望: 'success',
  仮割当: 'primary',
  要調整: 'warning'
};

export default function AdjustmentPage() {
  const provisionalRows = useMemo(() => autoShiftRows.filter((row) => row.allocationStatus === '仮割当'), []);

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

  return (
    <div className="page-stack">
      <SectionCard
        title="シフト調整（autoview 仮割当エディタ）"
        action={
          <a href="https://shift-manager-beige-six.vercel.app/fixshift" className="primary-button">
            配信
          </a>
        }
      >
        <p className="helper-text">編集テーブルで仮割当を更新し、右側プレビューで確定前の状態を即時確認できます。</p>

        <div className="status-row">
          <StatusTag tone="primary">仮割当対象 {provisionalRows.length}件</StatusTag>
          <StatusTag tone={changedCount > 0 ? 'warning' : 'insight'}>変更あり {changedCount}件</StatusTag>
          <StatusTag tone="insight">データ元: autoview</StatusTag>
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
                            {row.startTime}-{row.endTime} / {row.taskType}
                          </p>
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
                            <option value="仮割当">仮割当</option>
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
            <p className="muted">仮割当の更新後ステータス</p>
            <div className="adjustment-preview-list">
              {provisionalRows.map((row) => {
                const edit = edits[row.id];
                return (
                  <article key={row.id} className="adjustment-preview-item">
                    <p className="adjustment-target__main">
                      {row.workDate} {row.shiftType} / {row.taskType}
                    </p>
                    <p className="adjustment-target__sub">{edit.employeeName} @ {edit.assignedSite}</p>
                    <StatusTag tone={statusToneMap[edit.allocationStatus]}>{edit.allocationStatus}</StatusTag>
                  </article>
                );
              })}
            </div>
          </aside>
        </div>
        <div className="status-row" style={{ marginTop: '1rem' }}>
          <Link href="/fixshift" className="primary-button">
            配信する
          </Link>
          <Link href="/autoview" className="chip">
            自動調整ビューを確認
          </Link>
        </div>

      </SectionCard>
    </div>
  );
}
