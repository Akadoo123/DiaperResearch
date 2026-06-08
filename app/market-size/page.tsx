"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { MetricCard } from "@/components/ui/MetricCard";
import { Card, CardBody } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/Table";
import { InsightCard, RecommendationBox, ChartNote } from "@/components/ui/Boxes";
import { DataConfidenceBadge, Badge } from "@/components/ui/Badges";
import { Tabs } from "@/components/ui/Tabs";
import { BarChartBox } from "@/components/charts/Charts";
import { MarketSizeCalculator } from "@/components/tools/MarketSizeCalculator";
import { annualConsumption, annualMarketValue } from "@/lib/formulas";
import { fmt, fmtBaht } from "@/lib/utils";
import {
  topDownDefaults,
  bottomUp,
  tamSamSom,
  scenarios,
  sizingAssumptions,
} from "@/data/marketSize";
import { Layers, Target, TrendingUp, Calendar } from "lucide-react";

export default function MarketSizePage() {
  const td = topDownDefaults;
  const tdUsers = td.elderlyPopulation * (td.pctNeedIncontinence + td.pctBedridden);
  const tdConsumption = annualConsumption(tdUsers, td.diapersPerDay);
  const tdValue = annualMarketValue(tdConsumption, td.pricePerPiece);

  const bottomUpTotal = bottomUp.reduce((s, b) => s + b.count * b.monthlyPerUnit * 12, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="ขนาดตลาดและการเติบโต (Market Size & Growth)"
        description="ประเมินขนาดตลาดทั้งแบบ Top-down และ Bottom-up พร้อม TAM / SAM / SOM และ Scenario — ตัวเลขทั้งหมดเป็นข้อมูลตัวอย่างที่ต้อง Validate"
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <MetricCard label="TAM (ตลาดรวม)" value={fmt(tamSamSom.tam)} unit="ล้านบาท" icon={Layers} tone="brand" dataType="estimate" />
        <MetricCard label="SAM (เข้าถึงได้)" value={fmt(tamSamSom.sam)} unit="ล้านบาท" icon={Target} tone="brand" dataType="estimate" />
        <MetricCard label="SOM (ปี 1-3)" value={fmt(tamSamSom.som)} unit="ล้านบาท" icon={TrendingUp} tone="leaf" dataType="assumption" />
        <MetricCard label="เป้าปีที่ 1" value={fmt(tamSamSom.year1)} unit="ล้านบาท" icon={Calendar} tone="leaf" dataType="assumption" />
        <MetricCard label="เป้าปีที่ 3" value={fmt(tamSamSom.year3)} unit="ล้านบาท" icon={Calendar} tone="leaf" dataType="assumption" />
      </div>

      <Tabs
        tabs={[
          {
            label: "Top-down",
            content: (
              <Card>
                <CardBody>
                  <h3 className="mb-2 text-base font-bold text-ink">โมเดล Top-down</h3>
                  <div className="mb-4 rounded-xl bg-brand-gradient-soft p-4 text-sm">
                    <p className="font-semibold text-brand-700">สูตร:</p>
                    <p className="mt-1 font-mono text-xs text-ink">
                      มูลค่าตลาด = ผู้ใช้เป้าหมาย × ผ้าอ้อม/คน/วัน × ราคา/ชิ้น × 365
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <ModelStat label="ประชากรสูงวัย" value={`${fmt(td.elderlyPopulation)} คน`} />
                    <ModelStat label="% ต้องใช้สินค้า" value={`${(td.pctNeedIncontinence + td.pctBedridden) * 100}%`} />
                    <ModelStat label="ผู้ใช้เป้าหมาย" value={`${fmt(tdUsers)} คน`} />
                    <ModelStat label="ชิ้น/คน/วัน" value={`${td.diapersPerDay}`} />
                    <ModelStat label="ราคา/ชิ้น" value={`${td.pricePerPiece} บาท`} />
                    <ModelStat label="ปริมาณ/ปี" value={`${fmt(tdConsumption / 1_000_000, 0)} ล้านชิ้น`} />
                    <ModelStat label="มูลค่าตลาด/ปี" value={fmtBaht(tdValue)} highlight />
                  </div>
                  <ChartNote>
                    Top-down เริ่มจากประชากรรวมแล้วคูณสัดส่วน — ดีสำหรับเห็นภาพใหญ่ แต่{" "}
                    <b>ความแม่นยำขึ้นกับสมมติฐาน %</b> ที่ต้อง Validate
                  </ChartNote>
                </CardBody>
              </Card>
            ),
          },
          {
            label: "Bottom-up",
            content: (
              <div className="space-y-3">
                <DataTable
                  columns={[
                    { key: "item", label: "แหล่งความต้องการ" },
                    { key: "count", label: "จำนวน" },
                    { key: "per", label: "การใช้/หน่วย/เดือน" },
                    { key: "yearly", label: "ปริมาณ/ปี (ชิ้น)" },
                  ]}
                  rows={bottomUp.map((b) => ({
                    item: <span className="font-medium">{b.item}</span>,
                    count: fmt(b.count),
                    per: `${fmt(b.monthlyPerUnit)} ${b.unit}`,
                    yearly: fmt(b.count * b.monthlyPerUnit * 12),
                  }))}
                  caption={`รวมประมาณ ${fmt(bottomUpTotal / 1_000_000, 0)} ล้านชิ้น/ปี — ข้อมูลตัวอย่าง ต้อง Validate`}
                />
                <ChartNote>
                  Bottom-up รวมความต้องการจากแต่ละแหล่ง (รพ./nursing home/home care/ร้านยา) —
                  แม่นกว่าถ้ามีข้อมูลจริง และช่วยระบุว่า "ช่องทางไหนมี volume จริง"
                </ChartNote>
              </div>
            ),
          },
          {
            label: "TAM / SAM / SOM",
            content: (
              <div className="grid gap-3 md:grid-cols-3">
                <TamCard t="TAM" full="Total Addressable Market" v={tamSamSom.tam} desc="ตลาดรวมทั้งหมดถ้าเข้าถึงทุกคน" tone="brand" />
                <TamCard t="SAM" full="Serviceable Available Market" v={tamSamSom.sam} desc="ส่วนที่สินค้า/ช่องทางเราเข้าถึงได้จริง" tone="brand" />
                <TamCard t="SOM" full="Serviceable Obtainable Market" v={tamSamSom.som} desc="ส่วนที่ได้จริงใน 1-3 ปีแรก" tone="leaf" />
              </div>
            ),
          },
          {
            label: "Scenario",
            content: (
              <div className="space-y-3">
                <DataTable
                  columns={[
                    { key: "name", label: "Scenario" },
                    { key: "users", label: "ผู้ใช้เป้าหมาย" },
                    { key: "perDay", label: "ชิ้น/วัน" },
                    { key: "price", label: "ราคา/ชิ้น" },
                    { key: "pen", label: "Penetration" },
                    { key: "vol", label: "ปริมาณ/ปี" },
                    { key: "value", label: "มูลค่า/ปี" },
                  ]}
                  rows={scenarios.map((s) => {
                    const u = s.targetUsers * s.penetration;
                    const c = annualConsumption(u, s.diapersPerDay);
                    const v = annualMarketValue(c, s.pricePerPiece);
                    return {
                      name: <Badge tone={s.tone}>{s.name}</Badge>,
                      users: fmt(s.targetUsers),
                      perDay: s.diapersPerDay,
                      price: `${s.pricePerPiece} บาท`,
                      pen: `${s.penetration * 100}%`,
                      vol: `${fmt(c / 1_000_000, 1)} ล้านชิ้น`,
                      value: <span className="font-bold">{fmtBaht(v)}</span>,
                    };
                  })}
                />
                <Card>
                  <CardBody>
                    <BarChartBox
                      data={scenarios.map((s) => {
                        const u = s.targetUsers * s.penetration;
                        const v = annualMarketValue(annualConsumption(u, s.diapersPerDay), s.pricePerPiece);
                        return { name: s.name, value: Math.round(v / 1_000_000) };
                      })}
                      xKey="name"
                      bars={[{ key: "value", name: "มูลค่า (ล้านบาท)", color: "#22C55E" }]}
                      height={240}
                    />
                    <ChartNote>
                      เปรียบเทียบ Best/Base/Worst ช่วยตั้งเป้าแบบมีช่วง — ใช้ Base Case ในการวางแผน
                      และเตรียมแผนรับมือถ้าเข้าใกล้ Worst Case
                    </ChartNote>
                  </CardBody>
                </Card>
              </div>
            ),
          },
        ]}
      />

      <MarketSizeCalculator />

      <div>
        <h3 className="mb-3 text-base font-bold text-ink">ตารางสมมติฐาน (Assumptions)</h3>
        <DataTable
          columns={[
            { key: "a", label: "สมมติฐาน" },
            { key: "v", label: "ค่า" },
            { key: "s", label: "แหล่งข้อมูล" },
            { key: "c", label: "Confidence" },
            { key: "validate", label: "ต้อง Validate?" },
          ]}
          rows={sizingAssumptions.map((a) => ({
            a: <span className="font-medium">{a.assumption}</span>,
            v: a.value,
            s: <span className="text-xs text-ink-soft">{a.source}</span>,
            c: <DataConfidenceBadge type={a.dataType} />,
            validate: a.dataType !== "verified" ? <Badge tone="danger">ใช่</Badge> : <Badge tone="leaf">ไม่</Badge>,
          }))}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <InsightCard>
          ตลาดรวม (TAM) ใหญ่ระดับหมื่นล้านบาท แต่ <b>SOM ที่ได้จริงใน 1-3 ปีอยู่หลักร้อยล้าน</b> —
          ต้องตั้งเป้าจาก SOM ไม่ใช่ TAM
        </InsightCard>
        <RecommendationBox>
          ก่อนลงทุน ต้อง Validate 3 ตัวเลขหลัก: <b>จำนวนผู้ใช้จริง, ปริมาณใช้ต่อวัน, และราคาต่อชิ้น</b>{" "}
          เพราะมีผลต่อขนาดตลาดมากที่สุด
        </RecommendationBox>
      </div>
    </div>
  );
}

function ModelStat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-3 ${highlight ? "bg-brand-gradient text-white" : "bg-slate-50"}`}>
      <p className={`text-[11px] ${highlight ? "text-white/80" : "text-ink-soft"}`}>{label}</p>
      <p className={`mt-0.5 text-sm font-bold ${highlight ? "text-white" : "text-ink"}`}>{value}</p>
    </div>
  );
}

function TamCard({ t, full, v, desc, tone }: { t: string; full: string; v: number; desc: string; tone: "brand" | "leaf" }) {
  return (
    <Card className="avoid-break">
      <CardBody>
        <div className="flex items-center justify-between">
          <span className={`text-2xl font-bold ${tone === "leaf" ? "text-leaf-600" : "text-brand-600"}`}>{t}</span>
          <Badge tone={tone}>{fmt(v)} ลบ.</Badge>
        </div>
        <p className="mt-1 text-xs font-semibold text-ink">{full}</p>
        <p className="mt-1 text-xs text-ink-soft">{desc}</p>
      </CardBody>
    </Card>
  );
}
