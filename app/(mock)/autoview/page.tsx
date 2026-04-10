import Link from 'next/link';
import { HeroPanel, SectionCard, StatusTag } from '@/components/mock/ui';
import { autoShiftRows } from '@/lib/mock/autoview-data';

const kpis = [
  { label: '対象日', value: '2026/05/15-05/22' },
  { label: '表示件数', value: `${autoShiftRows.length}件` },
  { label: '要調整', value: `${autoShiftRows.filter((item) => item.allocationStatus === '要調整').length}件` }
];

export default function AutoViewPage() {
  return (
    <div className="page-stack">
      <HeroPanel title="自動調整シフト（グリッドビュー）" description="アップロード済みCSVを取り込んだ想定で、日付×時間帯で確認しやすいグリッド形式に整形したシフト画面です。" />

      <SectionCard title="読込サマリー" action={<StatusTag tone="success">CSV取込済み（想定）</StatusTag>}>
        <ul className="summary-grid">
          {kpis.map((item) => (
            <li key={item.label} className="summary-item">
              <p className="muted">{item.label}</p>
              <p className="summary-item__value">{item.value}</p>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="シフトグリッドビュー">
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
                    <StatusTag tone={row.allocationStatus === '希望' ? 'success' : row.allocationStatus === '仮割当' ? 'primary' : 'warning'}>
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
            仮割当を調整する
          </Link>
          <Link href="/pre-final" className="chip">
            確定前チェックへ
          </Link>
        </div>
      </SectionCard>
    </div>
  );
}
