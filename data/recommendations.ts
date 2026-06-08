export const entryDecision = {
  choice: "Enter after validation — เข้าเมื่อ Validate แล้ว",
  tone: "warn" as const,
  rationale:
    "ตลาดโตเชิงโครงสร้างและซื้อซ้ำสูง แต่การแข่งราคาและความเสี่ยงคุณภาพสูง จึงควรพิสูจน์โมเดลด้วยเงินทุนต่ำก่อนลงเงินก้อนใหญ่",
};

export const beachhead = {
  segment: "Family Caregiver / ลูกหลานที่ซื้อให้พ่อแม่ ผ่านออนไลน์",
  why: "Price sensitivity ปานกลาง, ซื้อซ้ำสูง, เข้าถึงผ่าน Marketplace ได้เร็ว, เก็บข้อมูลได้ทันที",
};

export const validation90 = [
  {
    month: "เดือนที่ 1 — เก็บข้อมูลพื้นฐาน",
    items: [
      "Scrape ราคาคู่แข่งทุก Marketplace",
      "สัมภาษณ์ผู้ดูแล 15-20 ราย",
      "ทดสอบสินค้าตัวอย่าง (ซึมซับ/รั่ว/ผื่น)",
      "คัดเลือกซัพพลายเออร์ 3 ราย",
      "ทำ Landing page ทดสอบความสนใจ",
    ],
  },
  {
    month: "เดือนที่ 2 — ทดสอบตลาดจริง",
    items: [
      "สั่งสินค้าตัวอย่างมาทดลองขาย",
      "ทดสอบโฆษณาออนไลน์",
      "แจกตัวอย่างให้กลุ่มผู้ดูแล",
      "เริ่ม Nursing home pilot 1-2 แห่ง",
      "เก็บรีวิว/Feedback",
    ],
  },
  {
    month: "เดือนที่ 3 — พิสูจน์โมเดล",
    items: [
      "ทดสอบการซื้อซ้ำ (Repeat purchase)",
      "Validate Margin จริงทุกช่องทาง",
      "ทดสอบ Subscription",
      "ทดสอบ B2B bulk order",
      "ตัดสินใจ Go / No-Go",
    ],
  },
];

export const kpis = [
  { kpi: "Trial conversion rate", target: "≥ 3%", note: "จากโฆษณาเป็นการทดลองซื้อ" },
  { kpi: "Repeat purchase rate", target: "≥ 35%", note: "ภายใน 60 วัน" },
  { kpi: "CAC", target: "≤ 250 บาท", note: "ต้นทุนหาลูกค้าใหม่" },
  { kpi: "Gross Margin", target: "≥ 45%", note: "หลังหักต้นทุนสินค้า" },
  { kpi: "Complaint rate", target: "≤ 3%", note: "ต่อจำนวนออเดอร์" },
  { kpi: "Leakage complaint", target: "≤ 1.5%", note: "เรื่องรั่วโดยเฉพาะ" },
  { kpi: "Review score", target: "≥ 4.3", note: "คะแนนเฉลี่ย" },
  { kpi: "Subscription conversion", target: "≥ 15%", note: "ของลูกค้าซื้อซ้ำ" },
  { kpi: "B2B pilot conversion", target: "≥ 30%", note: "จาก pilot เป็นสัญญา" },
  { kpi: "Inventory turnover", target: "≥ 4x/ปี", note: "ความเร็วหมุนสต๊อก" },
];

/** Final decision matrix — 1-10 */
export const decisionMatrix = [
  { area: "Market attractiveness", score: 8 },
  { area: "Growth potential", score: 8 },
  { area: "Competitive intensity (กลับด้าน)", score: 4 },
  { area: "Differentiation potential", score: 6 },
  { area: "Margin potential", score: 6 },
  { area: "Channel accessibility", score: 7 },
  { area: "Working capital ease", score: 4 },
  { area: "Product risk (กลับด้าน)", score: 5 },
  { area: "Brand trust ease", score: 5 },
  { area: "Overall opportunity", score: 7 },
];

export const roadmap12 = [
  { period: "เดือน 1-3", focus: "Validate (Online + ตัวอย่าง + Pilot)" },
  { period: "เดือน 4-6", focus: "Launch Hero Product + Subscription" },
  { period: "เดือน 7-9", focus: "ขยายร้านยา/เวชภัณฑ์ + Nursing home" },
  { period: "เดือน 10-12", focus: "Distributor + เตรียม Scale" },
];

export const requiredBudget = "เงินลงทุนเริ่มต้นประมาณ 3-5 ล้านบาท (Validate phase ≈ 0.8-1.2 ล้านบาท)";
