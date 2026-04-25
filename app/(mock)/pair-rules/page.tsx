import { SectionCard, StatusTag } from '@/components/mock/ui';
import { pairRuleRows } from '@/lib/mock/tas-master-data';

const educationOrRecommendedCount = pairRuleRows.filter((row) => row.ruleType.includes('教育') || row.ruleType.includes('推奨')).length;
const managerConfirmCount = pairRuleRows.filter((row) => row.severity === '管理者確認').length;
const activeCount = pairRuleRows.filter((row) => row.status === '有効').length;

function toneForRuleType(ruleType: (typeof pairRuleRows)[number]['ruleType']) {
  if (ruleType.includes('教育') || ruleType.includes('推奨')) return 'insight';
  if (ruleType.includes('管理者確認')) return 'primary';
  return 'warning';
}

function toneForSeverity(severity: (typeof pairRuleRows)[number]['severity']) {
  if (severity === '必須') return 'danger';
  if (severity === '警告') return 'warning';
  if (severity === '推奨') return 'insight';
  return 'primary';
}

function toneForStatus(status: (typeof pairRuleRows)[number]['status']) {
  if (status === '有効') return 'success';
  if (status === '確認中') return 'warning';
  return 'default';
}

export default function PairRulesPage() {
  return (
    <div className="page-stack">
      <SectionCard
        title="配置配慮ルール管理"
        action={
          <button type="button" className="primary-button">
            新規配置配慮ルール
          </button>
        }
      >
        <p className="helper-text">教育ペア・同一現場回避・管理者確認などの配置配慮ルールを事務所側で確認できるモック画面です。</p>

        <div className="status-row">
          <StatusTag tone="primary">登録ルール {pairRuleRows.length}件</StatusTag>
          <StatusTag tone="insight">教育/推奨 {educationOrRecommendedCount}件</StatusTag>
          <StatusTag tone="warning">管理者確認 {managerConfirmCount}件</StatusTag>
          <StatusTag tone="success">有効 {activeCount}件</StatusTag>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>スタッフA</th>
                <th>スタッフB</th>
                <th>ルール種別</th>
                <th>強度</th>
                <th>表示メッセージ</th>
                <th>状態</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {pairRuleRows.map((row) => (
                <tr key={row.id}>
                  <td>{row.staffA}</td>
                  <td>{row.staffB}</td>
                  <td>
                    <StatusTag tone={toneForRuleType(row.ruleType)}>{row.ruleType}</StatusTag>
                  </td>
                  <td>
                    <StatusTag tone={toneForSeverity(row.severity)}>{row.severity}</StatusTag>
                  </td>
                  <td>
                    <p>{row.displayMessage}</p>
                    <p className="muted">{row.id}</p>
                  </td>
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
