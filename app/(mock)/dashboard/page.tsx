import { SectionCard, StatusTag } from '@/components/mock/ui';
import { autoShiftRows } from '@/lib/mock/autoview-data';

const finalizedRows = autoShiftRows.map((row) => ({
  ...row,
  frozenStatus: '凍結済み' as const
}));

export default function DashboardPage() {
  return (
    <div className="page-stack">
      <SectionCard title="凍結済みシフト一覧" action={<StatusTag tone="success">最終確定</StatusTag>}>
        <p className="helper-text">配信済みの最終シフトを表示しています。確定後の参照専用ビューです。</p>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>日付</th>
                <th>時間帯</th>
                <th>担当者</th>
                <th>班</th>
                <th>配置先</th>
                <th>作業</th>
                <th>状態</th>
              </tr>
            </thead>
            <tbody>
              {finalizedRows.map((row) => (
                <tr key={row.id}>
                  <td>
                    {row.workDate}（{row.weekday}）
                  </td>
                  <td>
                    {row.shiftType}
                    <br />
                    <span className="muted">
                      {row.startTime} - {row.endTime}
                    </span>
                  </td>
                  <td>{row.employeeName}</td>
                  <td>{row.team}</td>
                  <td>{row.assignedSite}</td>
                  <td>{row.taskType}</td>
                  <td>
                    <StatusTag tone="success">{row.frozenStatus}</StatusTag>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
