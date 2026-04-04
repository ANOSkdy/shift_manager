import { WarningItem } from "@/lib/mock/shift-data";
import { StatusTag } from "@/components/ui/status-tag";

function toneFromType(type: WarningItem["type"]) {
  if (type === "不足") return "danger" as const;
  if (type === "競合") return "warning" as const;
  return "insight" as const;
}

export function AlertPanel({ items }: { items: WarningItem[] }) {
  return (
    <div className="alertPanel">
      {items.map((item) => (
        <div key={item.id} className="alertItem">
          <StatusTag label={item.type} tone={toneFromType(item.type)} />
          <p>{item.message}</p>
        </div>
      ))}
    </div>
  );
}
