"use client";

import { useState } from "react";
import { SectionCard } from "@/components/ui/section-card";
import { StatusTag } from "@/components/ui/status-tag";
import { autoScheduleSlots, replacementCandidates } from "@/lib/mock/shift-data";

export default function AdjustmentPage() {
  const [localAssignments, setLocalAssignments] = useState(autoScheduleSlots);

  const applyCandidate = (slotId: string, candidate: string) => {
    setLocalAssignments((prev) =>
      prev.map((slot) => {
        if (slot.id !== slotId) return slot;
        if (slot.assigned.includes(candidate)) return slot;
        return { ...slot, assigned: [...slot.assigned, candidate] };
      }),
    );
  };

  return (
    <div className="pageStack">
      <SectionCard title="シフト調整" subtitle="候補を適用して不足を埋めるモック操作です。">
        <div className="adjustGrid">
          {localAssignments.map((slot) => {
            const candidates = replacementCandidates[slot.id] ?? [];
            const shortage = slot.assigned.length < slot.required;

            return (
              <article key={slot.id} className="adjustCard">
                <div className="adjustHeader">
                  <h3>
                    {slot.day} / {slot.site} / {slot.time}
                  </h3>
                  <StatusTag label={shortage ? "不足" : "充足"} tone={shortage ? "danger" : "success"} />
                </div>
                <p>現在: {slot.assigned.join(" / ")}</p>
                <div className="chipRow">
                  {candidates.map((candidate) => (
                    <button
                      key={candidate}
                      onClick={() => applyCandidate(slot.id, candidate)}
                      className="chipButton"
                      disabled={slot.assigned.includes(candidate)}
                    >
                      {candidate}
                    </button>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}
