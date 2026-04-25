import { SectionCard, StatusTag } from '@/components/mock/ui';
import { dutyRuleRows } from '@/lib/mock/tas-master-data';

const dailyCount = dutyRuleRows.filter((row) => row.frequency.includes('毎日')).length;
const activeCount = dutyRuleRows.filter((row) => row.status === '有効').length;
const singleAssigneeCount = dutyRuleRows.filter((row) => row.requiredCount === 1).length;

function toneForFrequency(frequency: (typeof dutyRuleRows)[number]['frequency']) {
  if (frequency.includes('毎日')) return 'primary';
  if (frequency.includes('週')) return 'insight';
  return 'default';
}

function toneForRequiredCount(requiredCount: number) {
  if (requiredCount === 1) return 'success';
  if (requiredCount >= 3) return 'warning';
  return 'primary';
}

function toneForStatus(status: (typeof dutyRuleRows)[number]['status']) {
  if (status === '有効') return 'success';
  if (status === '確認中') return 'warning';
  return 'default';
}

export default function DutiesPage() {
  return (
    <div className="page-stack">
      <SectionCard
        title="日次当番ルール管理"
        action={
          <button type="button" className="primary-button">
            新規当番ルール
          </button>
        }
      >
        <p className="helper-text">ゴミ捨て・日報・備品確認・顧客連絡・鍵閉めなどの日次/定期当番ルールを事務所側で確認できるモック画面です。</p>

        <div className="status-row">
          <StatusTag tone="primary">登録当番 {dutyRuleRows.length}件</StatusTag>
          <StatusTag tone="insight">毎日 {dailyCount}件</StatusTag>
          <StatusTag tone="success">有効 {activeCount}件</StatusTag>
          <StatusTag tone="warning">1名担当 {singleAssigneeCount}件</StatusTag>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>当番名</th>
                <th>対象</th>
                <th>頻度</th>
                <th>割当方法</th>
                <th>必要人数</th>
                <th>除外条件</th>
                <th>状態</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {dutyRuleRows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <p>{row.dutyName}</p>
                    <p className="muted">{row.id}</p>
                  </td>
                  <td>{row.target}</td>
                  <td>
                    <StatusTag tone={toneForFrequency(row.frequency)}>{row.frequency}</StatusTag>
                  </td>
                  <td>{row.assignmentMethod}</td>
                  <td>
                    <StatusTag tone={toneForRequiredCount(row.requiredCount)}>{row.requiredCount}名</StatusTag>
                  </td>
                  <td>{row.exclusionCondition}</td>
                  <td>
                    <StatusTag tone={toneForStatus(row.status)}>{row.status}</StatusTag>
                  </td>
                  <td>
                    <button type="button" className="chip">
                      編集
                    </button>
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
