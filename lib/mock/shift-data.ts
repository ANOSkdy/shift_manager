export type AvailabilityRecord = {
  id: string;
  staffName: string;
  day: string;
  time: string;
  site: string;
  overlap: boolean;
  status: "提出済み" | "未提出";
  notes: string;
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
  type: "不足" | "競合" | "希望未反映";
  message: string;
};

export const targetWeek = "2026/04/13 週";

export const availabilityRecords: AvailabilityRecord[] = [
  {
    id: "a1",
    staffName: "佐藤 由美",
    day: "月",
    time: "09:00-17:00",
    site: "渋谷",
    overlap: false,
    status: "提出済み",
    notes: "午前優先",
  },
  {
    id: "a2",
    staffName: "鈴木 健",
    day: "火",
    time: "13:00-21:00",
    site: "新宿",
    overlap: true,
    status: "提出済み",
    notes: "19時以降は不可",
  },
  {
    id: "a3",
    staffName: "高橋 杏",
    day: "水",
    time: "09:00-13:00",
    site: "池袋",
    overlap: false,
    status: "未提出",
    notes: "",
  },
  {
    id: "a4",
    staffName: "伊藤 優",
    day: "木",
    time: "17:00-21:00",
    site: "渋谷",
    overlap: false,
    status: "提出済み",
    notes: "終電考慮",
  },
  {
    id: "a5",
    staffName: "中村 海",
    day: "金",
    time: "09:00-17:00",
    site: "新宿",
    overlap: true,
    status: "提出済み",
    notes: "他拠点と重複可能性",
  },
];

export const autoScheduleSlots: ScheduleSlot[] = [
  {
    id: "s1",
    day: "月",
    site: "渋谷",
    time: "09:00-13:00",
    assigned: ["佐藤 由美"],
    required: 2,
  },
  {
    id: "s2",
    day: "月",
    site: "渋谷",
    time: "13:00-17:00",
    assigned: ["佐藤 由美", "伊藤 優"],
    required: 2,
  },
  {
    id: "s3",
    day: "火",
    site: "新宿",
    time: "13:00-17:00",
    assigned: ["鈴木 健"],
    required: 2,
  },
  {
    id: "s4",
    day: "金",
    site: "新宿",
    time: "17:00-21:00",
    assigned: ["中村 海"],
    required: 1,
  },
];

export const warnings: WarningItem[] = [
  { id: "w1", type: "不足", message: "月曜 渋谷 09:00-13:00 が1名不足" },
  { id: "w2", type: "競合", message: "鈴木 健の希望時間に重複候補あり" },
  { id: "w3", type: "希望未反映", message: "高橋 杏の水曜希望が未反映" },
];

export const replacementCandidates: Record<string, string[]> = {
  s1: ["中村 海", "高橋 杏"],
  s3: ["伊藤 優", "佐藤 由美"],
};

export const finalizedSummary = {
  deliveredAt: "2026/04/05 10:30",
  affectedStaffCount: 12,
  totalSlots: 18,
  resolvedWarnings: 2,
  remainingWarnings: 1,
};
