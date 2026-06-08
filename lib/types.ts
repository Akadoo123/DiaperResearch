/** ระบบความน่าเชื่อถือของข้อมูล (Data Confidence System) */

export type DataType =
  | "verified" // ตรวจสอบแล้ว
  | "estimate" // ประมาณการ
  | "assumption" // สมมติฐาน
  | "needs_validation"; // ต้อง Validate เพิ่ม

export type ConfidenceLevel = "high" | "medium" | "low";

/** โครงสร้างข้อมูลมาตรฐานสำหรับทุก data point ที่ต้องอ้างอิงแหล่งที่มา */
export interface DataPoint {
  id: string;
  title: string;
  category: string;
  description?: string;
  value: number | string;
  unit: string;
  source: string;
  sourceUrl?: string;
  confidenceLevel: ConfidenceLevel;
  dataType: DataType;
  lastUpdated: string;
  note?: string;
}

export const dataTypeLabel: Record<DataType, string> = {
  verified: "ตรวจสอบแล้ว",
  estimate: "ประมาณการ",
  assumption: "สมมติฐาน",
  needs_validation: "ต้อง Validate เพิ่ม",
};

export const confidenceLabel: Record<ConfidenceLevel, string> = {
  high: "ความเชื่อมั่นสูง",
  medium: "ความเชื่อมั่นปานกลาง",
  low: "ความเชื่อมั่นต่ำ",
};
