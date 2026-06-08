export interface Risk {
  id: string;
  name: string;
  category: "product" | "finance" | "channel" | "regulation" | "market";
  probability: number; // 1-5
  impact: number; // 1-5
  warning: string;
  mitigation: string;
  owner: string;
}

export const risks: Risk[] = [
  { id: "price-war", name: "สงครามราคา", category: "market", probability: 5, impact: 4, warning: "คู่แข่งลดราคาต่อเนื่อง", mitigation: "ใช้จุดต่าง (Overnight/Bundle) เลี่ยงแข่งราคาตรง", owner: "Marketing" },
  { id: "incumbent", name: "แบรนด์ใหญ่แข็งแกร่ง", category: "market", probability: 4, impact: 4, warning: "ส่วนแบ่งไม่ขยับ", mitigation: "เจาะ niche caregiver/B2B ก่อน", owner: "Strategy" },
  { id: "low-diff", name: "จุดต่างต่ำ", category: "product", probability: 4, impact: 4, warning: "ลูกค้าเทียบที่ราคาอย่างเดียว", mitigation: "สร้างจุดต่างที่พิสูจน์ได้", owner: "Product" },
  { id: "leakage", name: "ปัญหารั่วซึม", category: "product", probability: 3, impact: 5, warning: "รีวิวเรื่องรั่วเพิ่ม", mitigation: "QC เข้ม + ทดสอบก่อนขาย", owner: "QC" },
  { id: "rash", name: "ผื่น/ระคายผิว", category: "product", probability: 3, impact: 5, warning: "ร้องเรียนเรื่องผื่น", mitigation: "เลือกวัสดุระบายอากาศ ทดสอบผิว", owner: "QC" },
  { id: "neg-review", name: "รีวิวลบออนไลน์", category: "channel", probability: 4, impact: 4, warning: "คะแนนรีวิวตก", mitigation: "ระบบดูแลลูกค้า/รับคืน", owner: "CX" },
  { id: "shipping", name: "ค่าขนส่งสูง (bulky)", category: "finance", probability: 4, impact: 3, warning: "ค่าส่งกินมาร์จิน", mitigation: "Optimize แพ็ค/คลังกระจาย", owner: "Ops" },
  { id: "inventory", name: "เงินทุนจมในสต๊อก", category: "finance", probability: 4, impact: 4, warning: "Inventory turnover ต่ำ", mitigation: "เริ่ม MOQ ต่ำ/Private label", owner: "Finance" },
  { id: "slow-stock", name: "สินค้าค้างสต๊อก", category: "finance", probability: 3, impact: 3, warning: "SKU บางตัวไม่ขาย", mitigation: "จำกัด SKU เริ่มต้น", owner: "Product" },
  { id: "ad-cost", name: "ค่าโฆษณา Marketplace สูง", category: "channel", probability: 4, impact: 3, warning: "CAC พุ่ง", mitigation: "เน้น repeat/subscription ลดพึ่งโฆษณา", owner: "Marketing" },
  { id: "distributor", name: "Distributor กดมาร์จิน", category: "channel", probability: 3, impact: 3, warning: "ขอส่วนลดเพิ่ม", mitigation: "รักษาช่องทาง D2C คู่ขนาน", owner: "Sales" },
  { id: "credit", name: "เครดิตเทอม B2B ยาว", category: "finance", probability: 4, impact: 4, warning: "ลูกหนี้ค้างนาน", mitigation: "จำกัดวงเงิน/มัดจำ", owner: "Finance" },
  { id: "regulation", name: "ความไม่ชัดเจนของกฎระเบียบ", category: "regulation", probability: 3, impact: 3, warning: "ข้อกำหนด อย./ฉลากเปลี่ยน", mitigation: "ปรึกษาที่ปรึกษากฎหมาย", owner: "Legal" },
  { id: "oem-qc", name: "คุณภาพ OEM ไม่สม่ำเสมอ", category: "product", probability: 3, impact: 4, warning: "defect ต่อล็อตสูง", mitigation: "สุ่มตรวจทุกล็อต/มี backup supplier", owner: "QC" },
  { id: "cashflow", name: "แรงกดดัน Cashflow", category: "finance", probability: 4, impact: 5, warning: "เงินสดหมุนตึง", mitigation: "คุมสต๊อก+เครดิต+สำรองเงิน", owner: "Finance" },
  { id: "trust", name: "สร้างความเชื่อมั่นยาก", category: "market", probability: 4, impact: 4, warning: "Conversion ต่ำ", mitigation: "ใช้รีวิว/เภสัช/ตัวอย่างฟรี", owner: "Marketing" },
  { id: "caregiver-resist", name: "ผู้ดูแลไม่อยากเปลี่ยนแบรนด์", category: "market", probability: 3, impact: 3, warning: "Trial conversion ต่ำ", mitigation: "ตัวอย่างฟรี/รับประกันความพอใจ", owner: "Marketing" },
  { id: "sizing", name: "ปัญหาขนาด (Sizing)", category: "product", probability: 3, impact: 3, warning: "ร้องเรียนใส่ไม่พอดี", mitigation: "ตารางไซส์ชัดเจน/ตัวอย่าง", owner: "Product" },
  { id: "counterfeit", name: "ของลอกเลียนแบบ", category: "market", probability: 2, impact: 3, warning: "เจอสินค้าปลอม", mitigation: "จดเครื่องหมายการค้า", owner: "Legal" },
  { id: "listing-fee", name: "ค่าวางสินค้า Modern Trade", category: "channel", probability: 3, impact: 4, warning: "ค่าธรรมเนียมสูง", mitigation: "เลื่อน Modern trade ไป Phase 3", owner: "Sales" },
];

export const categoryLabel: Record<Risk["category"], string> = {
  product: "ความเสี่ยงสินค้า",
  finance: "ความเสี่ยงการเงิน",
  channel: "ความเสี่ยงช่องทาง",
  regulation: "ความเสี่ยงกฎระเบียบ",
  market: "ความเสี่ยงตลาด",
};

export const mitigationRoadmap = [
  { phase: "ก่อนลงทุน", action: "QC สเปก + ทดสอบสินค้า + ตรวจกฎระเบียบ + scraping ราคา" },
  { phase: "Pilot", action: "MOQ ต่ำ, ตัวอย่างฟรี, เก็บรีวิว, คุม SKU" },
  { phase: "Scale", action: "กระจายคลัง, คุมเครดิต B2B, สำรองเงินทุนหมุนเวียน" },
];
