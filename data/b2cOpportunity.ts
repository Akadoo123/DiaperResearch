export interface B2CPersona {
  name: string;
  emotional: string;
  functional: string;
  concern: string;
  channel: string;
  frequency: string;
  switchReason: string;
  reviewBehavior: string;
  subscription: "สูง" | "ปานกลาง" | "ต่ำ";
  score: number;
}

export const b2cPersonas: B2CPersona[] = [
  { name: "ลูกหลานซื้อให้พ่อแม่", emotional: "ความกตัญญู/ห่วงใย", functional: "ของดี ส่งถึงบ้าน", concern: "คุณภาพ/รั่วซึม", channel: "Marketplace/LINE OA", frequency: "รายเดือน", switchReason: "รั่ว/ผื่น/รีวิวลบ", reviewBehavior: "อ่านรีวิวก่อนซื้อ", subscription: "สูง", score: 9 },
  { name: "Family caregiver", emotional: "ลดความเหนื่อยล้า", functional: "ลดการเปลี่ยน กันรั่ว", concern: "ภาระงานดูแล", channel: "Online/ชุมชนผู้ดูแล", frequency: "รายเดือน", switchReason: "ใช้ยาก/รั่ว", reviewBehavior: "แชร์ในกลุ่ม", subscription: "สูง", score: 9 },
  { name: "คู่สมรสดูแลผู้ป่วยติดเตียง", emotional: "ดูแลด้วยรัก", functional: "ซึมซับสูง ป้องกันผื่น", concern: "ผื่น/แผลกดทับ", channel: "ร้านเวชภัณฑ์/ออนไลน์", frequency: "รายสัปดาห์-เดือน", switchReason: "คุณภาพต่ำ", reviewBehavior: "ถามเภสัช/พยาบาล", subscription: "ปานกลาง", score: 8 },
  { name: "ผู้สูงอายุซื้อเอง", emotional: "ความมั่นใจ/ศักดิ์ศรี", functional: "บางเบา ไม่เห็นชัด", concern: "อับอาย", channel: "ร้านขายยา", frequency: "รายเดือน", switchReason: "ไม่สบายตัว", reviewBehavior: "เชื่อเภสัช", subscription: "ต่ำ", score: 6 },
  { name: "Online repeat buyer", emotional: "ความสะดวก", functional: "สั่งซ้ำง่าย", concern: "ของหมด/ราคาขึ้น", channel: "Marketplace", frequency: "รายเดือน", switchReason: "โปรคู่แข่ง", reviewBehavior: "ให้ดาว", subscription: "สูง", score: 8 },
  { name: "ครัวเรือนคุมงบ", emotional: "คุมค่าใช้จ่าย", functional: "คุ้มค่าต่อชิ้น", concern: "ราคาต่อเดือน", channel: "Marketplace/ร้านยา", frequency: "รายเดือน", switchReason: "เจอที่ถูกกว่า", reviewBehavior: "เทียบราคา", subscription: "ปานกลาง", score: 6 },
  { name: "ครัวเรือน Premium care", emotional: "ดูแลดีที่สุด", functional: "คุณภาพสูงสุด", concern: "ความสบายผู้ป่วย", channel: "ออนไลน์/Modern trade", frequency: "รายเดือน", switchReason: "มีของดีกว่า", reviewBehavior: "รีวิวละเอียด", subscription: "ปานกลาง", score: 7 },
];

export const b2cJourney = [
  { stage: "Trigger", desc: "เกิดเหตุการณ์ (ผู้ป่วยติดเตียง/พ่อแม่แก่ลง)" },
  { stage: "Research", desc: "หาในกลุ่มผู้ดูแล / ถามเภสัช / ค้นออนไลน์" },
  { stage: "Trial", desc: "ซื้อแพ็คเล็กมาลอง" },
  { stage: "Evaluate", desc: "ดูเรื่องรั่ว ผื่น ความสบาย" },
  { stage: "Repeat", desc: "พอใจ → ซื้อซ้ำ/สมัคร Subscription" },
  { stage: "Advocate", desc: "รีวิว/แนะนำต่อ" },
];

export const emotionalAngles = [
  "ดูแลอย่างมีศักดิ์ศรี",
  "ลดภาระผู้ดูแล",
  "นอนหลับสบายขึ้นทั้งผู้ป่วยและผู้ดูแล",
  "ลดปัญหารั่วซึมและความอับอาย",
  "ปกป้องผิว ลดผื่น",
  "คุมค่าใช้จ่ายรายเดือน",
];

export const marketingMessages = [
  '"ออกแบบเพื่อผู้ดูแล — ลดการเปลี่ยนกลางคืน ลดภาระคุณ"',
  '"ดูแลพ่อแม่อย่างมีศักดิ์ศรี ส่งถึงบ้านทุกเดือน"',
  '"ซึมซับสูง กันรั่ว ปกป้องผิว ลดผื่น"',
  '"สมัครครั้งเดียว ส่งทุกเดือน ไม่ต้องกลัวของหมด"',
];

/** Repeat purchase / subscription model (Demo) */
export const subscriptionModel = {
  monthlyValue: 900, // บาท/เดือน/ลูกค้า
  retentionMonths: 8,
  ltv: 7200, // = 900 * 8
};
