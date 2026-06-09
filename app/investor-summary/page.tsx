"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { ScoreCard } from "@/components/ui/ScoreCard";
import { Badge } from "@/components/ui/Badges";
import { marketAttractivenessScore, execKpis, finalRecommendation } from "@/data/executive";
import { tamSamSom } from "@/data/marketSize";
import { validation90, requiredBudget } from "@/data/recommendations";
import { fmt } from "@/lib/utils";
import { Download, Layers, Target, TrendingUp, Wallet, Flag, AlertTriangle } from "lucide-react";

export default function InvestorSummary() {
  return (
    <div className="space-y-5">
      <div className="no-print flex items-center justify-between">
        <PageHeader
          title="สรุปหน้าเดียวสำหรับนักลงทุน (One-Page Investor Summary)"
          description="สรุปงานวิจัยทั้งหมดในหน้าเดียว — ออกแบบให้เข้าใจโอกาสภายใน 3-5 นาที และพิมพ์/Export PDF ได้"
        />
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-4 py-2 text-sm font-medium text-white shadow-soft"
        >
          <Download className="h-4 w-4" /> Export / Print PDF
        </button>
      </div>

      <div className="print-full space-y-4">
        {/* Title for print */}
        <div className="hidden print:block">
          <h1 className="text-xl font-bold">ตลาดผ้าอ้อมผู้ใหญ่และสินค้าดูแลผู้ป่วยติดเตียงในประเทศไทย</h1>
          <p className="text-sm text-ink-soft">One-Page Investor Summary — Demo Data</p>
        </div>

        {/* Top: score + headline */}
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="avoid-break">
            <CardBody className="flex flex-col items-center">
              <ScoreCard score={marketAttractivenessScore} title="Market Attractiveness" subtitle="น่าสนใจ — บริหารความเสี่ยง" size={150} />
            </CardBody>
          </Card>
          <Card className="avoid-break lg:col-span-2 border-amber-100 bg-amber-50/40">
            <CardBody>
              <div className="flex items-center gap-2">
                <Flag className="h-5 w-5 text-amber-600" />
                <h3 className="text-base font-bold text-ink">Go / No-Go Recommendation</h3>
              </div>
              <p className="mt-2 text-lg font-bold text-amber-700">{finalRecommendation.decision}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
                <p><b>กลุ่มแรก:</b> {finalRecommendation.firstSegment}</p>
                <p><b>Hero Product:</b> {finalRecommendation.heroProduct}</p>
                <p><b>ช่องทางแรก:</b> {finalRecommendation.firstChannel}</p>
                <p><b>งบ Validate:</b> {requiredBudget}</p>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
          <KpiBox icon={Layers} label="TAM" value={`${fmt(tamSamSom.tam)} ลบ.`} />
          <KpiBox icon={Target} label="SAM" value={`${fmt(tamSamSom.sam)} ลบ.`} />
          <KpiBox icon={TrendingUp} label="SOM (ปี1-3)" value={`${fmt(tamSamSom.som)} ลบ.`} />
          <KpiBox icon={Wallet} label="GM เป้า" value={`${execKpis.grossMarginTarget}%`} />
          <KpiBox icon={Target} label="กลุ่มแรก" value="Caregiver" />
          <KpiBox icon={AlertTriangle} label="เสี่ยงสูงสุด" value="สงครามราคา" />
        </div>

        {/* Three columns: opportunity / strategy / risk */}
        <div className="grid gap-3 lg:grid-cols-3">
          <SummaryCard title="โอกาส (Opportunity)" tone="leaf" items={[
            "สังคมสูงวัย — ดีมานด์โตเชิงโครงสร้าง (CAGR ~7.5%)",
            "สินค้า Repeat Purchase + Subscription",
            "B2B (Nursing home) สร้าง Volume",
            "Online เก็บ Margin เองได้",
          ]} />
          <SummaryCard title="กลยุทธ์ (Strategy)" tone="brand" items={[
            "Positioning: เพื่อผู้ดูแล + ลดรั่วกลางคืน",
            "Hero: ผ้าอ้อมเทป/Overnight ซึมซับสูง",
            "ราคา: 9-11 บาท/ชิ้น (Mid/Value)",
            "ช่องทาง: Marketplace → ร้านยา → B2B",
          ]} />
          <SummaryCard title="ความเสี่ยง (Risk)" tone="danger" items={[
            "สงครามราคาจากสินค้านำเข้าถูก",
            "คุณภาพ (รั่ว/ผื่น) → รีวิวลบ",
            "เงินทุนจมในสต๊อก (bulky)",
            "เครดิตเทอม B2B ยาว → Cashflow",
          ]} />
        </div>

        {/* Competitors + pricing quick */}
        <div className="grid gap-3 lg:grid-cols-2">
          <Card className="avoid-break">
            <CardBody>
              <h4 className="mb-2 text-sm font-bold text-ink">คู่แข่งหลัก & ราคา</h4>
              <p className="text-sm text-ink-soft">
                Certainty นำตลาด (~24%, Mass ~9฿) · กลุ่มญี่ปุ่น Lifree/MamyPoko ครอง Premium (~12-15฿) ·
                Tena/Depend เกรดการแพทย์ · An-An/Fitti/OEM แข่งราคาล่าง (~5-6฿). ช่องว่าง = "คุณภาพดี
                ราคากลาง + Subscription/Caregiver" ที่ผู้นำยังไม่ได้เป็นเจ้าของ
              </p>
            </CardBody>
          </Card>
          <Card className="avoid-break">
            <CardBody>
              <h4 className="mb-2 text-sm font-bold text-ink">ศักยภาพการเงิน</h4>
              <p className="text-sm text-ink-soft">
                เป้า Gross Margin ≥ 45%, LTV/ลูกค้า ~7,200฿ (Subscription), เงินลงทุนเริ่มต้น 3-5 ลบ.,
                Break-even Base ~7 เดือน. ช่องทาง Margin สูงสุด = D2C/LINE OA.
              </p>
            </CardBody>
          </Card>
        </div>

        {/* 90-day roadmap */}
        <Card className="avoid-break">
          <CardBody>
            <h4 className="mb-3 text-sm font-bold text-ink">90-Day Validation Roadmap</h4>
            <div className="grid gap-2 md:grid-cols-3">
              {validation90.map((m, i) => (
                <div key={m.month} className="rounded-xl bg-brand-gradient-soft p-3">
                  <Badge tone={i === 0 ? "brand" : i === 1 ? "warn" : "leaf"}>{m.month}</Badge>
                  <ul className="mt-2 space-y-0.5 text-xs text-ink">
                    {m.items.slice(0, 4).map((it) => (
                      <li key={it}>• {it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <p className="rounded-xl bg-amber-50 p-3 text-center text-[11px] text-amber-700">
          ข้อมูลชุดนี้เป็นข้อมูลตัวอย่าง (Demo Data) เพื่อแสดงโครงสร้างการตัดสินใจ —
          ต้อง Validate ด้วยข้อมูลจริงก่อนตัดสินใจลงทุน
        </p>
      </div>
    </div>
  );
}

function KpiBox({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-card p-3 shadow-soft avoid-break">
      <div className="flex items-center gap-1.5 text-ink-soft">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-[11px] font-medium">{label}</span>
      </div>
      <p className="mt-1 text-lg font-bold text-ink">{value}</p>
    </div>
  );
}

function SummaryCard({ title, tone, items }: { title: string; tone: "leaf" | "brand" | "danger"; items: string[] }) {
  const map = { leaf: "border-leaf-100 bg-leaf-50/40", brand: "border-brand-100 bg-brand-50/40", danger: "border-red-100 bg-red-50/40" };
  return (
    <Card className={`avoid-break ${map[tone]}`}>
      <CardBody>
        <h4 className="mb-2 text-sm font-bold text-ink">{title}</h4>
        <ul className="space-y-1.5 text-sm text-ink">
          {items.map((it) => (
            <li key={it} className="flex gap-2"><span className="text-ink-soft">•</span> {it}</li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
