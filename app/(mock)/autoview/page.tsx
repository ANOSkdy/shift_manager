import Link from 'next/link';
import { SectionCard, StatusTag } from '@/components/mock/ui';
import { autoShiftRows } from '@/lib/mock/autoview-data';

export default function AutoViewPage() {
  return (
    <div className="page-stack">
      <SectionCard title="自動調整結果">
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
                <th>優先度</th>
                <th>状態</th>
              </tr>
            </thead>
            <tbody>
              {autoShiftRows.map((row) => (
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
                    <StatusTag tone={row.priority === '高' ? 'danger' : row.priority === '中' ? 'warning' : 'insight'}>{row.priority}</StatusTag>
                  </td>
                  <td>
                    <StatusTag tone={row.allocationStatus === '希望' ? 'success' : row.allocationStatus === '調整中' ? 'primary' : 'warning'}>
                      {row.allocationStatus}
                    </StatusTag>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard title="次のアクション">
        <div className="status-row">
          <Link href="/adjustment" className="primary-button">
            調整中シフトを編集する
          </Link>
          <Link href="/upload" className="chip">
            CSV再アップロード
          </Link>
        </div>
      </SectionCard>
    </div>
  );
}
