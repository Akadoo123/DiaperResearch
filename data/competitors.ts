/**
 * Thailand Adult Diaper Market — Competitor Intelligence (REAL BRANDS)
 *
 * ⚠️ DATA INTEGRITY NOTE
 * - ชื่อแบรนด์ / บริษัทแม่ / ประเทศต้นทาง = ข้อมูลสาธารณะที่ทราบกันทั่วไป (publicly known)
 * - Market share / ราคา / sentiment / คะแนน benchmark = **Modeled Estimate**
 *   ประเมินจาก proxy (shelf presence, SKU count, search volume, online sales,
 *   hospital presence, distributor coverage) — ติดป้าย Confidence ทุกจุด
 * - ตัวเลขทั้งหมดต้อง Validate ด้วยข้อมูลจริง (retail audit / Nielsen / marketplace scraping)
 */

export type Confidence = "high" | "medium" | "low";
export type MarketPosition = "Premium" | "Mass" | "Budget" | "Online Challenger" | "Hospital-grade";

export interface BrandChannelMix {
  hospital: number;
  nursingHome: number;
  retail: number;
  pharmacy: number;
  ecommerce: number;
  subscription: number;
}

export interface Brand {
  slug: string;
  name: string;
  nameTh: string;
  parentCompany: string;
  parentConfidence: Confidence;
  country: string;
  countryConfidence: Confidence;
  website: string;
  position: MarketPosition;
  color: string; // brand accent for logo/charts

  // Modeled estimates
  shareEst: number; // %
  shareConfidence: Confidence;
  pricePerPiece: number; // THB (avg, modeled)
  priceMin: number;
  priceMax: number;
  packPriceMin: number;
  packPriceMax: number;

  // Positioning axes (1-10)
  priceAxis: number; // X = price level
  qualityAxis: number; // Y = perceived quality/premium

  portfolio: { pant: number; tape: number; pad: number; overnight: number; hospital: number };
  distribution: BrandChannelMix;

  benchmark: {
    marketShare: number;
    price: number; // premium-ness
    absorbency: number;
    comfort: number;
    availability: number;
    hospital: number;
    online: number;
    brandStrength: number;
  };
  channelStrength: BrandChannelMix; // 1-10 per channel

  swot: { s: string[]; w: string[]; o: string[]; t: string[] };
  sentiment: {
    score: number; // 0-100 net positive
    positive: { word: string; weight: number }[];
    negative: { word: string; weight: number }[];
  };
  strengths: string;
  weaknesses: string;
  reviewRating: number; // 1-5 modeled
}

