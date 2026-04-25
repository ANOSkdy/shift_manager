import { SectionCard, StatusTag } from '@/components/mock/ui';
import { assignmentRuleRows } from '@/lib/mock/tas-master-data';

const requiredCount = assignmentRuleRows.filter((row) => row.severity === '必須').length;
const warningCount = assignmentRuleRows.filter((row) => row.severity === '警告').length;
const managerConfirmCount = assignmentRuleRows.filter((row) => row.severity === '管理者確認').length;

function toneForSeverity(severity: (typeof assignmentRuleRows)[number]['severity']) {
  if (severity === '必須') return 'danger';
  if (severity === '警告') return 'warning';
  if (severity === '推奨') return 'insight';
  return 'primary';
}

function toneForStatus(status: (typeof assignmentRuleRows)[number]['status']) {
  if (status === '有効') return 'success';
  if (status === '確認中') return 'warning';
  return 'default';
}

export default function RulesPage() {
  return (
    <div className="page-stack">
      <SectionCard
        title="配置ルール管理"
        action={
          <button type="button" className="primary-button">
            新規ルール登録
          </button>
        }
      >
        <p className="helper-text">シフト調整で利用する顧客・案件・現場ごとの配置ルールを事務所側で確認できるモック画面です。</p>

        <div className="status-row">
          <StatusTag tone="primary">登録ルール {assignmentRuleRows.length}件</StatusTag>
          <StatusTag tone="danger">必須 {requiredCount}件</StatusTag>
          <StatusTag tone="warning">警告 {warningCount}件</StatusTag>
          <StatusTag tone="insight">管理者確認 {managerConfirmCount}件</StatusTag>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ルール名</th>
                <th>対象</th>
                <th>種別</th>
                <th>強度</th>
                <th>条件</th>
                <th>表示メッセージ</th>
                <th>状態</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {assignmentRuleRows.map((rule) => (
                <tr key={rule.id}>
                  <td>
                    <p>{rule.ruleName}</p>
                    <p className="muted">{rule.id}</p>
                  </td>
                  <td>{rule.target}</td>
                  <td>{rule.ruleType}</td>
                  <td>
                    <StatusTag tone={toneForSeverity(rule.severity)}>{rule.severity}</StatusTag>
                  </td>
                  <td>{rule.condition}</td>
                  <td>{rule.displayMessage}</td>
                  <td>
                    <StatusTag tone={toneForStatus(rule.status)}>{rule.status}</StatusTag>
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
