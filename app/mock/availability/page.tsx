"use client";

import { useMemo, useState } from "react";
import { SectionCard } from "@/components/ui/section-card";
import { StatusTag } from "@/components/ui/status-tag";
import { availabilityRecords } from "@/lib/mock/shift-data";

export default function AvailabilityPage() {
  const [filter, setFilter] = useState<"all" | "submitted" | "pending">("all");

  const filtered = useMemo(() => {
    if (filter === "submitted") return availabilityRecords.filter((record) => record.status === "提出済み");
    if (filter === "pending") return availabilityRecords.filter((record) => record.status === "未提出");
    return availabilityRecords;
  }, [filter]);

  return (
    <div className="pageStack">
      <SectionCard title="希望シフト一覧" subtitle="提出状況と重複リスクを確認します。">
        <div className="filterRow" role="tablist" aria-label="提出状況フィルタ">
          <button onClick={() => setFilter("all")} className={filter === "all" ? "filterButton active" : "filterButton"}>
            すべて
          </button>
          <button
            onClick={() => setFilter("submitted")}
            className={filter === "submitted" ? "filterButton active" : "filterButton"}
          >
            提出済み
          </button>
          <button onClick={() => setFilter("pending")} className={filter === "pending" ? "filterButton active" : "filterButton"}>
            未提出
          </button>
        </div>

        <div className="tableWrapper">
          <table className="table">
            <thead>
              <tr>
                <th>スタッフ</th>
                <th>希望日</th>
                <th>時間</th>
                <th>希望拠点</th>
                <th>重複</th>
                <th>提出</th>
                <th>備考</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((record) => (
                <tr key={record.id}>
                  <td>{record.staffName}</td>
                  <td>{record.day}</td>
                  <td>{record.time}</td>
                  <td>{record.site}</td>
                  <td>
                    <StatusTag label={record.overlap ? "あり" : "なし"} tone={record.overlap ? "danger" : "success"} />
                  </td>
                  <td>
                    <StatusTag label={record.status} tone={record.status === "提出済み" ? "success" : "warning"} />
                  </td>
                  <td>{record.notes || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
