'use client';

import { useState } from 'react';
import { HeroPanel, SectionCard, StatusTag } from '@/components/mock/ui';
import { siteMasters, staffMasters } from '@/lib/mock/shift-data';

const tabs = ['スタッフ', '現場'] as const;

export default function MasterPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('スタッフ');

  return (
    <div className="page-stack">
      <HeroPanel title="シフト条件の前提となるマスタ情報" description="人員の稼働傾向と現場条件をまとめ、調整の判断根拠を共有します。" />

      <SectionCard title="スタッフ / 現場マスタ">
        <div className="filter-row" role="tablist" aria-label="マスタ切り替え">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={activeTab === tab ? 'chip chip--active' : 'chip'}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'スタッフ' ? (
          <div className="master-grid">
            {staffMasters.map((staff) => (
              <article key={staff.id} className="master-card">
                <h3>{staff.name}</h3>
                <p>対応現場: {staff.supportedSites.join(' / ')}</p>
                <p>週あたり目安: {staff.weeklyCapacity}</p>
                <p>傾向: {staff.tendency}</p>
                <div className="status-row">
                  {staff.tags.map((tag) => (
                    <StatusTag key={tag.label} tone={tag.tone}>
                      {tag.label}
                    </StatusTag>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="master-grid">
            {siteMasters.map((site) => (
              <article key={site.id} className="master-card">
                <h3>{site.siteName}</h3>
                <p>必要人数: {site.requiredHeadcount}</p>
                <p>営業時間: {site.businessHours}</p>
                <p>メモ: {site.note}</p>
                <div className="status-row">
                  {site.tags.map((tag) => (
                    <StatusTag key={tag.label} tone={tag.tone}>
                      {tag.label}
                    </StatusTag>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
