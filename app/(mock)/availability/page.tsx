'use client';

import { useMemo, useState } from 'react';
import { SectionCard, StatusTag } from '@/components/mock/ui';
import { availabilityRows } from '@/lib/mock/shift-data';

const filters = ['すべて', '提出済み', '未提出'] as const;

export default function AvailabilityPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('すべて');

  const submittedCount = availabilityRows.filter((row) => row.submitted).length;
  const pendingCount = availabilityRows.length - submittedCount;

  const rows = useMemo(() => {
    if (filter === '提出済み') return availabilityRows.filter((row) => row.submitted);
    if (filter === '未提出') return availabilityRows.filter((row) => !row.submitted);
    return availabilityRows;
  }, [filter]);

  return (
    <div className="page-stack">
      <SectionCard title="希望シフト一覧">
        <p className="helper-text">提出状況と重複有無を確認し、未提出者へのリマインド対象をすぐ判断できます。</p>
        <div className="status-row">
          <StatusTag tone="success">提出済み {submittedCount}名</StatusTag>
          <StatusTag tone="warning">未提出 {pendingCount}名</StatusTag>
        </div>
        <div className="filter-row" role="tablist" aria-label="提出状況">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              className={filter === item ? 'chip chip--active' : 'chip'}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>スタッフ</th>
                <th>曜日</th>
                <th>時間</th>
                <th>希望店舗</th>
                <th>重複</th>
                <th>提出</th>
                <th>メモ</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="empty-cell">
                    条件に一致する希望はありません。フィルターを切り替えて確認してください。
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.staffName}</td>
                    <td>{row.day}</td>
                    <td>{row.time}</td>
                    <td>{row.site}</td>
                    <td>{row.overlap ? <StatusTag tone="warning">あり</StatusTag> : <StatusTag tone="success">なし</StatusTag>}</td>
                    <td>{row.submitted ? <StatusTag tone="success">提出済み</StatusTag> : <StatusTag tone="danger">未提出</StatusTag>}</td>
                    <td>{row.note}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
