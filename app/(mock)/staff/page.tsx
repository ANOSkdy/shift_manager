import { SectionCard, StatusTag } from '@/components/mock/ui';
import { staffMockRows } from '@/lib/mock/tas-master-data';

const leadCount = staffMockRows.filter((row) => row.canLead).length;
const carCount = staffMockRows.filter((row) => row.hasCar).length;
const traineeCount = staffMockRows.filter((row) => row.staffType === '新人' || row.status === '研修中').length;

function toneForStaffType(staffType: (typeof staffMockRows)[number]['staffType']) {
  if (staffType === 'リーダー') return 'primary';
  if (staffType === '新人') return 'warning';
  return 'insight';
}

function toneForStaffStatus(status: (typeof staffMockRows)[number]['status']) {
  if (status === '在籍') return 'success';
  if (status === '研修中') return 'warning';
  return 'primary';
}

export default function StaffPage() {
  return (
    <div className="page-stack">
      <SectionCard
        title="スタッフ管理"
        action={
          <button type="button" className="primary-button">
            新規スタッフ登録
          </button>
        }
      >
        <p className="helper-text">シフト調整に利用するスタッフ属性（区分・スキル・対応条件）を事務所側で確認できるモック画面です。</p>

        <div className="status-row">
          <StatusTag tone="primary">登録スタッフ {staffMockRows.length}名</StatusTag>
          <StatusTag tone="success">リーダー可 {leadCount}名</StatusTag>
          <StatusTag tone="insight">車両あり {carCount}名</StatusTag>
          <StatusTag tone="warning">新人/研修中 {traineeCount}名</StatusTag>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>氏名</th>
                <th>区分</th>
                <th>リーダー</th>
                <th>車両</th>
                <th>対応エリア</th>
                <th>スキル</th>
                <th>対応業務</th>
                <th>状態</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {staffMockRows.map((staff) => (
                <tr key={staff.id}>
                  <td>
                    <p>{staff.name}</p>
                    <p className="muted">{staff.id}</p>
                  </td>
                  <td>
                    <StatusTag tone={toneForStaffType(staff.staffType)}>{staff.staffType}</StatusTag>
                  </td>
                  <td>
                    <StatusTag tone={staff.canLead ? 'success' : 'default'}>{staff.canLead ? '可' : '不可'}</StatusTag>
                  </td>
                  <td>
                    <StatusTag tone={staff.hasCar ? 'insight' : 'default'}>{staff.hasCar ? 'あり' : 'なし'}</StatusTag>
                  </td>
                  <td>{staff.areas.join(' / ')}</td>
                  <td>{staff.skills.join(' / ')}</td>
                  <td>
                    <div className="status-row">
                      {staff.availableTasks.map((task) => (
                        <span key={task} className="chip">
                          {task}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="status-row">
                      <StatusTag tone={toneForStaffStatus(staff.status)}>{staff.status}</StatusTag>
                      {staff.tags.slice(0, 2).map((tag) => (
                        <StatusTag key={tag} tone="default">
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