export const brands: Brand[] = [
  {
    slug: "certainty",
    name: "Certainty",
    nameTh: "เซอร์เทนตี้",
    parentCompany: "DSG International (Thailand) PCL",
    parentConfidence: "high",
    country: "ไทย",
    countryConfidence: "high",
    website: "https://www.certainty.co.th",
    position: "Mass",
    color: "#2563EB",
    shareEst: 24,
    shareConfidence: "medium",
    pricePerPiece: 9,
    priceMin: 7,
    priceMax: 12,
    packPriceMin: 70,
    packPriceMax: 250,
    priceAxis: 5,
    qualityAxis: 7,
    portfolio: { pant: 6, tape: 5, pad: 3, overnight: 2, hospital: 2 },
    distribution: { hospital: 15, nursingHome: 10, retail: 35, pharmacy: 25, ecommerce: 13, subscription: 2 },
    benchmark: { marketShare: 9, price: 5, absorbency: 7, comfort: 7, availability: 9, hospital: 7, online: 7, brandStrength: 9 },
    channelStrength: { hospital: 7, nursingHome: 7, retail: 9, pharmacy: 9, ecommerce: 7, subscription: 4 },
    swot: {
      s: ["ผู้นำตลาดแบรนด์ไทย", "กระจายสินค้ากว้างทุกช่องทาง", "ราคาคุ้มค่า เข้าถึงง่าย"],
      w: ["ภาพลักษณ์ไม่พรีเมียมเท่าแบรนด์ญี่ปุ่น", "จุดต่างนวัตกรรมน้อย"],
      o: ["ขยาย Subscription/ออนไลน์", "ต่อยอด Caregiver ecosystem"],
      t: ["แบรนด์ญี่ปุ่นกินตลาดบน", "สินค้านำเข้าถูกตีตลาดล่าง"],
    },
    sentiment: {
      score: 68,
      positive: [{ word: "ราคาคุ้มค่า", weight: 9 }, { word: "หาซื้อง่าย", weight: 8 }, { word: "ซึมซับดี", weight: 6 }, { word: "ใส่สบาย", weight: 5 }],
      negative: [{ word: "บางรุ่นรั่ว", weight: 5 }, { word: "ร้อนอับ", weight: 4 }, { word: "ไซส์ไม่นิ่ง", weight: 3 }],
    },
    strengths: "ผู้นำแบรนด์ไทย กระจายสินค้ากว้าง ราคาคุ้มค่า",
    weaknesses: "ภาพลักษณ์พรีเมียมน้อย จุดต่างนวัตกรรมจำกัด",
    reviewRating: 4.2,
  },
  {
    slug: "lifree",
    name: "Lifree",
    nameTh: "ไลฟ์รี่",
    parentCompany: "Unicharm Corporation",
    parentConfidence: "high",
    country: "ญี่ปุ่น",
    countryConfidence: "high",
    website: "https://www.unicharm.co.th",
    position: "Premium",
    color: "#7C3AED",
    shareEst: 18,
    shareConfidence: "medium",
    pricePerPiece: 15,
    priceMin: 12,
    priceMax: 19,
    packPriceMin: 120,
    packPriceMax: 390,
    priceAxis: 9,
    qualityAxis: 9,
    portfolio: { pant: 7, tape: 5, pad: 4, overnight: 3, hospital: 2 },
    distribution: { hospital: 10, nursingHome: 8, retail: 25, pharmacy: 30, ecommerce: 25, subscription: 2 },
    benchmark: { marketShare: 8, price: 9, absorbency: 9, comfort: 9, availability: 8, hospital: 6, online: 8, brandStrength: 9 },
    channelStrength: { hospital: 6, nursingHome: 6, retail: 8, pharmacy: 9, ecommerce: 8, subscription: 4 },
    swot: {
      s: ["แบรนด์ญี่ปุ่นน่าเชื่อถือ", "คุณภาพ/นวัตกรรมซึมซับสูง", "ภาพลักษณ์พรีเมียม"],
      w: ["ราคาสูง", "เข้าถึงกลุ่มราคาประหยัดยาก"],
      o: ["สังคมสูงวัยกลุ่ม premium care", "ขยาย D2C/Subscription"],
      t: ["แบรนด์ไทยไล่คุณภาพในราคาถูกกว่า"],
    },
    sentiment: {
      score: 74,
      positive: [{ word: "นุ่มสบาย", weight: 9 }, { word: "ซึมซับเยี่ยม", weight: 9 }, { word: "ไม่รั่ว", weight: 7 }, { word: "คุณภาพดี", weight: 6 }],
      negative: [{ word: "ราคาแพง", weight: 9 }, { word: "ร้อนหน้าร้อน", weight: 4 }],
    },
    strengths: "คุณภาพ/นวัตกรรมสูง แบรนด์ญี่ปุ่นน่าเชื่อถือ",
    weaknesses: "ราคาสูง เข้าถึงกลุ่ม mass ยาก",
    reviewRating: 4.6,
  },
  {
    slug: "mamypoko-adult",
    name: "MamyPoko Adult",
    nameTh: "มามี่โพโค ผู้ใหญ่",
    parentCompany: "Unicharm Corporation",
    parentConfidence: "high",
    country: "ญี่ปุ่น",
    countryConfidence: "high",
    website: "https://www.unicharm.co.th",
    position: "Premium",
    color: "#DB2777",
    shareEst: 12,
    shareConfidence: "low",
    pricePerPiece: 12,
    priceMin: 9,
    priceMax: 16,
    packPriceMin: 95,
    packPriceMax: 320,
    priceAxis: 7,
    qualityAxis: 8,
    portfolio: { pant: 5, tape: 3, pad: 2, overnight: 2, hospital: 1 },
    distribution: { hospital: 7, nursingHome: 6, retail: 30, pharmacy: 20, ecommerce: 35, subscription: 2 },
    benchmark: { marketShare: 6, price: 7, absorbency: 8, comfort: 8, availability: 8, hospital: 5, online: 9, brandStrength: 8 },
    channelStrength: { hospital: 5, nursingHome: 5, retail: 8, pharmacy: 7, ecommerce: 9, subscription: 4 },
    swot: {
      s: ["แบรนด์แม่แข็งแรง (ตลาดเด็ก)", "ออนไลน์แข็งแกร่ง", "คุณภาพญี่ปุ่น"],
      w: ["ภาพจำเป็นแบรนด์เด็ก", "พอร์ตผู้ใหญ่ยังเล็ก"],
      o: ["ใช้ฐานลูกค้าเดิมต่อยอด", "เติบโตบน Marketplace"],
      t: ["ทับซ้อนกับ Lifree ในเครือเดียวกัน"],
    },
    sentiment: {
      score: 70,
      positive: [{ word: "ใส่สบาย", weight: 8 }, { word: "ส่งไว", weight: 6 }, { word: "ซึมซับดี", weight: 7 }],
      negative: [{ word: "ราคาสูง", weight: 6 }, { word: "ไซส์เล็กกว่าที่คิด", weight: 4 }],
    },
    strengths: "ออนไลน์แข็ง คุณภาพญี่ปุ่น แบรนด์แม่แข็งแรง",
    weaknesses: "ภาพจำแบรนด์เด็ก พอร์ตผู้ใหญ่ยังเล็ก",
    reviewRating: 4.4,
  },
  {
    slug: "fitti-adult",
    name: "Fitti Adult",
    nameTh: "ฟิตติ ผู้ใหญ่",
    parentCompany: "DSG International (Thailand) PCL",
    parentConfidence: "medium",
    country: "ไทย",
    countryConfidence: "medium",
    website: "https://www.dsgthailand.com",
    position: "Budget",
    color: "#EA580C",
    shareEst: 8,
    shareConfidence: "low",
    pricePerPiece: 6.5,
    priceMin: 5,
    priceMax: 9,
    packPriceMin: 55,
    packPriceMax: 180,
    priceAxis: 3,
    qualityAxis: 5,
    portfolio: { pant: 4, tape: 3, pad: 2, overnight: 1, hospital: 1 },
    distribution: { hospital: 5, nursingHome: 5, retail: 40, pharmacy: 20, ecommerce: 30, subscription: 0 },
    benchmark: { marketShare: 5, price: 3, absorbency: 5, comfort: 5, availability: 7, hospital: 4, online: 7, brandStrength: 6 },
    channelStrength: { hospital: 4, nursingHome: 4, retail: 8, pharmacy: 6, ecommerce: 7, subscription: 2 },
    swot: {
      s: ["ราคาประหยัด", "อยู่ในเครือ DSG (กระจายสินค้าได้)"],
      w: ["คุณภาพระดับกลาง-ล่าง", "แบรนด์ผู้ใหญ่ยังไม่แข็ง"],
      o: ["จับกลุ่มคุมงบ", "ขยายออนไลน์"],
      t: ["สินค้านำเข้าถูกแข่งราคา"],
    },
    sentiment: {
      score: 58,
      positive: [{ word: "ราคาถูก", weight: 9 }, { word: "พอใช้ได้", weight: 5 }],
      negative: [{ word: "ซึมซับน้อย", weight: 6 }, { word: "รั่วบ้าง", weight: 5 }, { word: "บาง", weight: 4 }],
    },
    strengths: "ราคาประหยัด อยู่ในเครือ DSG",
    weaknesses: "คุณภาพระดับกลาง-ล่าง แบรนด์ผู้ใหญ่ยังไม่แข็ง",
    reviewRating: 3.8,
  },
  {
    slug: "an-an",
    name: "An-An Adult",
    nameTh: "แอน-แอน",
    parentCompany: "Hengan / ผู้จัดจำหน่ายในไทย (ต้อง Validate)",
    parentConfidence: "low",
    country: "จีน (ต้อง Validate)",
    countryConfidence: "low",
    website: "",
    position: "Budget",
    color: "#0891B2",
    shareEst: 7,
    shareConfidence: "low",
    pricePerPiece: 5.5,
    priceMin: 4.5,
    priceMax: 8,
    packPriceMin: 49,
    packPriceMax: 160,
    priceAxis: 2,
    qualityAxis: 4,
    portfolio: { pant: 4, tape: 4, pad: 2, overnight: 1, hospital: 0 },
    distribution: { hospital: 2, nursingHome: 3, retail: 35, pharmacy: 15, ecommerce: 45, subscription: 0 },
    benchmark: { marketShare: 4, price: 2, absorbency: 5, comfort: 4, availability: 7, hospital: 2, online: 8, brandStrength: 5 },
    channelStrength: { hospital: 2, nursingHome: 3, retail: 7, pharmacy: 5, ecommerce: 8, subscription: 1 },
    swot: {
      s: ["ราคาถูกมาก", "ปริมาณบน Marketplace สูง"],
      w: ["คุณภาพไม่สม่ำเสมอ", "รีวิวลบเรื่องรั่ว/ผื่น"],
      o: ["กลุ่มอ่อนไหวราคา"],
      t: ["รีวิวลบกระทบความเชื่อมั่น", "การแข่งราคาต่ำไม่ยั่งยืน"],
    },
    sentiment: {
      score: 48,
      positive: [{ word: "ถูกมาก", weight: 9 }, { word: "แพ็คใหญ่คุ้ม", weight: 5 }],
      negative: [{ word: "รั่ว", weight: 7 }, { word: "ผื่น", weight: 6 }, { word: "บาง", weight: 5 }, { word: "ไซส์เพี้ยน", weight: 4 }],
    },
    strengths: "ราคาถูกมาก ปริมาณบน Marketplace สูง",
    weaknesses: "คุณภาพไม่สม่ำเสมอ รีวิวลบเรื่องรั่ว/ผื่น",
    reviewRating: 3.4,
  },
  {
    slug: "tena",
    name: "Tena",
    nameTh: "ทีน่า",
    parentCompany: "Essity AB",
    parentConfidence: "high",
    country: "สวีเดน",
    countryConfidence: "high",
    website: "https://www.tena.co.th",
    position: "Hospital-grade",
    color: "#16A34A",
    shareEst: 6,
    shareConfidence: "low",
    pricePerPiece: 16,
    priceMin: 13,
    priceMax: 22,
    packPriceMin: 130,
    packPriceMax: 450,
    priceAxis: 9,
    qualityAxis: 9,
    portfolio: { pant: 6, tape: 6, pad: 5, overnight: 3, hospital: 5 },
    distribution: { hospital: 40, nursingHome: 30, retail: 8, pharmacy: 15, ecommerce: 7, subscription: 0 },
    benchmark: { marketShare: 4, price: 9, absorbency: 9, comfort: 8, availability: 6, hospital: 9, online: 5, brandStrength: 8 },
    channelStrength: { hospital: 9, nursingHome: 9, retail: 5, pharmacy: 7, ecommerce: 5, subscription: 3 },
    swot: {
      s: ["ผู้นำเกรดการแพทย์ระดับโลก", "แข็งแกร่งใน รพ./Nursing home", "มาตรฐาน/เอกสารครบ"],
      w: ["ราคาสูง", "การมองเห็นในตลาดผู้บริโภคต่ำ"],
      o: ["จัดซื้อภาครัฐ/สถาบัน", "Long-term care ที่โต"],
      t: ["แบรนด์ท้องถิ่นราคาถูกในงานประมูล"],
    },
    sentiment: {
      score: 72,
      positive: [{ word: "เกรดโรงพยาบาล", weight: 8 }, { word: "ซึมซับสูง", weight: 8 }, { word: "ไว้ใจได้", weight: 6 }],
      negative: [{ word: "แพง", weight: 8 }, { word: "หาซื้อยาก", weight: 5 }],
    },
    strengths: "ผู้นำเกรดการแพทย์ แข็งแกร่งใน รพ./Nursing home",
    weaknesses: "ราคาสูง การมองเห็นในตลาดผู้บริโภคต่ำ",
    reviewRating: 4.5,
  },
  {
    slug: "depend",
    name: "Depend",
    nameTh: "ดีเพนด์",
    parentCompany: "Kimberly-Clark",
    parentConfidence: "high",
    country: "สหรัฐอเมริกา",
    countryConfidence: "high",
    website: "https://www.depend.com",
    position: "Premium",
    color: "#0D9488",
    shareEst: 5,
    shareConfidence: "low",
    pricePerPiece: 14,
    priceMin: 11,
    priceMax: 18,
    packPriceMin: 110,
    packPriceMax: 360,
    priceAxis: 8,
    qualityAxis: 8,
    portfolio: { pant: 5, tape: 3, pad: 3, overnight: 2, hospital: 2 },
    distribution: { hospital: 12, nursingHome: 6, retail: 25, pharmacy: 30, ecommerce: 25, subscription: 2 },
    benchmark: { marketShare: 4, price: 8, absorbency: 8, comfort: 8, availability: 6, hospital: 6, online: 7, brandStrength: 7 },
    channelStrength: { hospital: 6, nursingHome: 5, retail: 7, pharmacy: 8, ecommerce: 7, subscription: 4 },
    swot: {
      s: ["แบรนด์ระดับโลก (Kimberly-Clark)", "คุณภาพสม่ำเสมอ"],
      w: ["ส่วนแบ่งในไทยยังเล็ก", "ราคาสูง"],
      o: ["ขยายผ่านร้านยา/ออนไลน์"],
      t: ["แข่งกับแบรนด์ญี่ปุ่นที่ครองใจอยู่แล้ว"],
    },
    sentiment: {
      score: 66,
      positive: [{ word: "คุณภาพดี", weight: 7 }, { word: "กระชับ", weight: 6 }],
      negative: [{ word: "ราคาสูง", weight: 7 }, { word: "ตัวเลือกน้อยในไทย", weight: 4 }],
    },
    strengths: "แบรนด์ระดับโลก คุณภาพสม่ำเสมอ",
    weaknesses: "ส่วนแบ่งในไทยยังเล็ก ราคาสูง",
    reviewRating: 4.3,
  },
  {
    slug: "dr-pants",
    name: "Dr.Pants",
    nameTh: "ดร.แพนท์",
    parentCompany: "แบรนด์ออนไลน์ไทย (ต้อง Validate)",
    parentConfidence: "low",
    country: "ไทย",
    countryConfidence: "medium",
    website: "",
    position: "Online Challenger",
    color: "#F59E0B",
    shareEst: 4,
    shareConfidence: "low",
    pricePerPiece: 9,
    priceMin: 7,
    priceMax: 12,
    packPriceMin: 79,
    packPriceMax: 230,
    priceAxis: 5,
    qualityAxis: 6,
    portfolio: { pant: 3, tape: 2, pad: 1, overnight: 1, hospital: 0 },
    distribution: { hospital: 1, nursingHome: 1, retail: 15, pharmacy: 8, ecommerce: 55, subscription: 20 },
    benchmark: { marketShare: 3, price: 5, absorbency: 6, comfort: 6, availability: 5, hospital: 2, online: 9, brandStrength: 6 },
    channelStrength: { hospital: 2, nursingHome: 2, retail: 5, pharmacy: 4, ecommerce: 9, subscription: 8 },
    swot: {
      s: ["คล่องตัวบนออนไลน์", "มี Subscription/D2C", "สื่อสารตรงกลุ่มผู้ดูแล"],
      w: ["สเกลยังเล็ก", "การกระจายออฟไลน์น้อย"],
      o: ["ชิงตลาด Caregiver online", "โมเดล Subscription โต"],
      t: ["แบรนด์ใหญ่ลงมาเล่นออนไลน์/Subscription"],
    },
    sentiment: {
      score: 64,
      positive: [{ word: "สั่งง่าย", weight: 7 }, { word: "ส่งถึงบ้าน", weight: 7 }, { word: "บริการดี", weight: 5 }],
      negative: [{ word: "ของหมดบ่อย", weight: 4 }, { word: "ราคากลางๆ", weight: 3 }],
    },
    strengths: "คล่องตัวบนออนไลน์ มี Subscription/D2C",
    weaknesses: "สเกลยังเล็ก การกระจายออฟไลน์น้อย",
    reviewRating: 4.1,
  },
  {
    slug: "certis",
    name: "Certis",
    nameTh: "เซอร์ทิส",
    parentCompany: "ผู้ผลิต/จัดจำหน่ายในไทย (ต้อง Validate)",
    parentConfidence: "low",
    country: "ไทย (ต้อง Validate)",
    countryConfidence: "low",
    website: "",
    position: "Budget",
    color: "#64748B",
    shareEst: 3,
    shareConfidence: "low",
    pricePerPiece: 7,
    priceMin: 5.5,
    priceMax: 10,
    packPriceMin: 60,
    packPriceMax: 190,
    priceAxis: 4,
    qualityAxis: 5,
    portfolio: { pant: 3, tape: 3, pad: 2, overnight: 1, hospital: 1 },
    distribution: { hospital: 3, nursingHome: 2, retail: 40, pharmacy: 20, ecommerce: 35, subscription: 0 },
    benchmark: { marketShare: 3, price: 4, absorbency: 5, comfort: 5, availability: 6, hospital: 3, online: 6, brandStrength: 5 },
    channelStrength: { hospital: 3, nursingHome: 2, retail: 7, pharmacy: 6, ecommerce: 6, subscription: 1 },
    swot: {
      s: ["ราคาเข้าถึงง่าย", "มีในร้านยา/ออนไลน์"],
      w: ["แบรนด์อ่อน", "จุดต่างน้อย"],
      o: ["กลุ่มคุมงบ"],
      t: ["ถูกบีบจากทั้งบนและล่าง"],
    },
    sentiment: {
      score: 55,
      positive: [{ word: "ราคาโอเค", weight: 6 }, { word: "หาซื้อได้", weight: 5 }],
      negative: [{ word: "ธรรมดา", weight: 5 }, { word: "ซึมซับกลางๆ", weight: 4 }],
    },
    strengths: "ราคาเข้าถึงง่าย มีในร้านยา/ออนไลน์",
    weaknesses: "แบรนด์อ่อน จุดต่างน้อย",
    reviewRating: 3.7,
  },
  {
    slug: "oem-private-label",
    name: "OEM / Private Label",
    nameTh: "OEM / แบรนด์ห้าง",
    parentCompany: "Watsons / Tops / Lotus's / Big C ฯลฯ (หลายราย)",
    parentConfidence: "medium",
    country: "ไทย/จีน (หลายแหล่ง)",
    countryConfidence: "medium",
    website: "",
    position: "Budget",
    color: "#94A3B8",
    shareEst: 8,
    shareConfidence: "low",
    pricePerPiece: 5,
    priceMin: 4,
    priceMax: 8,
    packPriceMin: 45,
    packPriceMax: 150,
    priceAxis: 3,
    qualityAxis: 4,
    portfolio: { pant: 3, tape: 3, pad: 2, overnight: 0, hospital: 0 },
    distribution: { hospital: 0, nursingHome: 0, retail: 60, pharmacy: 15, ecommerce: 25, subscription: 0 },
    benchmark: { marketShare: 5, price: 3, absorbency: 5, comfort: 5, availability: 8, hospital: 2, online: 6, brandStrength: 4 },
    channelStrength: { hospital: 1, nursingHome: 1, retail: 9, pharmacy: 6, ecommerce: 6, subscription: 1 },
    swot: {
      s: ["ราคาถูก", "ได้พื้นที่ชั้นวางในห้างของตัวเอง"],
      w: ["ไม่มีความภักดีต่อแบรนด์", "คุณภาพแปรผันตามผู้ผลิต"],
      o: ["ห้างผลักดันแบรนด์ตัวเอง"],
      t: ["สงครามราคา margin บาง"],
    },
    sentiment: {
      score: 52,
      positive: [{ word: "ถูก", weight: 8 }, { word: "สะดวกซื้อในห้าง", weight: 5 }],
      negative: [{ word: "คุณภาพไม่แน่นอน", weight: 6 }, { word: "ตัวเลือกน้อย", weight: 4 }],
    },
    strengths: "ราคาถูก ได้พื้นที่ชั้นวางในห้างของตัวเอง",
    weaknesses: "ไม่มีความภักดี คุณภาพแปรผัน",
    reviewRating: 3.5,
  },
];

