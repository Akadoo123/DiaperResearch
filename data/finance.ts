/** Unit economics ต่อชิ้น (Demo, บาท) */
export const unitEconomicsDefaults = {
  sellingPrice: 10,
  cogs: 4.5,
  packaging: 0.4,
  shipping: 1.2,
  marketplaceFee: 1.0,
  paymentFee: 0.2,
  promotion: 0.6,
  advertising: 0.9,
};

export const channelMargin = [
  { channel: "D2C Online (LINE/เว็บ)", gm: 55, cm: 38 },
  { channel: "Marketplace", gm: 50, cm: 28 },
  { channel: "ร้านขายยา", gm: 42, cm: 30 },
  { channel: "Distributor", gm: 35, cm: 25 },
  { channel: "Nursing home B2B", gm: 40, cm: 30 },
  { channel: "โรงพยาบาล (Tender)", gm: 30, cm: 22 },
  { channel: "Modern Trade", gm: 28, cm: 16 },
];

export interface FinScenario {
  name: string;
  tone: "leaf" | "brand" | "danger";
  monthlyUnits: number;
  asp: number;
  cogs: number;
  marketingCost: number; // บาท/เดือน
  opCost: number; // บาท/เดือน
  inventoryMonths: number;
}

export const finScenarios: FinScenario[] = [
  { name: "Best Case", tone: "leaf", monthlyUnits: 90000, asp: 10.5, cogs: 4.3, marketingCost: 180000, opCost: 220000, inventoryMonths: 2 },
  { name: "Base Case", tone: "brand", monthlyUnits: 55000, asp: 10.0, cogs: 4.5, marketingCost: 150000, opCost: 200000, inventoryMonths: 2.5 },
  { name: "Worst Case", tone: "danger", monthlyUnits: 28000, asp: 9.5, cogs: 4.8, marketingCost: 130000, opCost: 190000, inventoryMonths: 3 },
];

export const financeInsights = {
  gmNeeded: "ต้องได้ Gross Margin ≥ 45% เพื่อรองรับค่าโฆษณาและโลจิสติกส์",
  mostProfitable: "D2C Online (LINE OA / เว็บไซต์) ให้ Margin สูงสุดแต่ Volume จำกัด",
  volumeLowMargin: "Distributor / Modern Trade / โรงพยาบาล ให้ปริมาณแต่ Margin ต่ำ",
  cashRisk: "เงินทุนจมในสต๊อก (สินค้า bulky) + เครดิตเทอม B2B ยาว เป็นความเสี่ยง cashflow หลัก",
  initialCapital: "ประเมินเงินลงทุนเริ่มต้น 3-5 ล้านบาท (สต๊อก + การตลาด + เงินทุนหมุนเวียน)",
};

export const initialCapital = [
  { item: "สต๊อกสินค้าเริ่มต้น", amount: 1800000 },
  { item: "การตลาด/โฆษณา (6 เดือน)", amount: 900000 },
  { item: "เงินทุนหมุนเวียน (เครดิต B2B)", amount: 800000 },
  { item: "บรรจุภัณฑ์/แบรนด์/ถ่ายภาพ", amount: 250000 },
  { item: "ระบบ/ทีม/สำรอง", amount: 750000 },
];
