export const regulationChecklist = [
  { item: "การจัดประเภทสินค้าในไทย (เครื่องสำอาง/เครื่องมือแพทย์/สินค้าทั่วไป)", status: "needs", note: "ต้องตรวจสอบกับ อย. / ที่ปรึกษา" },
  { item: "ต้องขึ้นทะเบียน อย. หรือไม่", status: "needs", note: "ผ้าอ้อมทั่วไปอาจไม่ใช่เครื่องมือแพทย์ — ต้องยืนยัน" },
  { item: "ข้อกำหนดฉลาก (ภาษาไทย/ส่วนประกอบ/ผู้นำเข้า)", status: "needs", note: "ตรวจสอบ พ.ร.บ.ฉลาก/สคบ." },
  { item: "ข้อกำหนดการนำเข้า (พิกัดศุลกากร/เอกสาร)", status: "needs", note: "ตรวจสอบกับชิปปิ้ง/กรมศุลกากร" },
  { item: "ข้อจำกัดการกล่าวอ้างโฆษณา (ห้ามอ้างสรรพคุณการแพทย์เกินจริง)", status: "needs", note: "เสี่ยงผิดกฎหมายโฆษณา" },
  { item: "การรับรองคุณภาพที่สร้างความเชื่อมั่น (ISO/มอก.)", status: "optional", note: "ช่วยขาย B2B/รพ." },
  { item: "การทดสอบสินค้า (ซึมซับ/ความปลอดภัยผิว)", status: "recommended", note: "ใช้สนับสนุนการเคลม" },
  { item: "ความเสี่ยงการกล่าวอ้างทางการแพทย์", status: "needs", note: "หลีกเลี่ยงคำว่า 'รักษา/ป้องกันโรค'" },
];

export interface SourcingOption {
  name: string;
  moq: string;
  cost: string;
  qc: string;
  leadTime: string;
  workingCapital: string;
  customization: string;
  risk: string;
  scalability: number; // 1-10
}

export const sourcingOptions: SourcingOption[] = [
  { name: "นำเข้าสำเร็จรูปจากจีน", moq: "ปานกลาง", cost: "ต่ำ", qc: "ผันผวน", leadTime: "30-45 วัน", workingCapital: "ปานกลาง", customization: "ต่ำ-ปานกลาง", risk: "คุณภาพ/รีวิวลบ", scalability: 7 },
  { name: "นำเข้าจากญี่ปุ่น/เกาหลี", moq: "สูง", cost: "สูง", qc: "ดีมาก", leadTime: "45-60 วัน", workingCapital: "สูง", customization: "ต่ำ", risk: "ต้นทุนสูง/แข่งยาก", scalability: 6 },
  { name: "OEM ผลิตในไทย", moq: "ปานกลาง", cost: "ปานกลาง", qc: "ควบคุมได้", leadTime: "30-45 วัน", workingCapital: "ปานกลาง", customization: "สูง", risk: "หาโรงงานที่ดีได้ยาก", scalability: 8 },
  { name: "OEM จากจีน", moq: "ปานกลาง-สูง", cost: "ต่ำ-ปานกลาง", qc: "ต้องคุมเข้ม", leadTime: "35-50 วัน", workingCapital: "ปานกลาง", customization: "สูง", risk: "QC/ระยะไกล", scalability: 8 },
  { name: "ผลิตเอง (Own factory)", moq: "ลงทุนสูง", cost: "ต่ำ (ระยะยาว)", qc: "ควบคุมเต็มที่", leadTime: "ยาว (ตั้งโรงงาน)", workingCapital: "สูงมาก", customization: "สูงสุด", risk: "เงินลงทุน/ความเสี่ยงสูง", scalability: 9 },
  { name: "Private label จากซัพพลายเออร์เดิม", moq: "ต่ำ-ปานกลาง", cost: "ปานกลาง", qc: "พึ่งซัพพลายเออร์", leadTime: "20-35 วัน", workingCapital: "ต่ำ", customization: "ปานกลาง", risk: "พึ่งพาซัพพลายเออร์", scalability: 7 },
];

/** Sourcing decision matrix scores (1-10) */
export const sourcingDecision = [
  { axis: "ต้นทุน", thai_oem: 6, china_import: 9, private_label: 7 },
  { axis: "คุณภาพ", thai_oem: 8, china_import: 5, private_label: 6 },
  { axis: "ความเร็ว", thai_oem: 7, china_import: 6, private_label: 8 },
  { axis: "เงินทุนต่ำ", thai_oem: 5, china_import: 6, private_label: 9 },
  { axis: "ปรับแต่งได้", thai_oem: 8, china_import: 7, private_label: 5 },
  { axis: "ขยายได้", thai_oem: 8, china_import: 7, private_label: 6 },
];

export const qcChecklist = [
  "ทดสอบความเร็ว/ปริมาณการซึมซับ",
  "ทดสอบการรั่วซึมและความแห้งผิว",
  "ตรวจความแข็งแรงของเทป/ตะเข็บ",
  "ตรวจความสม่ำเสมอของขนาด (Sizing)",
  "ทดสอบความปลอดภัยต่อผิว (ผื่น)",
  "ตรวจสอบกลิ่นและการระบายอากาศ",
  "สุ่มตรวจ defect ทุกล็อต",
];

export const recommendedSourcing =
  "เริ่มจาก Private label / OEM จากซัพพลายเออร์ที่มีคุณภาพคงที่ เพื่อทดสอบตลาดด้วยเงินทุนต่ำและ MOQ ที่จัดการได้ ก่อนตัดสินใจลงทุน OEM เฉพาะแบรนด์หรือผลิตเองเมื่อพิสูจน์ยอดแล้ว";
