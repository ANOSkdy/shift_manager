import { ReactNode } from "react";
import { StatusTag } from "@/components/ui/status-tag";

export function KpiCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: ReactNode;
  tone: "primary" | "success" | "warning" | "danger" | "insight";
}) {
  return (
    <article className="kpiCard">
      <StatusTag label={label} tone={tone} />
      <p className="kpiValue">{value}</p>
    </article>
  );
}
