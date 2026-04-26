import Link from 'next/link';
import { SectionCard, StatusTag } from '@/components/mock/ui';
import { autoShiftRows, type AllocationStatus, type RuleResult } from '@/lib/mock/autoview-data';

function toneForAllocationStatus(status: AllocationStatus) {
  if (status === '希望') return 'success' as const;
  if (status === '調整中') return 'primary' as const;
  return 'warning' as const;
}

function toneForRuleResult(result: RuleResult) {
  if (result === 'OK') return 'success' as const;
  if (result === '警告') return 'warning' as const;
  if (result === '要調整') return 'danger' as const;
  return 'primary' as const;
}

const ruleSummary = {
  OK: autoShiftRows.filter((row) => row.ruleResult === 'OK').length,
  警告: autoShiftRows.filter((row) => row.ruleResult === '警告').length,
  要調整: autoShiftRows.filter((row) => row.ruleResult === '要調整').length,
  管理者確認: autoShiftRows.filter((row) => row.ruleResult === '管理者確認').length
};

export default function AutoViewPage() {
  return (
    <div className="page-stack">
      <SectionCard title="自動調整結果">
        <div className="status-row">
          <StatusTag tone="primary">総件数 {autoShiftRows.length}件</StatusTag>
          <StatusTag tone="success">OK {ruleSummary.OK}件</StatusTag>
          <StatusTag tone="warning">警告 {ruleSummary.警告}件</StatusTag>
          <StatusTag tone="danger">要調整 {ruleSummary.要調整}件</StatusTag>
          <StatusTag tone="insight">管理者確認 {ruleSummary.管理者確認}件</StatusTag>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>日付</th>
                <th>顧客/案件</th>
                <th>時間帯</th>
                <th>担当者</th>
                <th>配置先/役割</th>
                <th>作業</th>
                <th>適用ルール</th>
                <th>判定</th>
                <th>優先度</th>
                <th>状態</th>
                <th>調整理由</th>
              </tr>
            </thead>
            <tbody>
              {autoShiftRows.map((row) => (
                <tr key={row.id} className={row.allocationStatus === '調整中' ? 'autoview-row--adjusting' : undefined}>
                  <td>
                    {row.workDate}（{row.weekday}）
                  </td>
                  <td>
                    <p>{row.customerName}</p>
                    <p className="muted">{row.projectName}</p>
                  </td>
                  <td>
                    {row.shiftType}
                    <br />
                    <span className="muted">
                      {row.startTime} - {row.endTime}
                    </span>
                  </td>
                  <td>
                    <p>{row.employeeName}</p>
                    <p className="muted">{row.team}</p>
                  </td>
                  <td>
                    <p>{row.assignedSite}</p>
                    <p className="muted">{row.roleName}</p>
                  </td>
                  <td>{row.taskType}</td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                      {row.appliedRules.map((rule) => (
                        <StatusTag key={`${row.id}-${rule}`} tone="default">
                          {rule}
                        </StatusTag>
                      ))}
                    </div>
                  </td>
                  <td>
                    <StatusTag tone={toneForRuleResult(row.ruleResult)}>{row.ruleResult}</StatusTag>
                  </td>
                  <td>
                    <StatusTag tone={row.priority === '高' ? 'danger' : row.priority === '中' ? 'warning' : 'insight'}>{row.priority}</StatusTag>
                  </td>
                  <td>
                    <StatusTag tone={toneForAllocationStatus(row.allocationStatus)}>{row.allocationStatus}</StatusTag>
                  </td>
                  <td>
                    <p className="muted">{row.adjustmentReason}</p>
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
