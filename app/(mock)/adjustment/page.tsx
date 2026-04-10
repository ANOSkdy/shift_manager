'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { SectionCard, StatusTag } from '@/components/mock/ui';
import { autoShiftRows, provisionalReplacementCandidates, provisionalSiteCandidates, type AllocationStatus } from '@/lib/mock/autoview-data';

type ProvisionalEdit = {
  employeeName: string;
  assignedSite: string;
  allocationStatus: AllocationStatus;
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
        title="シフト調整（仮割当の確定）"
        action={
          <Link href="/pre-final" className="primary-button">
            確定前チェックへ
          </Link>
        }
      >
        <p className="helper-text">autoviewで表示された仮割当のみを対象に、担当者・配置先・状態を調整できます。</p>
        <div className="status-row">
          <StatusTag tone="primary">仮割当対象 {provisionalRows.length}件</StatusTag>
          <StatusTag tone={changedCount > 0 ? 'warning' : 'insight'}>編集済み {changedCount}件</StatusTag>
        </div>

        <div className="adjust-grid">
          {provisionalRows.map((row) => {
            const edit = edits[row.id];
            const replacementCandidates = [row.employeeName, ...(provisionalReplacementCandidates[row.id] ?? [])];
            const siteCandidates = [row.assignedSite, ...(provisionalSiteCandidates[row.id] ?? [])];

            return (
              <article key={row.id} className="adjust-card">
                <h3>
                  {row.workDate}（{row.weekday}）/ {row.shiftType} / {row.startTime}-{row.endTime}
                </h3>
                <p>
                  現在: {row.employeeName} / {row.assignedSite} / {row.taskType}
                </p>

                <label>
                  担当者を調整
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
                </label>

                <label>
                  配置先を調整
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
                </label>

                <label>
                  割当状態
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
                </label>

                <StatusTag tone={edit.allocationStatus === '希望' ? 'success' : edit.allocationStatus === '仮割当' ? 'primary' : 'warning'}>
                  更新後: {edit.employeeName} / {edit.assignedSite} / {edit.allocationStatus}
                </StatusTag>
              </article>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}
