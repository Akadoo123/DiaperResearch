export interface PositioningOption {
  name: string;
  target: string;
  promise: string;
  productReq: string;
  priceLevel: string;
  channelFit: string;
  differentiation: number; // 1-10
  risk: string;
  recommended: boolean;
}

export const positioningOptions: PositioningOption[] = [
  { name: "Value-for-money", target: "ครัวเรือนคุมงบ", promise: "คุ้มค่าต่อชิ้น", productReq: "คุณภาพพอใช้ ราคาดี", priceLevel: "Value", channelFit: "Marketplace", differentiation: 4, risk: "ติดสงครามราคา", recommended: false },
  { name: "Hospital-grade protection", target: "ผู้ป่วยติดเตียง/B2B", promise: "ปกป้องระดับการแพทย์", productReq: "ซึมซับสูง มาตรฐาน", priceLevel: "Medical", channelFit: "B2B/ร้านเวชภัณฑ์", differentiation: 7, risk: "ต้องมีเอกสารรับรอง", recommended: true },
  { name: "Premium comfort & dignity", target: "Premium care", promise: "สบาย มีศักดิ์ศรี", productReq: "นุ่ม บางเบา คุณภาพสูง", priceLevel: "Premium", channelFit: "ออนไลน์/Modern trade", differentiation: 7, risk: "แข่งแบรนด์ใหญ่", recommended: false },
  { name: "Overnight leakage protection", target: "ทุกกลุ่มตอนกลางคืน", promise: "ลดรั่วกลางคืน เปลี่ยนน้อย", productReq: "ซึมซับสูงพิเศษ", priceLevel: "Mid-Premium", channelFit: "ออนไลน์", differentiation: 8, risk: "ต้นทุนวัสดุสูง", recommended: true },
  { name: "Skin-safe & rash prevention", target: "ผู้ป่วยผิวบอบบาง", promise: "ลดผื่น ปกป้องผิว", productReq: "ระบายอากาศ อ่อนโยน", priceLevel: "Mid", channelFit: "ออนไลน์/ร้านยา", differentiation: 7, risk: "พิสูจน์ผลยาก", recommended: true },
  { name: "Caregiver-friendly brand", target: "Family caregiver", promise: "ออกแบบเพื่อผู้ดูแล", productReq: "ใส่ง่าย เปลี่ยนน้อย", priceLevel: "Mid", channelFit: "ออนไลน์/ชุมชน", differentiation: 8, risk: "ต้องสื่อสารชัด", recommended: true },
  { name: "Thai family care brand", target: "ครอบครัวไทย", promise: "แบรนด์ไทยที่เข้าใจ", productReq: "คุณภาพดี ราคาเข้าถึง", priceLevel: "Value-Mid", channelFit: "ทุกช่องทาง", differentiation: 6, risk: "จุดต่างต้องชัด", recommended: false },
  { name: "Subscription convenience", target: "Online repeat", promise: "ส่งทุกเดือนไม่ต้องคิด", productReq: "คุณภาพคงที่", priceLevel: "Mid", channelFit: "D2C/LINE OA", differentiation: 7, risk: "ต้องคุม retention", recommended: true },
  { name: "Nursing home professional", target: "B2B ศูนย์ดูแล", promise: "สินค้ามืออาชีพ คุมต้นทุน", productReq: "ทน คุ้ม คุณภาพคงที่", priceLevel: "Value-Medical", channelFit: "B2B", differentiation: 6, risk: "ราคากดดัน", recommended: false },
  { name: "Complete bedridden bundle", target: "ผู้ดูแลผู้ป่วยติดเตียง", promise: "ดูแลครบในชุดเดียว", productReq: "ผ้าอ้อม+Underpad+ครีม+wipes", priceLevel: "Mid-Premium", channelFit: "ออนไลน์/B2B", differentiation: 8, risk: "จัดการสต๊อกซับซ้อน", recommended: true },
];

/** Positioning map: X = Price (1-10), Y = Trust/Quality (1-10) */
export const positioningMap = [
  { name: "Premium A", x: 9, y: 9, color: "#A855F7" },
  { name: "JP/KR B", x: 6, y: 7, color: "#38BDF8" },
  { name: "Thai C", x: 4, y: 6, color: "#94A3B8" },
  { name: "Import D", x: 2, y: 3, color: "#EF4444" },
  { name: "Medical E", x: 7, y: 7, color: "#F59E0B" },
  { name: "เรา (เป้าหมาย)", x: 6, y: 8, color: "#22C55E" },
];

export const recommendedMessage =
  "ผ้าอ้อมผู้ใหญ่ที่ออกแบบเพื่อผู้ดูแล — ลดปัญหารั่วกลางคืน ลดภาระการเปลี่ยนบ่อย และดูแลผู้ใหญ่ในบ้านอย่างมีศักดิ์ศรี";

export const taglineIdeas = [
  "ดูแลด้วยใจ ใส่ใจทุกคืน",
  "ลดภาระผู้ดูแล ดูแลอย่างมีศักดิ์ศรี",
  "แห้งสบาย ไร้กังวลทั้งคืน",
  "ออกแบบเพื่อคนที่คุณรักและคนที่ดูแล",
];

export const namingDirection =
  "ชื่อแบรนด์ควรสื่อถึง 'การดูแล + ความนุ่มนวล + ความน่าเชื่อถือ' อ่านง่ายทั้งไทยและอังกฤษ หลีกเลี่ยงคำที่ตอกย้ำความเป็น 'ผู้ป่วย' เพื่อรักษาศักดิ์ศรีผู้ใช้";

export const packagingDirection =
  "บรรจุภัณฑ์โทนขาว-ฟ้า-เขียวอ่อน ดูสะอาด เป็นมิตร ไม่เหมือนสินค้าโรงพยาบาล ระบุจุดเด่น (ซึมซับสูง/กันรั่วกลางคืน) ชัดเจนบนหน้ากล่อง";
