import { ScheduleSlot } from "@/lib/mock/shift-data";

export function ScheduleTable({ slots }: { slots: ScheduleSlot[] }) {
  return (
    <div className="tableWrapper">
      <table className="table">
        <thead>
          <tr>
            <th>曜日</th>
            <th>拠点</th>
            <th>時間帯</th>
            <th>配置</th>
            <th>必要人数</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => (
            <tr key={slot.id}>
              <td>{slot.day}</td>
              <td>{slot.site}</td>
              <td>{slot.time}</td>
              <td>{slot.assigned.join(" / ") || "未配置"}</td>
              <td>
                {slot.assigned.length}/{slot.required}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
