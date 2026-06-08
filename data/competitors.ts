export interface Competitor {
  brand: string;
  group: string;
  origin: string;
  types: string;
  tier: "Economy" | "Value" | "Mid" | "Premium" | "Medical";
  channel: string;
  positioning: string;
  strength: string;
  weakness: string;
  rating: number; // 1-5
  marketStrength: number; // 1-10 proxy
  pricePerPiece: number; // บาท (demo)
  quality: number; // 1-10 perceived
  shareProxy: number; // %
}

/** ข้อมูลตัวอย่าง / ต้อง Validate เพิ่ม — ใช้ชื่อกลุ่มแทนแบรนด์จริง */
export const competitors: Competitor[] = [
  {
    brand: "แบรนด์ Premium นำเข้า A",
    group: "International premium",
    origin: "ญี่ปุ่น",
    types: "เทป/กางเกง/Overnight",
    tier: "Premium",
    channel: "Modern trade/ออนไลน์",
    positioning: "คุณภาพสูง น่าเชื่อถือ",
    strength: "แบรนด์แข็ง คุณภาพดี",
    weakness: "ราคาสูง",
    rating: 4.6,
    marketStrength: 9,
    pricePerPiece: 16,
    quality: 9,
    shareProxy: 22,
  },
  {
    brand: "แบรนด์ญี่ปุ่น/เกาหลี B",
    group: "JP/KR",
    origin: "ญี่ปุ่น/เกาหลี",
    types: "เทป/กางเกง",
    tier: "Mid",
    channel: "ออนไลน์/ร้านยา",
    positioning: "คุ้มค่า คุณภาพดี",
    strength: "สมดุลราคา-คุณภาพ",
    weakness: "จุดต่างไม่ชัด",
    rating: 4.3,
    marketStrength: 7,
    pricePerPiece: 11,
    quality: 7,
    shareProxy: 18,
  },
  {
    brand: "แบรนด์ไทย C",
    group: "Thai local",
    origin: "ไทย",
    types: "เทป/แผ่นรองซับ",
    tier: "Value",
    channel: "ร้านยา/ออนไลน์",
    positioning: "ราคาเข้าถึงง่าย",
    strength: "ราคา/กระจายสินค้า",
    weakness: "คุณภาพปานกลาง",
    rating: 4.0,
    marketStrength: 6,
    pricePerPiece: 8,
    quality: 6,
    shareProxy: 15,
  },
  {
    brand: "แบรนด์นำเข้าราคาถูก D",
    group: "Low-cost import",
    origin: "จีน",
    types: "เทป/กางเกง",
    tier: "Economy",
    channel: "Marketplace",
    positioning: "ถูกที่สุด",
    strength: "ราคาต่ำ",
    weakness: "รีวิวรั่ว/ผื่นบ่อย",
    rating: 3.4,
    marketStrength: 4,
    pricePerPiece: 5.5,
    quality: 3,
    shareProxy: 12,
  },
  {
    brand: "แบรนด์เวชภัณฑ์ E",
    group: "Medical supply house",
    origin: "ไทย/นำเข้า",
    types: "Underpad/เทป",
    tier: "Medical",
    channel: "B2B/รพ.",
    positioning: "เกรดการแพทย์",
    strength: "เข้าถึง B2B/รพ.",
    weakness: "แบรนด์ผู้บริโภคอ่อน",
    rating: 4.1,
    marketStrength: 6,
    pricePerPiece: 12,
    quality: 7,
    shareProxy: 8,
  },
  {
    brand: "Private label Marketplace F",
    group: "Marketplace private label",
    origin: "จีน/ไทย",
    types: "เทป/กางเกง",
    tier: "Value",
    channel: "Marketplace",
    positioning: "คุ้มค่า ส่งไว",
    strength: "ราคา/โปรโมชัน",
    weakness: "ความภักดีต่ำ",
    rating: 3.9,
    marketStrength: 5,
    pricePerPiece: 7,
    quality: 5,
    shareProxy: 10,
  },
];

export const competitorGroupSwot = [
  {
    group: "International Premium",
    s: "แบรนด์แข็ง คุณภาพ",
    w: "ราคาสูง",
    o: "ขยายกลุ่มกลาง",
    t: "สินค้าราคาถูกตีตลาดล่าง",
  },
  {
    group: "Low-cost Import",
    s: "ราคาต่ำ เข้าถึงง่าย",
    w: "คุณภาพ/รีวิวลบ",
    o: "ปริมาณบน Marketplace",
    t: "ถูกแบนจากรีวิว/คุณภาพ",
  },
  {
    group: "Thai Local / Value",
    s: "ราคา/กระจายสินค้า",
    w: "จุดต่างไม่ชัด",
    o: "ครองตลาดกลางคุ้มค่า",
    t: "ถูกบีบจากทั้งบนและล่าง",
  },
];
