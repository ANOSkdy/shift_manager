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

export type ProcessStep = {
  id: string;
  label: string;
  detail: string;
  status: 'done' | 'current' | 'todo';
};

export type StaffMaster = {
  id: string;
  name: string;
  supportedSites: string[];
  weeklyCapacity: string;
  tendency: string;
  tags: { label: string; tone: StatusTone }[];
};

export type SiteMaster = {
  id: string;
  siteName: string;
  requiredHeadcount: string;
  businessHours: string;
  note: string;
  tags: { label: string; tone: StatusTone }[];
};

export type SiteBalance = {
  site: string;
  required: number;
  assigned: number;
};

export const targetWeek = '2026/04/13 - 2026/04/19';

export const navItems: NavItem[] = [
  { href: '/dashboard', label: 'ダッシュボード' },
  { href: '/upload', label: 'CSVアップロード' },
  { href: '/autoview', label: '自動調整ビュー' },
  { href: '/availability', label: '希望一覧' },
  { href: '/master', label: 'スタッフ / 現場マスタ' },
  { href: '/auto-schedule', label: '自動作成結果' },
  { href: '/adjustment', label: '調整' },
  { href: '/pre-final', label: '確定前チェック' },
  { href: '/finalized', label: '確定・配布' }
];

export const dashboardKpis: KpiItem[] = [
  { label: '提出済み', value: '12 / 15', tone: 'success', note: '未提出 3名' },
  { label: '充足率', value: '86%', tone: 'primary', note: '不足 2枠 / 全14枠' },
  { label: '重複希望', value: '3件', tone: 'warning', note: '同一時間帯' },
  { label: '進捗', value: '80%', tone: 'insight', note: '調整フェーズ中' }
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

export const processSteps: ProcessStep[] = [
  { id: 'p1', label: '希望回収', detail: '提出状況を確認', status: 'done' },
  { id: 'p2', label: '自動作成', detail: 'ベース案を生成', status: 'done' },
  { id: 'p3', label: '人手調整', detail: '不足と希望未反映を調整', status: 'current' },
  { id: 'p4', label: '確定前確認', detail: '配布前チェック', status: 'todo' },
  { id: 'p5', label: '確定・配布', detail: '各チャネルへ配布', status: 'todo' }
];

export const submissionChart = {
  submitted: 12,
  pending: 3
};

export const fillRateChart = {
  filled: 12,
  shortage: 2
};

export const siteBalances: SiteBalance[] = [
  { site: '本店', required: 6, assigned: 6 },
  { site: '駅前店', required: 5, assigned: 4 },
  { site: '南口店', required: 3, assigned: 2 }
];

export const staffMasters: StaffMaster[] = [
  {
    id: 'st1',
    name: '佐藤 花',
    supportedSites: ['本店', '駅前店'],
    weeklyCapacity: '週4コマ',
    tendency: '午前優先 / 土曜可',
    tags: [
      { label: '早番安定', tone: 'success' },
      { label: '育成担当', tone: 'insight' }
    ]
  },
  {
    id: 'st2',
    name: '田中 健',
    supportedSites: ['駅前店'],
    weeklyCapacity: '週3コマ',
    tendency: '平日午後中心',
    tags: [
      { label: '重複注意', tone: 'warning' },
      { label: '接客強み', tone: 'primary' }
    ]
  },
  {
    id: 'st3',
    name: '中村 優',
    supportedSites: ['本店', '南口店'],
    weeklyCapacity: '週5コマ',
    tendency: '夜帯希望',
    tags: [
      { label: '不足補完候補', tone: 'danger' },
      { label: '稼働高', tone: 'success' }
    ]
  }
];

export const siteMasters: SiteMaster[] = [
  {
    id: 'si1',
    siteName: '本店',
    requiredHeadcount: '平日 2名 / 土日 3名',
    businessHours: '09:00 - 21:00',
    note: 'ランチ帯の来客が多い',
    tags: [
      { label: '教育拠点', tone: 'insight' },
      { label: '安定運用', tone: 'success' }
    ]
  },
  {
    id: 'si2',
    siteName: '駅前店',
    requiredHeadcount: '平日 2名 / 金曜夜 3名',
    businessHours: '10:00 - 22:00',
    note: '夜帯不足が発生しやすい',
    tags: [
      { label: '不足注意', tone: 'danger' },
      { label: 'ピーク変動', tone: 'warning' }
    ]
  },
  {
    id: 'si3',
    siteName: '南口店',
    requiredHeadcount: '平日 1-2名',
    businessHours: '11:00 - 20:00',
    note: '少人数運用のため欠員影響が大きい',
    tags: [
      { label: '応援前提', tone: 'primary' }
    ]
  }
];

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
