export type AllocationStatus = '希望' | '仮割当' | '要調整';
export type PriorityLevel = '高' | '中' | '低';

export type AutoShiftRow = {
  id: string;
  workDate: string;
  weekday: string;
  employeeName: string;
  team: string;
  assignedSite: string;
  taskType: string;
  shiftType: string;
  startTime: string;
  endTime: string;
  allocationStatus: AllocationStatus;
  priority: PriorityLevel;
};

export const autoShiftRows: AutoShiftRow[] = [
  { id: 'R0001', workDate: '2026-05-22', weekday: '金', employeeName: '藤田 健太', team: '機械班', assignedSite: '第3圃場', taskType: '定植', shiftType: '早朝', startTime: '05:00', endTime: '09:00', allocationStatus: '仮割当', priority: '高' },
  { id: 'R0012', workDate: '2026-05-22', weekday: '金', employeeName: '中村 健', team: '機械班', assignedSite: 'ハウスB', taskType: '灌水管理', shiftType: '午前', startTime: '08:00', endTime: '12:00', allocationStatus: '希望', priority: '高' },
  { id: 'R0066', workDate: '2026-05-22', weekday: '金', employeeName: '小林 菜々', team: '選果班', assignedSite: '選果場', taskType: '箱詰め', shiftType: '午前', startTime: '08:00', endTime: '12:00', allocationStatus: '希望', priority: '中' },
  { id: 'R0081', workDate: '2026-05-22', weekday: '金', employeeName: '西村 愛', team: 'ハウス班', assignedSite: '露地西区画', taskType: '定植', shiftType: '通し', startTime: '08:00', endTime: '17:00', allocationStatus: '希望', priority: '中' },
  { id: 'R0108', workDate: '2026-05-21', weekday: '木', employeeName: '石川 大和', team: '機械班', assignedSite: '第2圃場', taskType: '草刈り', shiftType: '早朝', startTime: '05:00', endTime: '09:00', allocationStatus: '希望', priority: '中' },
  { id: 'R0124', workDate: '2026-05-21', weekday: '木', employeeName: '木村 咲', team: 'ハウス班', assignedSite: 'ハウスB', taskType: '灌水管理', shiftType: '午後', startTime: '13:00', endTime: '17:00', allocationStatus: '希望', priority: '高' },
  { id: 'R0200', workDate: '2026-05-19', weekday: '火', employeeName: '後藤 結衣', team: 'ハウス班', assignedSite: '選果場', taskType: '箱詰め', shiftType: '午前', startTime: '08:00', endTime: '12:00', allocationStatus: '希望', priority: '高' },
  { id: 'R0215', workDate: '2026-05-19', weekday: '火', employeeName: '佐藤 大輔', team: '収穫班', assignedSite: '露地西区画', taskType: '農薬散布', shiftType: '通し', startTime: '08:00', endTime: '17:00', allocationStatus: '希望', priority: '高' },
  { id: 'R0242', workDate: '2026-05-15', weekday: '金', employeeName: '高橋 美咲', team: '選果班', assignedSite: '低温倉庫', taskType: '出荷準備', shiftType: '午前', startTime: '08:00', endTime: '12:00', allocationStatus: '仮割当', priority: '高' },
  { id: 'R0306', workDate: '2026-05-15', weekday: '金', employeeName: '渡辺 恒一', team: '出荷班', assignedSite: '露地西区画', taskType: '農薬散布', shiftType: '午後', startTime: '13:00', endTime: '17:00', allocationStatus: '要調整', priority: '高' },
  { id: 'R0330', workDate: '2026-05-15', weekday: '金', employeeName: '長谷川 望', team: '選果班', assignedSite: '第3圃場', taskType: '定植', shiftType: '通し', startTime: '08:00', endTime: '17:00', allocationStatus: '希望', priority: '中' },
  { id: 'R0392', workDate: '2026-05-15', weekday: '金', employeeName: '工藤 遥', team: '出荷班', assignedSite: '集荷場', taskType: '出荷準備', shiftType: '午後', startTime: '13:00', endTime: '17:00', allocationStatus: '希望', priority: '高' }
];

export const provisionalReplacementCandidates: Record<string, string[]> = {
  R0001: ['中村 健', '阿部 誠', '石川 大和'],
  R0242: ['小林 菜々', '工藤 遥', '西村 愛']
};

export const provisionalSiteCandidates: Record<string, string[]> = {
  R0001: ['第3圃場', '第2圃場', '露地西区画'],
  R0242: ['低温倉庫', '集荷場', '選果場']
};
