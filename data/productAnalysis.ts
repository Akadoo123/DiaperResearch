export const productCategories = [
  { name: "ผ้าอ้อมผู้ใหญ่แบบเทป", use: "ผู้ป่วยติดเตียง/ช่วยเหลือตัวเองไม่ได้", note: "Hero ที่เป็นไปได้" },
  { name: "ผ้าอ้อมผู้ใหญ่แบบกางเกง", use: "ผู้สูงอายุที่ยังเดินได้", note: "ตลาดใหญ่ แข่งสูง" },
  { name: "แผ่นเสริมซึมซับ", use: "เสริมกับผ้าอ้อมหลัก ลดค่าใช้จ่าย", note: "Margin ดี" },
  { name: "แผ่นรองซับ / Underpad", use: "รองที่นอนผู้ป่วยติดเตียง", note: "เหมาะกับ B2B" },
  { name: "ผ้าอ้อมกลางคืน / Overnight", use: "ลดการเปลี่ยนตอนกลางคืน", note: "จุดต่างชัด" },
  { name: "ผ้าอ้อมซึมซับสูงพิเศษ", use: "ผู้ป่วยปัสสาวะมาก", note: "Premium" },
  { name: "Wet wipes", use: "ทำความสะอาดผิว", note: "Bundle ได้" },
  { name: "Barrier cream", use: "ป้องกันผื่น", note: "Margin สูง" },
  { name: "ถุงทิ้งผ้าอ้อม", use: "จัดการกลิ่น/ขยะ", note: "เสริม Bundle" },
  { name: "Bedridden care bundle", use: "ชุดดูแลผู้ป่วยติดเตียงครบชุด", note: "สร้างมูลค่า" },
];

export const productComparison = [
  {
    type: "ผ้าอ้อมแบบเทป",
    user: "ผู้ป่วยติดเตียง",
    scenario: "ผู้ดูแลเปลี่ยนให้",
    pros: "ใส่ง่ายขณะนอน ซึมซับสูง",
    cons: "ผู้ใช้รู้สึกพึ่งพา",
    priceSens: "ปานกลาง",
    fitNew: "สูง",
  },
  {
    type: "ผ้าอ้อมแบบกางเกง",
    user: "ผู้สูงอายุเดินได้",
    scenario: "ใส่/ถอดเอง",
    pros: "คล่องตัว มีศักดิ์ศรี",
    cons: "แข่งราคาสูง",
    priceSens: "สูง",
    fitNew: "ปานกลาง",
  },
  {
    type: "แผ่นรองซับ Underpad",
    user: "ผู้ป่วยติดเตียง",
    scenario: "รองที่นอน",
    pros: "ลดงานทำความสะอาด",
    cons: "Margin ต่ำกว่า",
    priceSens: "สูง",
    fitNew: "สูง (B2B)",
  },
  {
    type: "ผ้าอ้อม Overnight",
    user: "ทุกกลุ่มตอนกลางคืน",
    scenario: "ใช้ข้ามคืน",
    pros: "ลดการเปลี่ยน รั่วน้อย",
    cons: "ต้นทุนวัสดุสูง",
    priceSens: "ต่ำ",
    fitNew: "สูงมาก",
  },
  {
    type: "Caregiver Bundle",
    user: "ผู้ดูแลที่บ้าน",
    scenario: "ดูแลครบชุด",
    pros: "สร้างมูลค่า/ผูกลูกค้า",
    cons: "จัดการสต๊อกซับซ้อน",
    priceSens: "ต่ำ",
    fitNew: "สูง",
  },
];

/** Feature benchmark — คะแนน 1-5 (Demo) */
export const featureBenchmark = [
  { feature: "ระดับการซึมซับ", brandNew: 4, premium: 5, economy: 3 },
  { feature: "กันรั่ว (Leakage)", brandNew: 4, premium: 5, economy: 2 },
  { feature: "ควบคุมกลิ่น", brandNew: 4, premium: 4, economy: 2 },
  { feature: "ระบายอากาศ", brandNew: 4, premium: 4, economy: 3 },
  { feature: "ป้องกันผื่น", brandNew: 4, premium: 5, economy: 2 },
  { feature: "ความนุ่ม", brandNew: 4, premium: 5, economy: 3 },
  { feature: "ความกระชับเอว", brandNew: 4, premium: 4, economy: 3 },
];

export const heroProducts = [
  { name: "ผ้าอ้อมเทปคุ้มค่า (Value-for-money)", reason: "เข้าตลาดด้วยราคาที่แข่งได้แต่ไม่ถูกสุด", tone: "brand" },
  { name: "Overnight ซึมซับสูง", reason: "จุดต่างชัด ลดการเปลี่ยนกลางคืน Margin ดี", tone: "leaf" },
  { name: "Caregiver Bundle", reason: "ผูกลูกค้า เพิ่ม basket size", tone: "brand" },
  { name: "Subscription Pack รายเดือน", reason: "ล็อกการซื้อซ้ำ คุม cashflow", tone: "leaf" },
  { name: "Nursing Home Bulk Pack", reason: "เจาะ B2B ปริมาณมาก", tone: "warn" },
];

/** Portfolio matrix: X=Price level (0-10), Y=Care complexity (0-10) */
export const portfolioMatrix = [
  { name: "Basic Tape", x: 3, y: 4, color: "#94A3B8" },
  { name: "Premium Overnight", x: 8, y: 7, color: "#6366F1" },
  { name: "Nursing Home Bulk", x: 4, y: 8, color: "#F59E0B" },
  { name: "Home-care Bundle", x: 7, y: 6, color: "#22C55E" },
  { name: "Skin-care Bundle", x: 8, y: 5, color: "#A855F7" },
];
