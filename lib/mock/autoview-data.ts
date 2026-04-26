export type AllocationStatus = '希望' | '調整中' | '要調整';
export type PriorityLevel = '高' | '中' | '低';
export type RuleResult = 'OK' | '警告' | '要調整' | '管理者確認';

export type AutoShiftRow = {
  id: string;
  workDate: string;
  weekday: string;
  employeeName: string;
  team: string;
  customerName: string;
  projectName: string;
  assignedSite: string;
  roleName: string;
  taskType: string;
  shiftType: string;
  startTime: string;
  endTime: string;
  allocationStatus: AllocationStatus;
  priority: PriorityLevel;
  appliedRules: string[];
  ruleResult: RuleResult;
  adjustmentReason: string;
};

export const autoShiftRows: AutoShiftRow[] = [
  {
    id: 'R0001',
    workDate: '2026-05-22',
    weekday: '金',
    employeeName: '藤田 健太',
    team: '札幌第1チーム',
    customerName: 'TASさま',
    projectName: '札幌中央 定常運用',
    assignedSite: '札幌中央オフィス',
    roleName: 'リーダー',
    taskType: '開局準備',
    shiftType: '早朝',
    startTime: '05:00',
    endTime: '09:00',
    allocationStatus: '調整中',
    priority: '高',
    appliedRules: ['各現場リーダー1名必須', '配置配慮ルール', '顧客連絡担当の配置'],
    ruleResult: '管理者確認',
    adjustmentReason: '現場責任者として配置しています。配置配慮ルールのため管理者確認が必要です。'
  },
  {
    id: 'R0012',
    workDate: '2026-05-22',
    weekday: '金',
    employeeName: '中村 健',
    team: '札幌第1チーム',
    customerName: 'TASさま',
    projectName: '札幌中央 定常運用',
    assignedSite: '札幌中央オフィス',
    roleName: '作業担当',
    taskType: '定常巡回',
    shiftType: '午前',
    startTime: '08:00',
    endTime: '12:00',
    allocationStatus: '希望',
    priority: '高',
    appliedRules: ['新人単独禁止', '教育ペア'],
    ruleResult: 'OK',
    adjustmentReason: '教育担当者と同一現場に配置し、新人単独にならないよう調整済みです。'
  },
  {
    id: 'R0066',
    workDate: '2026-05-22',
    weekday: '金',
    employeeName: '小林 菜々',
    team: '札幌第2チーム',
    customerName: 'TASさま',
    projectName: '札幌中央 定常運用',
    assignedSite: '札幌中央オフィス',
    roleName: '日報担当',
    taskType: '日報作成',
    shiftType: '午前',
    startTime: '08:00',
    endTime: '12:00',
    allocationStatus: '希望',
    priority: '中',
    appliedRules: ['日報担当を毎日1名配置', '日次当番'],
    ruleResult: 'OK',
    adjustmentReason: '日報担当枠として配置し、当番表と整合しています。'
  },
  {
    id: 'R0081',
    workDate: '2026-05-22',
    weekday: '金',
    employeeName: '西村 愛',
    team: '札幌第2チーム',
    customerName: 'TASさま',
    projectName: '札幌中央 定常運用',
    assignedSite: '札幌中央オフィス',
    roleName: '作業担当',
    taskType: '窓口支援',
    shiftType: '通し',
    startTime: '08:00',
    endTime: '17:00',
    allocationStatus: '希望',
    priority: '中',
    appliedRules: ['顧客連絡担当の配置', '日次当番'],
    ruleResult: 'OK',
    adjustmentReason: '日次当番の窓口支援担当として割り当てています。'
  },
  {
    id: 'R0108',
    workDate: '2026-05-21',
    weekday: '木',
    employeeName: '石川 大和',
    team: '江別支援チーム',
    customerName: 'TASさま',
    projectName: '江別サテライト支援',
    assignedSite: '江別サテライト拠点',
    roleName: '作業担当',
    taskType: '搬入支援',
    shiftType: '早朝',
    startTime: '05:00',
    endTime: '09:00',
    allocationStatus: '希望',
    priority: '中',
    appliedRules: ['遠方現場偏り防止'],
    ruleResult: '警告',
    adjustmentReason: '遠方現場への連続配置が続いているため、翌週は近隣現場への振替を推奨します。'
  },
  {
    id: 'R0124',
    workDate: '2026-05-21',
    weekday: '木',
    employeeName: '木村 咲',
    team: '札幌第2チーム',
    customerName: 'TASさま',
    projectName: '札幌中央 定常運用',
    assignedSite: '札幌中央オフィス',
    roleName: '教育担当',
    taskType: '新人同行支援',
    shiftType: '午後',
    startTime: '13:00',
    endTime: '17:00',
    allocationStatus: '希望',
    priority: '高',
    appliedRules: ['新人単独禁止', '教育ペア'],
    ruleResult: 'OK',
    adjustmentReason: '新人スタッフの同行先として教育担当を確保しています。'
  },
  {
    id: 'R0200',
    workDate: '2026-05-19',
    weekday: '火',
    employeeName: '後藤 結衣',
    team: '札幌第1チーム',
    customerName: 'TASさま',
    projectName: '札幌中央 定常運用',
    assignedSite: '札幌中央オフィス',
    roleName: '顧客連絡',
    taskType: '進捗共有',
    shiftType: '午前',
    startTime: '08:00',
    endTime: '12:00',
    allocationStatus: '希望',
    priority: '高',
    appliedRules: ['顧客連絡担当の配置'],
    ruleResult: 'OK',
    adjustmentReason: '顧客連絡窓口として実績のある担当者を優先配置しています。'
  },
  {
    id: 'R0215',
    workDate: '2026-05-19',
    weekday: '火',
    employeeName: '佐藤 大輔',
    team: '江別支援チーム',
    customerName: 'TASさま',
    projectName: '江別サテライト支援',
    assignedSite: '江別サテライト拠点',
    roleName: '作業担当',
    taskType: '資材補充',
    shiftType: '通し',
    startTime: '08:00',
    endTime: '17:00',
    allocationStatus: '希望',
    priority: '高',
    appliedRules: ['車両必須', '日次当番'],
    ruleResult: 'OK',
    adjustmentReason: '車両運転可能者として資材補充の終日枠に配置しています。'
  },
  {
    id: 'R0242',
    workDate: '2026-05-15',
    weekday: '金',
    employeeName: '高橋 美咲',
    team: '江別支援チーム',
    customerName: 'TASさま',
    projectName: '江別サテライト支援',
    assignedSite: '江別サテライト拠点',
    roleName: '車両担当',
    taskType: '機材搬送',
    shiftType: '午前',
    startTime: '08:00',
    endTime: '12:00',
    allocationStatus: '調整中',
    priority: '高',
    appliedRules: ['車両必須', '遠方現場偏り防止'],
    ruleResult: '要調整',
    adjustmentReason: '車両担当の候補者不足のため代替要員の確保が必要です。'
  },
  {
    id: 'R0306',
    workDate: '2026-05-15',
    weekday: '金',
    employeeName: '渡辺 恒一',
    team: '北広島夜間チーム',
    customerName: '北都サービス株式会社',
    projectName: '夜間点検支援',
    assignedSite: '北広島機材センター',
    roleName: '鍵閉め',
    taskType: '夜間巡回',
    shiftType: '午後',
    startTime: '13:00',
    endTime: '17:00',
    allocationStatus: '要調整',
    priority: '高',
    appliedRules: ['配置配慮ルール', '直接指揮を避ける'],
    ruleResult: '管理者確認',
    adjustmentReason: '配置配慮ルールにより、管理者確認後に最終確定します。'
  },
  {
    id: 'R0330',
    workDate: '2026-05-15',
    weekday: '金',
    employeeName: '長谷川 望',
    team: '札幌第2チーム',
    customerName: 'TASさま',
    projectName: '札幌中央 定常運用',
    assignedSite: '札幌中央オフィス',
    roleName: '作業担当',
    taskType: '帳票整理',
    shiftType: '通し',
    startTime: '08:00',
    endTime: '17:00',
    allocationStatus: '希望',
    priority: '中',
    appliedRules: ['日次当番'],
    ruleResult: 'OK',
    adjustmentReason: '当番ローテーションに沿って帳票整理枠へ配置しています。'
  },
  {
    id: 'R0392',
    workDate: '2026-05-15',
    weekday: '金',
    employeeName: '工藤 遥',
    team: '江別支援チーム',
    customerName: 'TASさま',
    projectName: '江別サテライト支援',
    assignedSite: '江別サテライト拠点',
    roleName: '作業担当',
    taskType: '現場立会い',
    shiftType: '午後',
    startTime: '13:00',
    endTime: '17:00',
    allocationStatus: '希望',
    priority: '高',
    appliedRules: ['同一現場を避ける', '遠方現場偏り防止'],
    ruleResult: '警告',
    adjustmentReason: '同一現場の連続配置を回避しましたが、遠方現場偏りの警告が残っています。'
  }
];

export const provisionalReplacementCandidates: Record<string, string[]> = {
  R0001: ['中村 健', '阿部 誠', '石川 大和'],
  R0242: ['小林 菜々', '工藤 遥', '西村 愛']
};

export const provisionalSiteCandidates: Record<string, string[]> = {
  R0001: ['札幌中央オフィス', '江別サテライト拠点', '北広島機材センター'],
  R0242: ['江別サテライト拠点', '札幌中央オフィス', '北広島機材センター']
};
