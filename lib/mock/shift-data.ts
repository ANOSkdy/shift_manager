export type StatusTone = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'insight';

export type NavItem = {
  href: string;
  label: string;
};

export type KpiItem = {
  label: string;
  value: string;
  tone?: StatusTone;
  note?: string;
};

export type AvailabilityRow = {
  id: string;
  staffName: string;
  day: string;
  time: string;
  site: string;
  overlap: boolean;
  submitted: boolean;
  note: string;
};

export type ScheduleSlot = {
  id: string;
  day: string;
  site: string;
  time: string;
  assigned: string[];
  required: number;
};

export type WarningItem = {
  id: string;
  message: string;
  tone: Exclude<StatusTone, 'default'>;
};

export const targetWeek = '2026/04/13 - 2026/04/19';

export const navItems: NavItem[] = [
  { href: '/dashboard', label: 'ダッシュボード' },
  { href: '/availability', label: '希望一覧' },
  { href: '/auto-schedule', label: '自動作成結果' },
  { href: '/adjustment', label: '調整' },
  { href: '/pre-final', label: '確定前チェック' },
  { href: '/finalized', label: '確定・配布' }
];

export const dashboardKpis: KpiItem[] = [
  { label: '提出済み', value: '12 / 15', tone: 'success', note: '未提出 3名' },
  { label: '不足シフト', value: '2枠', tone: 'danger', note: '夜帯に集中' },
  { label: '重複希望', value: '3件', tone: 'warning', note: '同一時間帯' },
  { label: '進捗', value: '80%', tone: 'primary', note: '自動作成まで完了' }
];

export const availabilityRows: AvailabilityRow[] = [
  { id: 'a1', staffName: '佐藤 花', day: '月', time: '09:00-13:00', site: '本店', overlap: false, submitted: true, note: '10時まで研修可' },
  { id: 'a2', staffName: '田中 健', day: '月', time: '13:00-18:00', site: '駅前店', overlap: true, submitted: true, note: '他店舗と希望重複' },
  { id: 'a3', staffName: '高橋 美咲', day: '火', time: '09:00-17:00', site: '本店', overlap: false, submitted: true, note: '終日可' },
  { id: 'a4', staffName: '伊藤 遼', day: '水', time: '17:00-22:00', site: '南口店', overlap: false, submitted: false, note: '未提出' },
  { id: 'a5', staffName: '中村 優', day: '木', time: '13:00-22:00', site: '駅前店', overlap: true, submitted: true, note: '夜帯のみ希望' }
];

export const scheduleSlots: ScheduleSlot[] = [
  { id: 's1', day: '月', site: '本店', time: '09:00-13:00', assigned: ['佐藤 花', '高橋 美咲'], required: 2 },
  { id: 's2', day: '月', site: '駅前店', time: '13:00-18:00', assigned: ['田中 健'], required: 2 },
  { id: 's3', day: '火', site: '本店', time: '13:00-18:00', assigned: ['高橋 美咲', '中村 優'], required: 2 },
  { id: 's4', day: '水', site: '南口店', time: '17:00-22:00', assigned: ['中村 優'], required: 2 }
];

export const warnings: WarningItem[] = [
  { id: 'w1', message: '駅前店 月曜13:00-18:00 が1名不足しています。', tone: 'danger' },
  { id: 'w2', message: '中村 優さんの木曜希望が未反映です。', tone: 'warning' },
  { id: 'w3', message: '田中 健さんの重複希望を自動調整しました。', tone: 'insight' }
];

export const replacementCandidates: Record<string, string[]> = {
  s2: ['鈴木 大輔', '小林 愛'],
  s4: ['伊藤 遼', '渡辺 真央']
};

export const preFinalChecklist = [
  '不足枠の確認',
  '重複・連勤ルールの確認',
  '希望未反映メモの共有',
  '配布前メッセージの最終確認'
];

export const finalizedSummary = {
  deliveredAt: '2026/04/04 18:30',
  affectedStaff: 15,
  deliveredChannels: ['Slack', 'メール'],
  status: '配布完了'
};
