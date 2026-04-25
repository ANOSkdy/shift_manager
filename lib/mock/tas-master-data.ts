export type TasStaffType = '新人' | '経験者' | 'リーダー';
export type TasSeverity = '必須' | '警告' | '推奨' | '管理者確認';
export type TasResult = 'OK' | '警告' | 'NG' | '管理者確認';

export type TasStaffMockRow = {
  id: string;
  name: string;
  staffType: TasStaffType;
  canLead: boolean;
  hasCar: boolean;
  areas: string[];
  skills: string[];
  availableTasks: string[];
  status: '在籍' | '研修中' | '調整中';
  tags: string[];
};

export type TasSiteMockRow = {
  id: string;
  customerName: string;
  projectName: string;
  siteName: string;
  area: string;
  requiredHeadcount: number;
  requiredRoles: string[];
  requiredSkills: string[];
  meetingTime: string;
  note: string;
  tags: string[];
};

export type TasAssignmentRuleRow = {
  id: string;
  ruleName: string;
  target: string;
  ruleType: string;
  severity: TasSeverity;
  condition: string;
  displayMessage: string;
  status: '有効' | '確認中' | '停止';
};

export type TasPairRuleRow = {
  id: string;
  staffA: string;
  staffB: string;
  ruleType: string;
  severity: TasSeverity;
  displayMessage: string;
  status: '有効' | '確認中' | '停止';
};

export type TasDutyRuleRow = {
  id: string;
  dutyName: string;
  target: string;
  frequency: string;
  assignmentMethod: string;
  requiredCount: number;
  exclusionCondition: string;
  status: '有効' | '確認中' | '停止';
};

export type TasRuleCheckMockRow = {
  id: string;
  result: TasResult;
  message: string;
  relatedRule: string;
};

export type TasCandidateReasonRow = {
  id: string;
  staffName: string;
  result: TasResult;
  reason: string;
  tags: string[];
};

export const staffMockRows: TasStaffMockRow[] = [
  {
    id: 'TAS-STF-001',
    name: '佐藤 健太',
    staffType: 'リーダー',
    canLead: true,
    hasCar: true,
    areas: ['札幌中央', '江別'],
    skills: ['現場統括', '顧客連絡', '日報作成'],
    availableTasks: ['開店準備', '鍵閉め', '顧客対応'],
    status: '在籍',
    tags: ['リーダー可', '車両あり', '顧客対応可']
  },
  {
    id: 'TAS-STF-002',
    name: '高橋 美咲',
    staffType: '経験者',
    canLead: true,
    hasCar: false,
    areas: ['札幌中央'],
    skills: ['教育担当', '日報作成'],
    availableTasks: ['教育ペア', '備品確認'],
    status: '在籍',
    tags: ['教育ペア対応', '日報担当可']
  },
  {
    id: 'TAS-STF-003',
    name: '伊藤 遼',
    staffType: '新人',
    canLead: false,
    hasCar: false,
    areas: ['札幌中央'],
    skills: ['基本作業'],
    availableTasks: ['清掃', '備品補充'],
    status: '研修中',
    tags: ['新人', '単独配置不可']
  },
  {
    id: 'TAS-STF-004',
    name: '中村 優',
    staffType: '経験者',
    canLead: false,
    hasCar: true,
    areas: ['江別', '北広島'],
    skills: ['遠方対応', '車両移動'],
    availableTasks: ['遠方現場', 'ゴミ捨て'],
    status: '在籍',
    tags: ['車両あり', '遠方対応可']
  },
  {
    id: 'TAS-STF-005',
    name: '小林 愛',
    staffType: '経験者',
    canLead: false,
    hasCar: false,
    areas: ['札幌中央', '手稲'],
    skills: ['顧客対応', '備品管理'],
    availableTasks: ['顧客連絡', '備品確認'],
    status: '調整中',
    tags: ['顧客対応可', '備品確認可']
  }
];

