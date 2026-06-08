# Thailand Adult Diaper & Bedridden Care Market Research Dashboard

Dashboard วิจัยตลาด **ผ้าอ้อมผู้ใหญ่และสินค้าดูแลผู้ป่วยติดเตียงในประเทศไทย** —
ออกแบบเพื่อช่วยเจ้าของธุรกิจตัดสินใจว่า _"ควรเข้าสู่ตลาดนี้หรือไม่ และถ้าควรเข้า ควรเริ่มอย่างไรให้เสี่ยงน้อยที่สุด"_

UI ทั้งหมดเป็น **ภาษาไทย** (คงคำศัพท์ธุรกิจภาษาอังกฤษที่ใช้ทั่วไป เช่น TAM/SAM/SOM, Gross Margin, B2B/B2C ไว้ตามต้นฉบับ)

> ⚠️ **Demo Data** — ตัวเลขทุกค่าในเวอร์ชันนี้เป็นข้อมูลตัวอย่างเพื่อแสดงโครงสร้าง Dashboard
> ต้อง **Validate ด้วยข้อมูลจริง** ก่อนตัดสินใจลงทุน โครงสร้างข้อมูลออกแบบให้แทนที่ด้วยข้อมูลจริงได้ง่าย

---

## ✨ Features

- **18 หน้าวิเคราะห์** ครบวงจร: Executive Summary, Market Overview, Product, Customer Segmentation,
  Market Size, Competitors, Pricing, Channels, B2B, B2C, Finance, Positioning, Regulation & Supply Chain,
  Risk Analysis, Strategic Recommendation, Sources & Assumptions, Field Research Checklist, Investor Summary
- **เครื่องคำนวณ interactive 2 ตัว**: Market Size Calculator และ Financial Scenario Calculator (อัปเดต real-time)
- **กราฟหลากหลาย** ด้วย Recharts: Line, Bar, Donut, Radar, Scatter (Positioning/Portfolio map), Risk Heatmap
- **Tabs / Filters / Drill-down**: คลิกการ์ด/แถว/heatmap เพื่อดูรายละเอียด
- **Data Confidence System**: ทุกตัวเลขมี badge บอกประเภท — `ตรวจสอบแล้ว / ประมาณการ / สมมติฐาน / ต้อง Validate เพิ่ม`
- **Export / Print PDF**: หน้า Investor Summary และทุกหน้าพิมพ์เป็น PDF ได้ (ซ่อน sidebar อัตโนมัติ)
- **Responsive**: Sidebar บน desktop / Hamburger menu บน mobile

## 🧰 Tech Stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Recharts · Lucide React

---

## 🚀 รันบนเครื่อง (Run Locally)

```bash
# 1) ติดตั้ง dependencies
npm install

# 2) รัน dev server
npm run dev
# เปิด http://localhost:3000

# 3) build สำหรับ production
npm run build
npm start
```

ต้องใช้ **Node.js 18.17+** (แนะนำ Node 20 ขึ้นไป)

---

## ✏️ แก้ไขข้อมูล (Edit Data)

ข้อมูลทั้งหมดอยู่ในโฟลเดอร์ [`/data`](./data) แยกเป็นไฟล์ตามหน้า — แก้ไฟล์ TypeScript เหล่านี้ได้โดยตรง:

| ไฟล์ | เนื้อหา |
|------|---------|
| `data/executive.ts` | คะแนนตลาด, โอกาส, ข้อกังวล, ข้อเสนอแนะ |
| `data/marketOverview.ts` | ปัจจัยขับเคลื่อนตลาด, เทรนด์ |
| `data/marketSize.ts` | Top-down/Bottom-up, TAM/SAM/SOM, Scenario |
| `data/competitors.ts` · `data/pricing.ts` | คู่แข่ง, ราคา |
| `data/channels.ts` · `data/b2bOpportunity.ts` · `data/b2cOpportunity.ts` | ช่องทาง, B2B, B2C |
| `data/finance.ts` | Unit economics, มาร์จิน, scenario, เงินทุน |
| `data/positioning.ts` · `data/regulation.ts` · `data/risks.ts` | ตำแหน่ง, กฎระเบียบ/sourcing, ความเสี่ยง |
| `data/recommendations.ts` · `data/sources.ts` · `data/fieldResearch.ts` | ข้อเสนอแนะ, แหล่งข้อมูล, เช็กลิสต์ |

