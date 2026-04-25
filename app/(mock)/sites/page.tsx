import { SectionCard, StatusTag } from '@/components/mock/ui';
import { siteMockRows } from '@/lib/mock/tas-master-data';

const leaderRequiredCount = siteMockRows.filter((row) => [...row.tags, ...row.requiredRoles].some((value) => value.includes('リーダー'))).length;
const carConditionCount = siteMockRows.filter((row) => [...row.tags, ...row.requiredSkills].some((value) => value.includes('車両'))).length;
const highLoadOrRemoteCount = siteMockRows.filter((row) => row.tags.some((tag) => tag.includes('月末高負荷') || tag.includes('遠方'))).length;

function headcountTone(headcount: number) {
  if (headcount >= 5) return 'warning';
  if (headcount >= 4) return 'primary';
  return 'default';
}

function importantTagTone(tag: string) {
  if (tag.includes('必須') || tag.includes('高負荷')) return 'warning';
  if (tag.includes('遠方') || tag.includes('夜間')) return 'insight';
  return 'default';
}

export default function SitesPage() {
  return (
    <div className="page-stack">
      <SectionCard
        title="現場管理"
        action={
          <button type="button" className="primary-button">
            新規現場登録
          </button>
        }
      >
        <p className="helper-text">シフト調整で参照する顧客・案件・現場条件（必要人数/スキル/注意事項）を事務所側で確認できるモック画面です。</p>

        <div className="status-row">
          <StatusTag tone="primary">登録現場 {siteMockRows.length}件</StatusTag>
          <StatusTag tone="success">リーダー必須 {leaderRequiredCount}件</StatusTag>
          <StatusTag tone="insight">車両条件 {carConditionCount}件</StatusTag>
          <StatusTag tone="warning">高負荷/遠方 {highLoadOrRemoteCount}件</StatusTag>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>顧客</th>
                <th>案件</th>
                <th>現場</th>
                <th>エリア</th>
                <th>必要人数</th>
                <th>必要役割</th>
                <th>必要スキル</th>
                <th>集合時間</th>
                <th>注意事項</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {siteMockRows.map((site) => (
                <tr key={site.id}>
                  <td>{site.customerName}</td>
                  <td>
                    <p>{site.projectName}</p>
                    <p className="muted">{site.id}</p>
                  </td>
                  <td>{site.siteName}</td>
                  <td>{site.area}</td>
                  <td>
                    <StatusTag tone={headcountTone(site.requiredHeadcount)}>{site.requiredHeadcount}名</StatusTag>
                  </td>
                  <td>{site.requiredRoles.join(' / ')}</td>
                  <td>{site.requiredSkills.join(' / ')}</td>
                  <td>{site.meetingTime}</td>
                  <td>
                    <p>{site.note}</p>
                    <div className="status-row" style={{ marginTop: '0.35rem' }}>
                      {site.tags.map((tag) => (
                        <StatusTag key={tag} tone={importantTagTone(tag)}>
                          {tag}
                        </StatusTag>
                      ))}
                    </div>
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
