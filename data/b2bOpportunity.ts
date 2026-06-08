export interface B2BSegment {
  name: string;
  buyer: string;
  decisionMaker: string;
  criteria: string;
  monthlyVolume: string;
  priceSens: "ต่ำ" | "ปานกลาง" | "สูง";
  creditTerm: string;
  salesCycle: string;
  marginExp: string;
  barriers: string;
  documents: string;
  score: number; // 1-10
}

export const b2bSegments: B2BSegment[] = [
  { name: "Nursing home", buyer: "ฝ่ายจัดซื้อ", decisionMaker: "ผู้บริหารศูนย์", criteria: "ราคา/คุณภาพ/ส่งตรงเวลา", monthlyVolume: "5,000-15,000 ชิ้น", priceSens: "สูง", creditTerm: "30-60 วัน", salesCycle: "1-2 เดือน", marginExp: "ปานกลาง", barriers: "ความไว้ใจ/ตัวอย่าง", documents: "ใบเสนอราคา/ใบรับรอง", score: 8 },
  { name: "ศูนย์ดูแลผู้สูงอายุ", buyer: "ผู้จัดการ", decisionMaker: "เจ้าของ", criteria: "คุ้มค่า/ใช้ง่าย", monthlyVolume: "3,000-8,000 ชิ้น", priceSens: "สูง", creditTerm: "30 วัน", salesCycle: "1 เดือน", marginExp: "ปานกลาง", barriers: "งบจำกัด", documents: "ใบเสนอราคา", score: 7 },
  { name: "โรงพยาบาล", buyer: "ฝ่ายจัดซื้อ/เภสัช", decisionMaker: "กก.จัดซื้อ", criteria: "ผ่านสเปก/ประมูล", monthlyVolume: "10,000-50,000 ชิ้น", priceSens: "สูง", creditTerm: "60-120 วัน", salesCycle: "3-6 เดือน", marginExp: "ต่ำ", barriers: "ประมูล/เครดิตยาว", documents: "อย./ISO/เอกสารประมูล", score: 5 },
  { name: "คลินิก", buyer: "เจ้าของคลินิก", decisionMaker: "แพทย์เจ้าของ", criteria: "คุณภาพ/ราคา", monthlyVolume: "500-2,000 ชิ้น", priceSens: "ปานกลาง", creditTerm: "30 วัน", salesCycle: "1 เดือน", marginExp: "ปานกลาง", barriers: "ปริมาณน้อย", documents: "ใบเสนอราคา", score: 5 },
  { name: "Home care agency", buyer: "ผู้จัดการ", decisionMaker: "เจ้าของ", criteria: "ใช้ง่าย/ส่งสะดวก", monthlyVolume: "2,000-6,000 ชิ้น", priceSens: "ปานกลาง", creditTerm: "30 วัน", salesCycle: "1 เดือน", marginExp: "ปานกลาง", barriers: "กระจายตัว", documents: "ใบเสนอราคา", score: 7 },
  { name: "ร้านเวชภัณฑ์", buyer: "เจ้าของร้าน", decisionMaker: "เจ้าของ", criteria: "Margin/หมุนเร็ว", monthlyVolume: "1,000-5,000 ชิ้น", priceSens: "ปานกลาง", creditTerm: "30 วัน", salesCycle: "2-4 สัปดาห์", marginExp: "ปานกลาง", barriers: "พื้นที่ชั้นวาง", documents: "ใบเสนอราคา", score: 6 },
  { name: "จัดซื้อภาครัฐ", buyer: "หน่วยจัดซื้อรัฐ", decisionMaker: "คณะกรรมการ", criteria: "ราคาประมูล/สเปก", monthlyVolume: "สูงมาก (สัญญา)", priceSens: "สูง", creditTerm: "90-120 วัน", salesCycle: "6-12 เดือน", marginExp: "ต่ำ", barriers: "ขั้นตอน/เครดิต", documents: "อย./e-bidding", score: 4 },
  { name: "NGO / มูลนิธิ", buyer: "ฝ่ายจัดหา", decisionMaker: "กรรมการมูลนิธิ", criteria: "ราคา/บริจาค", monthlyVolume: "ผันผวน", priceSens: "สูง", creditTerm: "30-60 วัน", salesCycle: "1-3 เดือน", marginExp: "ต่ำ", barriers: "งบจำกัด", documents: "ใบเสนอราคา", score: 4 },
  { name: "สวัสดิการองค์กร", buyer: "ฝ่าย HR/จัดซื้อ", decisionMaker: "ผู้บริหาร", criteria: "สวัสดิการพนักงาน", monthlyVolume: "ผันผวน", priceSens: "ปานกลาง", creditTerm: "30-60 วัน", salesCycle: "2-3 เดือน", marginExp: "ปานกลาง", barriers: "เข้าถึงยาก", documents: "ใบเสนอราคา", score: 5 },
];

export const b2bFunnel = [
  { stage: "Prospect List", value: 100 },
  { stage: "ติดต่อ/นัดหมาย", value: 55 },
  { stage: "ส่งตัวอย่าง/ทดลอง", value: 30 },
  { stage: "เสนอราคา/เจรจา", value: 18 },
  { stage: "ปิดการขาย (สัญญา)", value: 9 },
];

export const procurementSteps = [
  "ระบุความต้องการและปริมาณ",
  "ขอตัวอย่าง/ทดสอบสินค้า",
  "เปรียบเทียบราคา/ผู้ขาย",
  "ตรวจเอกสาร (อย./ใบรับรอง)",
  "เจรจาเครดิตเทอม",
  "ทำสัญญา/PO",
  "ส่งมอบและประเมินซ้ำ",
];

export const b2bPackages = [
  "Nursing home bulk pack (ลังขายส่ง)",
  "สัญญาจัดส่งรายเดือน (Monthly contract)",
  "Trial pack สำหรับผู้ดูแล",
  "Bundle ผ้าอ้อม + Underpad",
  "Private label สำหรับศูนย์ดูแล",
  "คู่มือ + อบรมการใช้สินค้าให้พนักงาน",
  "Bedridden care bundle ครบชุด",
];

export const b2bPitch =
  "พาร์ตเนอร์จัดหาสินค้าดูแลผู้สูงอายุที่ช่วยศูนย์ของคุณ 'ลดต้นทุนรวม ลดการเปลี่ยนบ่อย และลดปัญหาผื่น/รั่ว' พร้อมส่งตรงเวลาและเครดิตเทอมที่ยืดหยุ่น — เริ่มจาก Pilot 1 เดือนเพื่อพิสูจน์ผลก่อนทำสัญญา";
