import Link from 'next/link';
import { AlertPanel, ProcessFlow, SectionCard, StatusTag } from '@/components/mock/ui';
import { processSteps, scheduleSlots, warnings } from '@/lib/mock/shift-data';

export default function AutoSchedulePage() {
  return (
    <div className="page-stack">
      <SectionCard title="進行中プロセス">
        <ProcessFlow steps={processSteps} />
      </SectionCard>

      <AlertPanel title="自動作成時の注意">
        <ul className="bullet-list">
          {warnings.map((warning) => (
            <li key={warning.id}>
              <StatusTag tone={warning.tone}>{warning.message}</StatusTag>
            </li>
          ))}
        </ul>
      </AlertPanel>

      <SectionCard
        title="自動作成ベースシフト"
        action={
          <Link href="/adjustment" className="primary-button">
            調整へ進む
          </Link>
        }
      >
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>曜日</th>
                <th>店舗</th>
                <th>時間</th>
                <th>配置</th>
                <th>必要人数</th>
                <th>状態</th>
              </tr>
            </thead>
            <tbody>
              {scheduleSlots.map((slot) => {
                const isShort = slot.assigned.length < slot.required;
                return (
                  <tr key={slot.id}>
                    <td>{slot.day}</td>
                    <td>{slot.site}</td>
                    <td>{slot.time}</td>
                    <td>{slot.assigned.join(' / ')}</td>
                    <td>
                      {slot.assigned.length}/{slot.required}
                    </td>
                    <td>{isShort ? <StatusTag tone="danger">不足</StatusTag> : <StatusTag tone="success">充足</StatusTag>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
