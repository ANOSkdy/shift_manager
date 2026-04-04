'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SectionCard, StatusTag } from '@/components/mock/ui';
import { replacementCandidates, scheduleSlots } from '@/lib/mock/shift-data';

export default function AdjustmentPage() {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const selectedCount = Object.values(selected).filter(Boolean).length;
  const shortageCount = scheduleSlots.filter((slot) => slot.assigned.length < slot.required).length;

  return (
    <div className="page-stack">
      <SectionCard
        title="シフト調整"
        action={
          <Link href="/pre-final" className="primary-button">
            確定前チェックへ
          </Link>
        }
      >
        <p className="helper-text">不足枠に対して候補を選択すると、調整対象の見落としを減らせます。</p>
        <div className="status-row">
          <StatusTag tone="danger">不足枠 {shortageCount}</StatusTag>
          <StatusTag tone="insight">候補選択済み {selectedCount}</StatusTag>
        </div>
        <div className="adjust-grid">
          {scheduleSlots.map((slot) => {
            const lack = slot.assigned.length < slot.required;
            const options = replacementCandidates[slot.id] ?? [];
            const selectedName = selected[slot.id];
            return (
              <article key={slot.id} className="adjust-card">
                <h3>
                  {slot.day} / {slot.site} / {slot.time}
                </h3>
                <p>現在: {slot.assigned.join(' / ')}</p>
                {lack ? <StatusTag tone="danger">不足あり</StatusTag> : <StatusTag tone="success">充足</StatusTag>}
                {selectedName ? <StatusTag tone="primary">候補: {selectedName}</StatusTag> : null}
                {options.length > 0 ? (
                  <label>
                    代替候補
                    <select
                      value={selected[slot.id] ?? ''}
                      onChange={(event) => setSelected((prev) => ({ ...prev, [slot.id]: event.target.value }))}
                    >
                      <option value="">選択してください</option>
                      {options.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : (
                  <p className="muted">候補なし</p>
                )}
              </article>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}
