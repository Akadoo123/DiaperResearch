export interface Channel {
  name: string;
  group: "Online" | "Offline" | "B2B";
  audience: "B2C" | "B2B" | "ทั้งคู่";
  access: number; // 1-10
  trust: number;
  margin: number;
  volume: number;
  difficulty: number; // ยิ่งสูงยิ่งยาก
  creditTerm: string;
  inventoryBurden: number;
  marketingCost: number;
  speed: number; // speed to launch
  scalability: number;
  priority: 1 | 2 | 3; // phase
}

export const channels: Channel[] = [
  { name: "Shopee", group: "Online", audience: "B2C", access: 9, trust: 6, margin: 6, volume: 8, difficulty: 4, creditTerm: "ทันที", inventoryBurden: 5, marketingCost: 7, speed: 9, scalability: 8, priority: 1 },
  { name: "Lazada", group: "Online", audience: "B2C", access: 8, trust: 6, margin: 6, volume: 7, difficulty: 4, creditTerm: "ทันที", inventoryBurden: 5, marketingCost: 7, speed: 9, scalability: 8, priority: 1 },
  { name: "TikTok Shop", group: "Online", audience: "B2C", access: 9, trust: 5, margin: 6, volume: 8, difficulty: 5, creditTerm: "ทันที", inventoryBurden: 5, marketingCost: 8, speed: 8, scalability: 8, priority: 1 },
  { name: "Facebook Page", group: "Online", audience: "B2C", access: 7, trust: 6, margin: 7, volume: 5, difficulty: 4, creditTerm: "ทันที", inventoryBurden: 4, marketingCost: 6, speed: 8, scalability: 6, priority: 1 },
  { name: "LINE OA", group: "Online", audience: "B2C", access: 7, trust: 7, margin: 8, volume: 5, difficulty: 4, creditTerm: "ทันที", inventoryBurden: 4, marketingCost: 5, speed: 7, scalability: 6, priority: 1 },
  { name: "เว็บไซต์แบรนด์ (D2C)", group: "Online", audience: "B2C", access: 5, trust: 6, margin: 9, volume: 4, difficulty: 6, creditTerm: "ทันที", inventoryBurden: 4, marketingCost: 7, speed: 6, scalability: 6, priority: 2 },
  { name: "ร้านขายยา", group: "Offline", audience: "ทั้งคู่", access: 7, trust: 8, margin: 5, volume: 6, difficulty: 6, creditTerm: "30-60 วัน", inventoryBurden: 6, marketingCost: 4, speed: 5, scalability: 6, priority: 2 },
  { name: "ร้านเวชภัณฑ์", group: "Offline", audience: "ทั้งคู่", access: 6, trust: 8, margin: 6, volume: 6, difficulty: 5, creditTerm: "30 วัน", inventoryBurden: 6, marketingCost: 3, speed: 5, scalability: 5, priority: 2 },
  { name: "Modern Trade", group: "Offline", audience: "B2C", access: 6, trust: 8, margin: 4, volume: 8, difficulty: 9, creditTerm: "60-90 วัน", inventoryBurden: 8, marketingCost: 8, speed: 3, scalability: 8, priority: 3 },
  { name: "Nursing Home", group: "B2B", audience: "B2B", access: 6, trust: 7, margin: 6, volume: 8, difficulty: 6, creditTerm: "30-60 วัน", inventoryBurden: 6, marketingCost: 3, speed: 5, scalability: 7, priority: 2 },
  { name: "โรงพยาบาล", group: "B2B", audience: "B2B", access: 4, trust: 8, margin: 5, volume: 9, difficulty: 9, creditTerm: "60-120 วัน", inventoryBurden: 7, marketingCost: 3, speed: 2, scalability: 8, priority: 3 },
  { name: "Home care agency", group: "B2B", audience: "B2B", access: 6, trust: 7, margin: 6, volume: 6, difficulty: 5, creditTerm: "30 วัน", inventoryBurden: 5, marketingCost: 3, speed: 6, scalability: 6, priority: 2 },
  { name: "Distributor", group: "B2B", audience: "B2B", access: 7, trust: 6, margin: 4, volume: 9, difficulty: 6, creditTerm: "30-60 วัน", inventoryBurden: 5, marketingCost: 2, speed: 5, scalability: 9, priority: 3 },
  { name: "จัดซื้อภาครัฐ", group: "B2B", audience: "B2B", access: 3, trust: 8, margin: 5, volume: 9, difficulty: 10, creditTerm: "90-120 วัน", inventoryBurden: 7, marketingCost: 2, speed: 2, scalability: 8, priority: 3 },
  { name: "NGO / มูลนิธิ", group: "B2B", audience: "B2B", access: 4, trust: 7, margin: 4, volume: 5, difficulty: 6, creditTerm: "30-60 วัน", inventoryBurden: 5, marketingCost: 2, speed: 4, scalability: 5, priority: 3 },
];

export const rolloutPhases = [
  {
    phase: "Phase 1 — Validate & Margin",
    items: ["Online Marketplace (Shopee/Lazada/TikTok)", "ชุมชน Caregiver", "Subscription Trial ตรง"],
    goal: "ทดสอบความต้องการ ราคา และการซื้อซ้ำเร็วที่สุด",
  },
  {
    phase: "Phase 2 — Trust & Volume",
    items: ["ร้านขายยา", "ร้านเวชภัณฑ์", "Nursing home pilot"],
    goal: "สร้างความน่าเชื่อถือและฐานยอดที่คาดการณ์ได้",
  },
  {
    phase: "Phase 3 — Scale",
    items: ["โรงพยาบาล", "Distributor", "Modern trade", "จัดซื้อภาครัฐ/NGO"],
    goal: "ขยายปริมาณเมื่อพิสูจน์โมเดลแล้ว",
  },
];

export const bestChannelFor = {
  validation: "Online Marketplace (เร็ว เก็บข้อมูลได้ทันที)",
  scale: "Distributor / โรงพยาบาล (ปริมาณสูง)",
  margin: "LINE OA / เว็บไซต์แบรนด์ (D2C)",
  trust: "ร้านขายยา / ร้านเวชภัณฑ์",
};
