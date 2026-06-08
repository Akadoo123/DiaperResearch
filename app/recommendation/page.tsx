"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/Table";
import { InsightCard, RecommendationBox, ChartNote } from "@/components/ui/Boxes";
import { Badge } from "@/components/ui/Badges";
import { RadarChartBox, BarChartBox } from "@/components/charts/Charts";
import {
  entryDecision,
  beachhead,
  validation90,
  kpis,
  decisionMatrix,
  roadmap12,
  requiredBudget,
} from "@/data/recommendations";
import { Flag, Target, CheckCircle2 } from "lucide-react";

export default function RecommendationPage() {
  const overall = decisionMatrix.find((d) => d.area.includes("Overall"))?.score ?? 7;
  return (
    <div className="space-y-6">
      <PageHeader
        title="ข้อเสนอแนะเชิงกลยุทธ์ (Strategic Recommendation)"
        description="สรุปการตัดสินใจเข้าตลาด กลุ่ม beachhead แผน Validate 90 วัน KPI ที่ต้องติดตาม และ Decision Matrix"
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="avoid-break border-amber-100 bg-amber-50/40 lg:col-span-2">
          <CardBody>
            <div className="flex items-center gap-2">
              <Flag className="h-5 w-5 text-amber-600" />
              <h3 className="text-lg font-bold text-ink">การตัดสินใจเข้าตลาด</h3>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Enter now", "Enter after validation", "Wait", "Do not enter"].map((opt) => (
                <Badge key={opt} tone={opt === "Enter after validation" ? "warn" : "neutral"} className={opt === "Enter after validation" ? "ring-2 ring-amber-400" : ""}>
                  {opt === "Enter after validation" ? "✓ " : ""}
                  {opt}
                </Badge>
              ))}
            </div>
            <p className="mt-3 text-base font-bold text-amber-700">{entryDecision.choice}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink">{entryDecision.rationale}</p>
          </CardBody>
        </Card>

        <Card className="avoid-break border-leaf-100 bg-leaf-50/40">
          <CardBody>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-leaf-600" />
              <h3 className="text-base font-bold text-ink">Beachhead Segment</h3>
            </div>
            <p className="mt-2 text-sm font-bold text-ink">{beachhead.segment}</p>
            <p className="mt-1 text-xs text-ink-soft">{beachhead.why}</p>
            <p className="mt-3 rounded-lg bg-white/70 p-2 text-xs text-ink"><b>งบประมาณ:</b> {requiredBudget}</p>
          </CardBody>
        </Card>
      </div>

      <Card className="avoid-break">
        <CardBody>
          <h3 className="mb-3 text-base font-bold text-ink">แผน Validate 90 วัน</h3>
          <div className="grid gap-3 md:grid-cols-3">
            {validation90.map((m, i) => (
              <div key={m.month} className="rounded-xl border border-line bg-white p-4">
                <Badge tone={i === 0 ? "brand" : i === 1 ? "warn" : "leaf"}>{m.month}</Badge>
                <ul className="mt-3 space-y-1.5 text-sm text-ink">
                  {m.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-leaf-500" /> {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="avoid-break">
          <CardBody>
            <h3 className="mb-1 text-base font-bold text-ink">Final Decision Matrix</h3>
            <RadarChartBox data={decisionMatrix.map((d) => ({ axis: d.area.replace(" (กลับด้าน)", ""), value: d.score }))} name="คะแนน (1-10)" height={340} />
            <ChartNote>
              Decision Matrix รวมทุกมิติเป็นภาพเดียว คะแนนรวม (Overall) = {overall}/10 → "น่าสนใจแต่ต้องบริหารความเสี่ยง"
              — จุดอ่อนคือ Working Capital และ Competitive Intensity
            </ChartNote>
          </CardBody>
        </Card>

        <Card className="avoid-break">
          <CardBody>
            <h3 className="mb-3 text-base font-bold text-ink">12-Month Roadmap</h3>
            <div className="space-y-2">
              {roadmap12.map((r, i) => (
                <div key={r.period} className="flex items-center gap-3 rounded-xl bg-brand-gradient-soft p-3">
                  <span className="rounded-lg bg-white px-2 py-1 text-xs font-bold text-brand-600">{i + 1}</span>
                  <div>
                    <p className="text-sm font-bold text-ink">{r.period}</p>
                    <p className="text-xs text-ink-soft">{r.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <div>
        <h3 className="mb-3 text-base font-bold text-ink">KPI Dashboard ที่ต้องติดตาม</h3>
        <DataTable
          columns={[
            { key: "kpi", label: "KPI" },
            { key: "target", label: "เป้าหมาย" },
            { key: "note", label: "คำอธิบาย" },
          ]}
          rows={kpis.map((k) => ({
            kpi: <span className="font-medium">{k.kpi}</span>,
            target: <Badge tone="leaf">{k.target}</Badge>,
            note: <span className="text-xs text-ink-soft">{k.note}</span>,
          }))}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <InsightCard>
          คะแนนรวมโอกาส = <b>{overall}/10</b> — ตลาดน่าสนใจแต่ไม่ใช่ "เข้าได้เลยทันที"
          เพราะความเสี่ยงด้านราคา คุณภาพ และเงินทุนยังสูง
        </InsightCard>
        <RecommendationBox>
          <b>ตัดสินใจ: Enter after validation</b> — ลงทุน Validate 90 วัน (~0.8-1.2 ล้านบาท)
          ถ้าผ่าน KPI หลัก (Repeat ≥35%, GM ≥45%, Leakage ≤1.5%) จึงเดินหน้าลงทุนเต็มรูปแบบ
        </RecommendationBox>
      </div>
    </div>
  );
}
