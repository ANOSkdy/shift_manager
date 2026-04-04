'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SectionCard, StatusTag } from '@/components/mock/ui';
import { replacementCandidates, scheduleSlots } from '@/lib/mock/shift-data';

export default function AdjustmentPage() {
  const [selected, setSelected] = useState<Record<string, string>>({});

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
        <div className="adjust-grid">
          {scheduleSlots.map((slot) => {
            const lack = slot.assigned.length < slot.required;
            const options = replacementCandidates[slot.id] ?? [];
            return (
              <article key={slot.id} className="adjust-card">
                <h3>
                  {slot.day} / {slot.site} / {slot.time}
                </h3>
                <p>現在: {slot.assigned.join(' / ')}</p>
                {lack ? <StatusTag tone="danger">不足あり</StatusTag> : <StatusTag tone="success">充足</StatusTag>}
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