export const othersShare = 5; // % รวมแบรนด์เล็กอื่นๆ

/* ---------- Market structure (computed) ---------- */
export function sortedByShare() {
  return [...brands].sort((a, b) => b.shareEst - a.shareEst);
}
export function cr(n: number) {
  return sortedByShare().slice(0, n).reduce((s, b) => s + b.shareEst, 0);
}
export function hhi() {
  return Math.round(brands.reduce((s, b) => s + b.shareEst ** 2, 0) + othersShare ** 2);
}
export function hhiInterpretation(v: number) {
  if (v < 1500) return "ตลาดแข่งขันสูง (กระจายตัว)";
  if (v < 2500) return "กระจุกตัวปานกลาง";
  return "กระจุกตัวสูง";
}

/* ---------- Channel labels ---------- */
export const channelKeys: { key: keyof BrandChannelMix; label: string }[] = [
  { key: "hospital", label: "โรงพยาบาล" },
  { key: "nursingHome", label: "Nursing Home" },
  { key: "retail", label: "ค้าปลีก/ห้าง" },
  { key: "pharmacy", label: "ร้านขายยา" },
  { key: "ecommerce", label: "E-commerce" },
  { key: "subscription", label: "Subscription" },
];

/* ---------- White Space Opportunity Engine ---------- */
export interface WhiteSpace {
  title: string;
  desc: string;
  score: number; // 0-100
  revenue: "Low" | "Medium" | "High";
  difficulty: "Low" | "Medium" | "High";
  weakCompetitors: string;
}

