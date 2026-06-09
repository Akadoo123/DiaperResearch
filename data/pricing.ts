export interface PriceRow {
  brand: string;
  type: string;
  size: string;
  piecesPerPack: number;
  packPrice: number;
  pricePerPiece: number;
  absorption: string;
  channel: string;
  promoPrice: number;
  rating: number;
  tier: "Economy" | "Value" | "Mid" | "Premium" | "Medical";
}

/** ข้อมูลตัวอย่าง / ต้อง Validate จาก Marketplace scraping จริง */
export const priceRows: PriceRow[] = [
  { brand: "An-An", type: "เทป", size: "L", piecesPerPack: 10, packPrice: 55, pricePerPiece: 5.5, absorption: "ปานกลาง", channel: "Shopee", promoPrice: 49, rating: 3.4, tier: "Economy" },
  { brand: "OEM / แบรนด์ห้าง", type: "เทป", size: "L", piecesPerPack: 10, packPrice: 50, pricePerPiece: 5.0, absorption: "ปานกลาง", channel: "Lotus's/Big C", promoPrice: 45, rating: 3.5, tier: "Economy" },
  { brand: "Fitti Adult", type: "เทป", size: "L", piecesPerPack: 10, packPrice: 65, pricePerPiece: 6.5, absorption: "ปานกลาง", channel: "Lazada", promoPrice: 59, rating: 3.8, tier: "Value" },
  { brand: "Certis", type: "เทป", size: "L", piecesPerPack: 10, packPrice: 70, pricePerPiece: 7.0, absorption: "ดี", channel: "ร้านยา", promoPrice: 65, rating: 3.7, tier: "Value" },
  { brand: "Certainty", type: "เทป", size: "L", piecesPerPack: 10, packPrice: 90, pricePerPiece: 9.0, absorption: "ดี", channel: "ร้านยา/ออนไลน์", promoPrice: 82, rating: 4.2, tier: "Mid" },
  { brand: "MamyPoko Adult", type: "เทป", size: "L", piecesPerPack: 10, packPrice: 120, pricePerPiece: 12.0, absorption: "ดีมาก", channel: "ออนไลน์", promoPrice: 109, rating: 4.4, tier: "Mid" },
  { brand: "Depend", type: "เทป", size: "L", piecesPerPack: 10, packPrice: 140, pricePerPiece: 14.0, absorption: "สูง", channel: "ร้านยา", promoPrice: 129, rating: 4.3, tier: "Premium" },
  { brand: "Lifree", type: "Overnight", size: "L", piecesPerPack: 10, packPrice: 150, pricePerPiece: 15.0, absorption: "สูงมาก", channel: "Modern trade/ออนไลน์", promoPrice: 139, rating: 4.6, tier: "Premium" },
  { brand: "Tena", type: "เทป", size: "L", piecesPerPack: 10, packPrice: 160, pricePerPiece: 16.0, absorption: "สูงมาก", channel: "B2B/รพ.", promoPrice: 152, rating: 4.5, tier: "Medical" },
  { brand: "Dr.Pants", type: "กางเกง", size: "M", piecesPerPack: 10, packPrice: 90, pricePerPiece: 9.0, absorption: "ดี", channel: "TikTok Shop/Subscription", promoPrice: 79, rating: 4.1, tier: "Mid" },
];

export const tierBenchmark = [
  { tier: "Economy", pricePerPiece: 5.5, note: "นำเข้าราคาถูก เสี่ยงคุณภาพ" },
  { tier: "Value", pricePerPiece: 7.5, note: "คุ้มค่า ตลาดกลางล่าง" },
  { tier: "Mid", pricePerPiece: 11, note: "สมดุลราคา-คุณภาพ" },
  { tier: "Premium", pricePerPiece: 15.5, note: "แบรนด์แข็ง คุณภาพสูง" },
  { tier: "Medical", pricePerPiece: 12, note: "เกรดการแพทย์ B2B" },
];

export const onlineVsOffline = [
  { type: "เทป L", online: 8.5, offline: 9.5 },
  { type: "กางเกง M", online: 9.0, offline: 10.5 },
  { type: "Overnight L", online: 14.5, offline: 16.0 },
  { type: "Underpad", online: 6.0, offline: 7.0 },
];

export const packSizeCompare = [
  { pack: "แพ็คเล็ก (10 ชิ้น)", pricePerPiece: 9.5 },
  { pack: "แพ็คกลาง (20 ชิ้น)", pricePerPiece: 8.5 },
  { pack: "แพ็คใหญ่ (30 ชิ้น)", pricePerPiece: 7.8 },
  { pack: "ลังขายส่ง (90 ชิ้น)", pricePerPiece: 6.9 },
];

export const pricingRecommendation = {
  enterTier: "Mid / Value-for-money (≈ 9-11 บาท/ชิ้น)",
  acceptablePrice: "9-11 บาท/ชิ้น สำหรับเทป, 13-15 บาท/ชิ้น สำหรับ Overnight",
  marginTarget: "Gross Margin ≥ 45%",
  avoidWar: "หลีกเลี่ยงการแข่งที่ราคาต่ำสุด ใช้จุดต่าง (Overnight/Caregiver/Bundle) สร้างมูลค่าแทน",
};
