import { DataType } from "@/lib/types";

export const demandDrivers: {
  driver: string;
  why: string;
  impact: string;
  dataNeeded: string;
  confidence: "high" | "medium" | "low";
  dataType: DataType;
}[] = [
  {
    driver: "ประชากรสูงวัยเพิ่มขึ้น",
    why: "ไทยเข้าสู่สังคมสูงวัยสมบูรณ์ (Aged Society)",
    impact: "ฐานผู้ใช้ผ้าอ้อมผู้ใหญ่โตเชิงโครงสร้างทุกปี",
    dataNeeded: "สถิติประชากร 60+ จากสำนักงานสถิติแห่งชาติ",
    confidence: "high",
    dataType: "estimate",
  },
  {
    driver: "อัตราพึ่งพิงผู้สูงอายุสูงขึ้น",
    why: "วัยทำงานต่อผู้สูงอายุลดลง ภาระดูแลเพิ่ม",
    impact: "ครอบครัวต้องพึ่งสินค้า care ที่ช่วยลดภาระมากขึ้น",
    dataNeeded: "Old-age dependency ratio",
    confidence: "medium",
    dataType: "estimate",
  },
  {
    driver: "ผู้ป่วยติดเตียง / Long-term care",
    why: "Stroke, เบาหวาน, ผู้ป่วยพักฟื้น เพิ่มขึ้น",
    impact: "กลุ่มใช้ผ้าอ้อมเข้มข้น (ปริมาณสูงต่อคน)",
    dataNeeded: "จำนวนผู้ป่วยติดเตียงจากกระทรวงสาธารณสุข",
    confidence: "low",
    dataType: "needs_validation",
  },
  {
    driver: "โรคเรื้อรังและปัญหาการเคลื่อนไหว",
    why: "NCDs เพิ่มในกลุ่มสูงวัย",
    impact: "เพิ่มภาวะกลั้นปัสสาวะไม่อยู่และความต้องการสินค้า",
    dataNeeded: "ข้อมูลความชุกของ NCDs",
    confidence: "medium",
    dataType: "estimate",
  },
  {
    driver: "ครอบครัวขนาดเล็กลง",
    why: "ลูกหลานน้อย ดูแลเองยากขึ้น",
    impact: "หันมาใช้สินค้า care + บริการ home care",
    dataNeeded: "ขนาดครัวเรือนเฉลี่ย",
    confidence: "medium",
    dataType: "estimate",
  },
  {
    driver: "ขาดแคลนผู้ดูแล (Caregiver shortage)",
    why: "แรงงานดูแลไม่พอกับความต้องการ",
    impact: "ต้องใช้สินค้าที่ช่วยลดภาระ/เปลี่ยนน้อยลง",
    dataNeeded: "จำนวนผู้ดูแลในระบบ",
    confidence: "low",
    dataType: "needs_validation",
  },
  {
    driver: "Home care & Nursing home โต",
    why: "บริการดูแลผู้สูงอายุขยายตัว",
    impact: "เปิดช่องทาง B2B ปริมาณมาก",
    dataNeeded: "จำนวน nursing home ที่จดทะเบียน",
    confidence: "low",
    dataType: "needs_validation",
  },
  {
    driver: "เทรนด์ฟื้นตัวที่บ้าน (Home recovery)",
    why: "โรงพยาบาลให้กลับไปพักฟื้นที่บ้านเร็วขึ้น",
    impact: "เพิ่มการซื้อสินค้า care สำหรับใช้ที่บ้าน",
    dataNeeded: "ข้อมูล discharge และ home recovery",
    confidence: "low",
    dataType: "assumption",
  },
  {
    driver: "พฤติกรรมซื้อออนไลน์",
    why: "ผู้ซื้อ (ลูกหลาน) คุ้นกับ e-commerce",
    impact: "ช่องทางออนไลน์เข้าถึงและซื้อซ้ำง่าย",
    dataNeeded: "Search demand + marketplace data",
    confidence: "medium",
    dataType: "estimate",
  },
  {
    driver: "ความคาดหวังด้านคุณภาพ/สุขอนามัยสูงขึ้น",
    why: "ผู้บริโภคยอมจ่ายเพื่อคุณภาพและศักดิ์ศรี",
    impact: "เปิดช่องสำหรับสินค้า premium / differentiated",
    dataNeeded: "ผลสำรวจความพึงพอใจ/รีวิว",
    confidence: "medium",
    dataType: "assumption",
  },
];

/** แนวโน้มขนาดตลาดประมาณการ (Demo) — ล้านบาท/ปี */
export const marketTrend = [
  { year: "2567", value: 26500 },
  { year: "2568", value: 28600 },
  { year: "2569", value: 30900 },
  { year: "2570", value: 33400 },
  { year: "2571", value: 36100 },
  { year: "2572", value: 39000 },
  { year: "2573", value: 42100 },
];

export const macroKpis = {
  elderlyPopulation: 13.5, // ล้านคน (demo)
  elderlyShare: 20, // % ของประชากร
  cagr: 7.5, // %
  bedridden: 0.45, // ล้านคน (demo, needs validation)
};