export const whiteSpaces: WhiteSpace[] = [
  { title: "Premium Subscription Model", desc: "ส่งผ้าอ้อมคุณภาพรายเดือนแบบสมาชิก ล็อกการซื้อซ้ำ", score: 86, revenue: "High", difficulty: "Medium", weakCompetitors: "แบรนด์ใหญ่ส่วนมากยังไม่มี Subscription จริงจัง (ยกเว้น Dr.Pants ที่ยังเล็ก)" },
  { title: "Home Delivery + Caregiver Service", desc: "ส่งถึงบ้าน + คำปรึกษาการดูแล ผูกกับบริการ", score: 80, revenue: "High", difficulty: "Medium", weakCompetitors: "คู่แข่งเน้นขายสินค้า ไม่เน้นบริการดูแล" },
  { title: "Elderly Care Ecosystem", desc: "รวมผ้าอ้อม + wipes + ครีม + underpad + คอนเทนต์ดูแล", score: 78, revenue: "High", difficulty: "High", weakCompetitors: "ตลาดยังขายแยกชิ้น ไม่มีใครทำ ecosystem ครบ" },
  { title: "Caregiver Community", desc: "คอมมูนิตี้ผู้ดูแล สร้าง trust + repeat purchase", score: 74, revenue: "Medium", difficulty: "Low", weakCompetitors: "ไม่มีแบรนด์ใหญ่เป็นเจ้าของคอมมูนิตี้ผู้ดูแล" },
  { title: "Smart Diaper Sensor", desc: "เซนเซอร์แจ้งเตือนเปลี่ยนผ้าอ้อม ลดงานผู้ดูแล", score: 64, revenue: "Medium", difficulty: "High", weakCompetitors: "ยังไม่มีผู้เล่นในไทยทำเชิงพาณิชย์" },
  { title: "Nursing Home SaaS Integration", desc: "ระบบจัดการสต๊อก/สั่งซื้ออัตโนมัติให้ศูนย์ดูแล", score: 70, revenue: "Medium", difficulty: "High", weakCompetitors: "B2B ส่วนใหญ่ยังสั่งแบบ manual" },
];