export const siteMockRows: TasSiteMockRow[] = [
  {
    id: 'TAS-SITE-001',
    customerName: 'TASさま',
    projectName: '札幌中央 定常運用',
    siteName: '札幌中央オフィス',
    area: '札幌中央',
    requiredHeadcount: 4,
    requiredRoles: ['リーダー1名', '経験者2名'],
    requiredSkills: ['顧客対応', '日報作成'],
    meetingTime: '08:30',
    note: '午前帯の問い合わせ対応を優先',
    tags: ['札幌中心部', 'リーダー必須']
  },
  {
    id: 'TAS-SITE-002',
    customerName: 'TASさま',
    projectName: '江別サテライト支援',
    siteName: '江別サテライト拠点',
    area: '江別',
    requiredHeadcount: 3,
    requiredRoles: ['経験者2名'],
    requiredSkills: ['車両移動', '遠方対応'],
    meetingTime: '08:00',
    note: '公共交通の便が少ないため車両あり優先',
    tags: ['遠方', '車両必須']
  },
  {
    id: 'TAS-SITE-003',
    customerName: 'TASさま',
    projectName: '月末集中処理',
    siteName: '札幌西サポートセンター',
    area: '札幌西',
    requiredHeadcount: 5,
    requiredRoles: ['リーダー1名', '経験者3名'],
    requiredSkills: ['進行管理', '顧客連絡'],
    meetingTime: '09:00',
    note: '月末は作業量が増えるため増員前提',
    tags: ['月末高負荷', '経験者優先']
  },
  {
    id: 'TAS-SITE-004',
    customerName: '北都サービス株式会社',
    projectName: '夜間点検支援',
    siteName: '北広島機材センター',
    area: '北広島',
    requiredHeadcount: 2,
    requiredRoles: ['経験者1名'],
    requiredSkills: ['鍵管理', '安全確認'],
    meetingTime: '17:30',
    note: '鍵閉め担当を必ず配置',
    tags: ['車両推奨', '夜間対応']
  }
];

export const assignmentRuleRows: TasAssignmentRuleRow[] = [
  {
    id: 'TAS-RULE-001',
    ruleName: '各現場リーダー1名必須',
    target: '全現場',
    ruleType: '役割必須',
    severity: '必須',
    condition: '各現場にcanLead=trueを1名以上配置',
    displayMessage: '各現場にリーダー1名の配置が必要です。',
    status: '有効'
  },
  {
    id: 'TAS-RULE-002',
    ruleName: '新人単独禁止',
    target: '新人スタッフ',
    ruleType: '単独配置制限',
    severity: '必須',
    condition: 'staffType=新人のみの現場を作成しない',
    displayMessage: '新人のみの配置はできません。経験者またはリーダーを追加してください。',
    status: '有効'
  },
  {
    id: 'TAS-RULE-003',
    ruleName: '江別現場は車両あり必須',
    target: '江別サテライト拠点',
    ruleType: '移動要件',
    severity: '必須',
    condition: 'hasCar=trueのスタッフを1名以上含める',
    displayMessage: '江別現場には車両ありスタッフの配置が必要です。',
    status: '有効'
  },
  {
    id: 'TAS-RULE-004',
    ruleName: '顧客Aは経験者優先',
    target: 'TASさま',
    ruleType: '優先配置',
    severity: '推奨',
    condition: 'staffType=経験者またはリーダーを優先候補にする',
    displayMessage: 'TASさま案件は経験者優先で候補提示します。',
    status: '有効'
  },
  {
    id: 'TAS-RULE-005',
    ruleName: '遠方現場偏り防止',
    target: '遠方現場',
    ruleType: '負荷分散',
    severity: '警告',
    condition: '同一スタッフの遠方現場担当が月3回を超えたら警告',
    displayMessage: '遠方現場担当の偏りが発生しています。',
    status: '有効'
  },
  {
    id: 'TAS-RULE-006',
    ruleName: '顧客指定担当',
    target: '札幌中央オフィス',
    ruleType: '指名配置',
    severity: '推奨',
    condition: '指定スタッフを優先候補として上位表示',
    displayMessage: '顧客指定担当を優先候補に表示しています。',
    status: '確認中'
  },
  {
    id: 'TAS-RULE-007',
    ruleName: '顧客NG担当',
    target: '北都サービス株式会社',
    ruleType: '配置除外',
    severity: '管理者確認',
    condition: '対象スタッフが候補に入る場合は管理者確認を表示',
    displayMessage: '対象スタッフの配置には管理者確認が必要です。',
    status: '有効'
  }
];

