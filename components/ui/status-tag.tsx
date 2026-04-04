import { ReactNode } from "react";

type StatusTone = "primary" | "success" | "warning" | "danger" | "insight";

const toneMap: Record<StatusTone, string> = {
  primary: "var(--primary)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
  insight: "var(--insight)",
};

export function StatusTag({
  label,
  tone,
}: {
  label: ReactNode;
  tone: StatusTone;
}) {
  return (
    <span
      style={{ backgroundColor: toneMap[tone] }}
      className="statusTag"
      aria-label={`status-${tone}`}
    >
      {label}
    </span>
  );
}