/* ---------- Investor View: Who is winning ---------- */
export const marketLeaders = {
  leader: { brand: "Certainty", why: "ส่วนแบ่งประเมินสูงสุด ~24% กระจายสินค้ากว้างทุกช่องทาง แบรนด์ไทยที่ผู้บริโภคคุ้นเคย" },
  fastestGrowing: { brand: "Dr.Pants", why: "โตเร็วบนออนไลน์/Subscription จับเทรนด์ผู้ดูแลซื้อออนไลน์ (ฐานยังเล็กแต่โมเมนตัมสูง)" },
  mostPremium: { brand: "Lifree / Tena", why: "ราคาต่อชิ้นสูงสุด (~15-16฿) คุณภาพ/เกรดการแพทย์ ครองภาพลักษณ์พรีเมียม" },
  mostAggressiveOnline: { brand: "MamyPoko Adult / An-An", why: "สัดส่วนยอดขายผ่าน E-commerce สูงสุด (35-45%) แข่งโปรโมชันบน Marketplace ดุ" },
  mostHospital: { brand: "Tena", why: "สัดส่วน รพ./Nursing home รวมกัน ~70% เกรดการแพทย์ เอกสารมาตรฐานครบ" },
  bestValue: { brand: "Certainty", why: "สมดุลราคา-คุณภาพดีที่สุดในกลุ่ม mass หาซื้อง่าย รีวิวคุ้มค่า" },
};