export const pairRuleRows: TasPairRuleRow[] = [
  {
    id: 'TAS-PAIR-001',
    staffA: '高橋 美咲',
    staffB: '伊藤 遼',
    ruleType: '教育ペア',
    severity: '推奨',
    displayMessage: '教育ペアとして同一現場への配置を推奨します。',
    status: '有効'
  },
  {
    id: 'TAS-PAIR-002',
    staffA: '佐藤 健太',
    staffB: '中村 優',
    ruleType: '同一現場を避ける',
    severity: '警告',
    displayMessage: '同一現場を避ける配置配慮ルールが設定されています。',
    status: '有効'
  },
  {
    id: 'TAS-PAIR-003',
    staffA: '小林 愛',
    staffB: '伊藤 遼',
    ruleType: '同一時間帯を避ける',
    severity: '管理者確認',
    displayMessage: '同一時間帯の配置時は管理者確認が必要です。',
    status: '有効'
  },
  {
    id: 'TAS-PAIR-004',
    staffA: '佐藤 健太',
    staffB: '小林 愛',
    ruleType: '直接指揮を避ける',
    severity: '管理者確認',
    displayMessage: '直接指揮を避ける配置配慮ルールに該当します。',
    status: '有効'
  },
  {
    id: 'TAS-PAIR-005',
    staffA: '高橋 美咲',
    staffB: '中村 優',
    ruleType: '管理者確認が必要',
    severity: '管理者確認',
    displayMessage: '同一シフト時は管理者確認が必要です。',
    status: '確認中'
  },
  {
    id: 'TAS-PAIR-006',
    staffA: '佐藤 健太',
    staffB: '高橋 美咲',
    ruleType: '推奨ペア',
    severity: '推奨',
    displayMessage: '繁忙帯では推奨ペアとして候補提示します。',
    status: '有効'
  }
];

export const dutyRuleRows: TasDutyRuleRow[] = [
  {
    id: 'TAS-DUTY-001',
    dutyName: 'ゴミ捨て',
    target: '全現場',
    frequency: '毎日',
    assignmentMethod: 'ローテーション',
    requiredCount: 1,
    exclusionCondition: '当日新人のみの場合は経験者へ割当',
    status: '有効'
  },
  {
    id: 'TAS-DUTY-002',
    dutyName: '日報担当',
    target: '札幌中央オフィス',
    frequency: '毎日',
    assignmentMethod: 'スキル優先',
    requiredCount: 1,
    exclusionCondition: '日報作成スキル未登録者は除外',
    status: '有効'
  },
  {
    id: 'TAS-DUTY-003',
    dutyName: '備品確認',
    target: '全現場',
    frequency: '週2回',
    assignmentMethod: '固定担当',
    requiredCount: 1,
    exclusionCondition: '連続2回以上の担当は避ける',
    status: '有効'
  },
  {
    id: 'TAS-DUTY-004',
    dutyName: '顧客連絡',
    target: '顧客窓口案件',
    frequency: '毎日',
    assignmentMethod: '資格優先',
    requiredCount: 1,
    exclusionCondition: '顧客対応スキル未登録者は除外',
    status: '有効'
  },
  {
    id: 'TAS-DUTY-005',
    dutyName: '鍵閉め',
    target: '夜間対応現場',
    frequency: '毎日',
    assignmentMethod: '経験者優先',
    requiredCount: 1,
    exclusionCondition: '新人は単独担当不可',
    status: '有効'
  }
];

export const ruleCheckMockRows: TasRuleCheckMockRow[] = [
  {
    id: 'TAS-CHECK-001',
    result: 'OK',
    message: '必要人数を満たしています。',
    relatedRule: '各現場リーダー1名必須'
  },
  {
    id: 'TAS-CHECK-002',
    result: 'OK',
    message: 'リーダーが1名配置されています。',
    relatedRule: '各現場リーダー1名必須'
  },
  {
    id: 'TAS-CHECK-003',
    result: '警告',
    message: '遠方現場担当が今月3回目です。',
    relatedRule: '遠方現場偏り防止'
  },
  {
    id: 'TAS-CHECK-004',
    result: 'NG',
    message: '新人のみの配置になっています。',
    relatedRule: '新人単独禁止'
  },
  {
    id: 'TAS-CHECK-005',
    result: '管理者確認',
    message: '配置配慮ルールにより管理者確認が必要です。',
    relatedRule: '顧客NG担当'
  }
];

export const candidateReasonRows: TasCandidateReasonRow[] = [
  {
    id: 'TAS-CAND-001',
    staffName: '佐藤 健太',
    result: 'OK',
    reason: 'リーダー可・車両あり・顧客対応可のため優先候補です。',
    tags: ['リーダー可', '車両あり', '顧客対応可']
  },
  {
    id: 'TAS-CAND-002',
    staffName: '伊藤 遼',
    result: 'NG',
    reason: '新人のため単独配置不可です。',
    tags: ['新人', '単独配置不可']
  },
  {
    id: 'TAS-CAND-003',
    staffName: '中村 優',
    result: '警告',
    reason: '遠方現場担当が今月3回目です。',
    tags: ['遠方現場', '偏り警告']
  },
  {
    id: 'TAS-CAND-004',
    staffName: '小林 愛',
    result: '管理者確認',
    reason: '配置配慮ルールに該当するため管理者確認が必要です。',
    tags: ['配置配慮ルール', '管理者確認']
  }
];
