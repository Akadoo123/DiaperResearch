/** ข้อมูลหน้า Executive Summary — ตัวเลขทั้งหมดเป็นข้อมูลตัวอย่าง (Demo) */

export const marketAttractivenessScore = 7.2; // 1-10

export const opportunityCards = [
  {
    title: "Aging Society ดันความต้องการระยะยาว",
    desc: "ไทยเข้าสู่สังคมสูงวัยสมบูรณ์ ประชากร 60+ เพิ่มต่อเนื่อง ทำให้ฐานผู้ใช้โตเชิงโครงสร้าง",
    icon: "trend",
  },
  {
    title: "สินค้าเป็น Repeat Purchase",
    desc: "ผ้าอ้อมเป็นของใช้สิ้นเปลืองรายวัน เกิดการซื้อซ้ำสูง เหมาะกับโมเดล Subscription",
    icon: "repeat",
  },
  {
    title: "B2B สร้าง Volume ได้",
    desc: "Nursing home / โรงพยาบาล ใช้ปริมาณมากต่อเดือน ช่วยสร้างฐานยอดขายที่คาดการณ์ได้",
    icon: "building",
  },
  {
    title: "Online / Subscription เก็บ Margin เองได้",
    desc: "ขายตรงผ่าน Marketplace และ LINE OA ลดการพึ่งคนกลาง ทำให้คุม Margin ได้ดีกว่า",
    icon: "wallet",
  },
];

export const concernCards = [
  {
    title: "แข่งขันด้านราคาสูง",
    desc: "ตลาดมีสินค้านำเข้าราคาถูกจำนวนมาก เสี่ยงเข้าสู่สงครามราคาถ้าไม่มีจุดต่าง",
    icon: "price",
  },
  {
    title: "แบรนด์ใหญ่มีความน่าเชื่อถือ",
    desc: "ผู้บริโภคไว้ใจแบรนด์ที่คุ้นเคย แบรนด์ใหม่ต้องใช้เวลาและงบสร้างความเชื่อมั่น",
    icon: "shield",
  },
  {
    title: "ความเสี่ยงเรื่องคุณภาพ",
    desc: "ปัญหารั่ว ซึมซับไม่ดี ผื่น และรีวิวลบ ส่งผลต่อความน่าเชื่อถือทันที",
    icon: "alert",
  },
  {
    title: "สินค้า Bulky เงินทุนจม",
    desc: "สินค้าชิ้นใหญ่ น้ำหนักมาก ทำให้ค่าขนส่งสูงและเงินทุนจมในสต๊อก/โลจิสติกส์",
    icon: "box",
  },
];

export const finalRecommendation = {
  decision: "ควรเข้า — แต่ต้อง Validate ก่อนลงเงินก้อนใหญ่",
  decisionTone: "warn" as const,
  firstSegment: "Family Caregiver (ลูกหลานที่ซื้อให้พ่อแม่) ที่ซื้อออนไลน์",
  heroProduct: "ผ้าอ้อมแบบเทปซึมซับสูง สำหรับกลางคืน (Overnight) + Caregiver Bundle",
  firstChannel: "Online Marketplace (Shopee / Lazada / TikTok Shop) + Subscription Trial",
  mustValidate: [
    "ราคาต่อชิ้นจริงและช่องว่างราคาในแต่ละช่องทาง",
    "ต้นทุน OEM/นำเข้า, MOQ และ Lead time จริง",
    "อัตราการซื้อซ้ำและ Subscription conversion จากกลุ่ม Caregiver",
    "ความต้องการและเงื่อนไขเครดิตของ Nursing home (B2B pilot)",
  ],
};

/** คะแนนมิติโอกาส (Opportunity Score) — สำหรับ Radar/Bar chart */
export const opportunityScores = [
  { axis: "Market Size", value: 8 },
  { axis: "Growth", value: 8 },
  { axis: "Margin Potential", value: 6 },
  { axis: "Differentiation", value: 5 },
  { axis: "Channel Access", value: 7 },
  { axis: "Brand Building", value: 5 },
  { axis: "B2B Scalability", value: 7 },
  { axis: "B2C Scalability", value: 8 },
  { axis: "Risk Level (กลับด้าน)", value: 5 },
  { axis: "Working Capital Ease", value: 4 },
];

export const execKpis = {
  tam: 32000, // ล้านบาท/ปี (demo)
  sam: 9600, // ล้านบาท/ปี
  som: 480, // ล้านบาท/ปี (ปีที่ 1-3)
  grossMarginTarget: 45, // %
  topSegment: "Family Caregiver",
  topRisk: "สงครามราคา + รีวิวลบ",
  goNoGo: "ควร Validate ก่อนเข้า",
};
