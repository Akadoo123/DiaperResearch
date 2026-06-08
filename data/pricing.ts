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
  { brand: "Import D", type: "เทป", size: "L", piecesPerPack: 10, packPrice: 55, pricePerPiece: 5.5, absorption: "ปานกลาง", channel: "Shopee", promoPrice: 49, rating: 3.4, tier: "Economy" },
  { brand: "Private label F", type: "เทป", size: "L", piecesPerPack: 10, packPrice: 70, pricePerPiece: 7.0, absorption: "ปานกลาง", channel: "Lazada", promoPrice: 62, rating: 3.9, tier: "Value" },
  { brand: "Thai C", type: "เทป", size: "L", piecesPerPack: 10, packPrice: 80, pricePerPiece: 8.0, absorption: "ดี", channel: "ร้านยา", promoPrice: 75, rating: 4.0, tier: "Value" },
  { brand: "JP/KR B", type: "เทป", size: "L", piecesPerPack: 10, packPrice: 110, pricePerPiece: 11.0, absorption: "ดี", channel: "ออนไลน์", promoPrice: 99, rating: 4.3, tier: "Mid" },
  { brand: "Medical E", type: "เทป", size: "L", piecesPerPack: 10, packPrice: 120, pricePerPiece: 12.0, absorption: "สูง", channel: "B2B/รพ.", promoPrice: 115, rating: 4.1, tier: "Medical" },
  { brand: "Premium A", type: "Overnight", size: "L", piecesPerPack: 10, packPrice: 160, pricePerPiece: 16.0, absorption: "สูงมาก", channel: "Modern trade", promoPrice: 145, rating: 4.6, tier: "Premium" },
  { brand: "Import D", type: "กางเกง", size: "M", piecesPerPack: 10, packPrice: 60, pricePerPiece: 6.0, absorption: "ปานกลาง", channel: "TikTok Shop", promoPrice: 52, rating: 3.5, tier: "Economy" },
  { brand: "Premium A", type: "กางเกง", size: "M", piecesPerPack: 10, packPrice: 150, pricePerPiece: 15.0, absorption: "สูง", channel: "Modern trade", promoPrice: 139, rating: 4.5, tier: "Premium" },
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
