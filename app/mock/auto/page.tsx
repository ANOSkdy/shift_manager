import { AlertPanel } from "@/components/ui/alert-panel";
import { ScheduleTable } from "@/components/ui/schedule-table";
import { SectionCard } from "@/components/ui/section-card";
import { autoScheduleSlots, warnings } from "@/lib/mock/shift-data";

export default function AutoSchedulePage() {
  return (
    <div className="pageStack">
      <SectionCard title="自動作成結果" subtitle="曜日・拠点ごとのベース案です。">
        <ScheduleTable slots={autoScheduleSlots} />
      </SectionCard>
      <SectionCard title="注意事項" subtitle="不足や希望未反映を表示します。">
        <AlertPanel items={warnings} />
      </SectionCard>
    </div>
  );
}
