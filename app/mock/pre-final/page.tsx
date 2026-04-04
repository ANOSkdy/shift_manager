import { SectionCard } from "@/components/ui/section-card";
import { StatusTag } from "@/components/ui/status-tag";
import { warnings, targetWeek } from "@/lib/mock/shift-data";

export default function PreFinalPage() {
  return (
    <div className="pageStack">
      <SectionCard title="確定前チェック" subtitle={`対象週 ${targetWeek} の最終確認`}>
        <ul className="checkList">
          <li>
            <StatusTag label="不足" tone="danger" />
            <span>人員不足: {warnings.filter((warning) => warning.type === "不足").length}件</span>
          </li>
          <li>
            <StatusTag label="競合" tone="warning" />
            <span>重複競合: {warnings.filter((warning) => warning.type === "競合").length}件</span>
          </li>
          <li>
            <StatusTag label="希望未反映" tone="insight" />
            <span>未反映希望: {warnings.filter((warning) => warning.type === "希望未反映").length}件</span>
          </li>
        </ul>
      </SectionCard>
      <SectionCard title="確認チェックリスト">
        <ul className="checkListPlain">
          <li>□ 未提出メンバーへ確認済み</li>
          <li>□ 拠点ごとの最低人数を確認</li>
          <li>□ 競合スロットの代替候補を検討</li>
          <li>□ 配信先グループを確認</li>
        </ul>
      </SectionCard>
    </div>
  );
}