### โครงสร้างข้อมูลมาตรฐาน (สำหรับแทนที่ด้วยข้อมูลจริง)

แต่ละ data point ที่ต้องอ้างอิงแหล่งที่มาใช้โครงสร้างนี้ (ดู `lib/types.ts` และ `data/sources.ts`):

```ts
{
  id: "elderly-population",
  title: "จำนวนประชากรผู้สูงอายุในประเทศไทย",
  category: "Market Size",
  value: 13_500_000,
  unit: "คน",
  source: "สำนักงานสถิติแห่งชาติ",
  sourceUrl: "https://...",
  confidenceLevel: "high",         // high | medium | low
  dataType: "verified",            // verified | estimate | assumption | needs_validation
  lastUpdated: "2567-12",
  note: "..."
}
```

**ขั้นตอนแทนที่ข้อมูลจริง:**
1. เก็บข้อมูลจริงตาม [หน้า Field Research Checklist](./app/field-research) และ Data Gap List ในหน้า Sources
2. แก้ค่าในไฟล์ `/data` ที่เกี่ยวข้อง
3. เปลี่ยน `dataType` เป็น `"verified"` และอัปเดต `source` / `lastUpdated`
4. ตัวเลขในกราฟ การ์ด และเครื่องคำนวณจะอัปเดตอัตโนมัติ

> สูตรคำนวณทั้งหมดอยู่ใน [`lib/formulas.ts`](./lib/formulas.ts) (market size, gross/contribution margin, break-even, LTV, CAC payback ฯลฯ)

---

## ☁️ Deploy & แชร์ลิงก์สาธารณะ

### Vercel (แนะนำ)
1. push โค้ดขึ้น GitHub
2. ไปที่ [vercel.com](https://vercel.com) → **New Project** → import repo
3. Vercel ตรวจจับ Next.js อัตโนมัติ — กด **Deploy**
4. ได้ public URL เช่น `https://your-project.vercel.app` แชร์ได้ทันที

หรือผ่าน CLI:
```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production + public link
```

### Netlify
1. import repo ที่ [netlify.com](https://netlify.com) (มี `netlify.toml` ให้แล้ว)
2. Build command: `npm run build` — กด Deploy → ได้ public URL

### Railway
1. ที่ [railway.app](https://railway.app) → **New Project → Deploy from GitHub**
2. ตั้ง Start command: `npm start` (หลัง build) → ได้ public domain

---

## 🖨️ Export เป็น PDF

กดปุ่ม **Export Summary** (มุมขวาบน) หรือ **Export / Print PDF** ในหน้า Investor Summary →
ระบบเปิด print dialog ของเบราว์เซอร์ → เลือก "Save as PDF" (sidebar และ header จะถูกซ่อนอัตโนมัติ)

---

## 📁 โครงสร้างโปรเจกต์

```
app/                 # หน้าทั้งหมด (Next.js App Router) — 1 โฟลเดอร์ = 1 หน้า
components/
  ui/                # MetricCard, ScoreCard, Badges, Table, Tabs, Boxes ...
  charts/            # Recharts wrappers (Bar/Line/Donut/Radar/Scatter)
  layout/            # Sidebar, Header (+ mobile nav)
  tools/             # MarketSizeCalculator, FinancialScenarioCalculator
data/                # ข้อมูลทั้งหมด (แก้ที่นี่)
lib/                 # utils, formulas, types, nav config
```

---

_สร้างเป็น clickable demo เพื่อพรีเซนต์ต่อพาร์ตเนอร์/นักลงทุน — โครงสร้างพร้อมต่อยอดด้วยข้อมูลจริง_
