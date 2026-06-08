import { DataType } from "@/lib/types";

/** ตัวแปร Top-down (Demo / ต้อง Validate) */
export const topDownDefaults = {
  elderlyPopulation: 13_500_000, // คน
  pctNeedIncontinence: 0.18, // 18%
  pctBedridden: 0.03, // 3% ของผู้สูงอายุ
  diapersPerDay: 3, // ชิ้น/คน/วัน
  pricePerPiece: 9, // บาท/ชิ้น
  days: 365,
};

/** Bottom-up proxies (Demo) */
export const bottomUp = [
  { item: "โรงพยาบาล (รัฐ+เอกชน)", count: 1400, monthlyPerUnit: 12000, unit: "ชิ้น/เดือน" },
  { item: "Nursing home / ศูนย์ดูแล", count: 900, monthlyPerUnit: 9000, unit: "ชิ้น/เดือน" },
  { item: "ผู้ป่วย home care", count: 250000, monthlyPerUnit: 90, unit: "ชิ้น/เดือน" },
  { item: "ร้านขายยา", count: 18000, monthlyPerUnit: 400, unit: "ชิ้น/เดือน" },
  { item: "ร้านเวชภัณฑ์", count: 3500, monthlyPerUnit: 1500, unit: "ชิ้น/เดือน" },
];

export const tamSamSom = {
  tam: 32000, // ล้านบาท/ปี
  sam: 9600,
  som: 480,
  year1: 60, // ล้านบาท
  year3: 240,
};

export interface SizingScenario {
  name: string;
  tone: "leaf" | "brand" | "danger";
  targetUsers: number;
  diapersPerDay: number;
  pricePerPiece: number;
  penetration: number; // %
}

export const scenarios: SizingScenario[] = [
  { name: "Best Case", tone: "leaf", targetUsers: 2_700_000, diapersPerDay: 3.2, pricePerPiece: 10, penetration: 0.6 },
  { name: "Base Case", tone: "brand", targetUsers: 2_400_000, diapersPerDay: 3.0, pricePerPiece: 9, penetration: 0.4 },
  { name: "Worst Case", tone: "danger", targetUsers: 2_000_000, diapersPerDay: 2.6, pricePerPiece: 8, penetration: 0.25 },
];

export const sizingAssumptions: {
  assumption: string;
  value: string;
  source: string;
  confidence: "high" | "medium" | "low";
  dataType: DataType;
}[] = [
  { assumption: "ประชากรผู้สูงอายุ", value: "13.5 ล้านคน", source: "สนง.สถิติแห่งชาติ (ต้องอ้างอิงจริง)", confidence: "medium", dataType: "estimate" },
  { assumption: "% ต้องใช้สินค้า incontinence", value: "18%", source: "ประมาณการจากงานวิจัยต่างประเทศ", confidence: "low", dataType: "assumption" },
  { assumption: "% ผู้ป่วยติดเตียง", value: "3% ของผู้สูงอายุ", source: "ประมาณการ", confidence: "low", dataType: "needs_validation" },
  { assumption: "ผ้าอ้อมต่อคนต่อวัน", value: "3 ชิ้น", source: "Caregiver interview (ต้องเก็บ)", confidence: "low", dataType: "assumption" },
  { assumption: "ราคาเฉลี่ยต่อชิ้น", value: "9 บาท", source: "Marketplace scraping (ต้องทำ)", confidence: "medium", dataType: "estimate" },
  { assumption: "Penetration ปีที่ 1-3", value: "0.5-2%", source: "สมมติฐานเชิงกลยุทธ์", confidence: "low", dataType: "assumption" },
];
