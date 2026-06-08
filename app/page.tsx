"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { MetricCard } from "@/components/ui/MetricCard";
import { Card, CardBody } from "@/components/ui/Card";
import { ScoreCard } from "@/components/ui/ScoreCard";
import { InsightCard, RecommendationBox, ChartNote } from "@/components/ui/Boxes";
import { Badge } from "@/components/ui/Badges";
import { RadarChartBox } from "@/components/charts/Charts";
import { fmtBaht } from "@/lib/utils";
import {
  marketAttractivenessScore,
  opportunityCards,
  concernCards,
  finalRecommendation,
  opportunityScores,
  execKpis,
} from "@/data/executive";
import {
  TrendingUp,
  Repeat,
  Building2,
  Wallet,
  Tag,
  ShieldCheck,
  AlertTriangle,
  Box,
  Target,
  Layers,
  Flag,
  CheckCircle2,
} from "lucide-react";

const oppIcons: any = { trend: TrendingUp, repeat: Repeat, building: Building2, wallet: Wallet };
const conIcons: any = { price: Tag, shield: ShieldCheck, alert: AlertTriangle, box: Box };

export default function ExecutiveSummary() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="บทสรุปผู้บริหาร (Executive Summary)"
        description="ภาพรวมการตัดสินใจว่า 'ควรเข้าสู่ตลาดผ้าอ้อมผู้ใหญ่และสินค้าดูแลผู้ป่วยติดเตียงในไทยหรือไม่' พร้อมคะแนนความน่าสนใจของตลาดและข้อเสนอแนะเบื้องต้น"
      />

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Estimated TAM (ตลาดรวม)" value={fmtBaht(execKpis.tam * 1_000_000).replace(" บาท", "")} unit="" icon={Layers} tone="brand" dataType="estimate" />
        <MetricCard label="Estimated SAM (ที่เข้าถึงได้)" value={fmtBaht(execKpis.sam * 1_000_000).replace(" บาท", "")} unit="" icon={Target} tone="brand" dataType="estimate" />
        <MetricCard label="Estimated SOM (ปี 1-3)" value={fmtBaht(execKpis.som * 1_000_000).replace(" บาท", "")} unit="" icon={TrendingUp} tone="leaf" dataType="assumption" />
        <MetricCard label="Gross Margin Target" value={execKpis.grossMarginTarget} unit="%" icon={Wallet} tone="leaf" dataType="assumption" />
        <MetricCard label="กลุ่มลูกค้าที่น่าเริ่ม" value={execKpis.topSegment} icon={Building2} tone="brand" />
        <MetricCard label="ความเสี่ยงสูงสุด" value="สงครามราคา" sub="+ รีวิวลบ" icon={AlertTriangle} tone="danger" />
        <MetricCard label="สถานะ Go / No-Go" value="Validate ก่อน" icon={Flag} tone="warn" />
        <MetricCard label="คะแนนความน่าสนใจ" value={marketAttractivenessScore} unit="/10" icon={CheckCircle2} tone="leaf" />
      </div>

      {/* Score + Radar */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="avoid-break">
          <CardBody className="flex flex-col items-center justify-center">
            <h3 className="mb-3 text-base font-bold text-ink">คะแนนความน่าสนใจของตลาด</h3>
            <ScoreCard score={marketAttractivenessScore} title="น่าสนใจ" subtitle="โอกาสดีแต่ต้องบริหารความเสี่ยง" size={170} />
            <div className="mt-4 grid w-full grid-cols-2 gap-2 text-[11px] text-ink-soft">
              <span className="rounded-lg bg-red-50 px-2 py-1 text-center">1-3 ไม่น่าสนใจ</span>
              <span className="rounded-lg bg-amber-50 px-2 py-1 text-center">4-6 ปานกลาง</span>
              <span className="rounded-lg bg-brand-50 px-2 py-1 text-center">7-8 น่าสนใจ</span>
              <span className="rounded-lg bg-leaf-50 px-2 py-1 text-center">9-10 น่าสนใจมาก</span>
            </div>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2 avoid-break">
          <CardBody>
            <h3 className="mb-1 text-base font-bold text-ink">Opportunity Score — มิติโอกาสของตลาด</h3>
            <RadarChartBox data={opportunityScores} name="คะแนน (1-10)" height={320} />
            <ChartNote>
              กราฟนี้สรุปจุดแข็ง-จุดอ่อนของโอกาสในแต่ละมิติ จุดเด่นคือ Market Size, Growth และ B2C
              Scalability ส่วนที่ต้องระวังคือ Working Capital (เงินทุนจม) และ Differentiation
              (จุดต่าง) — ควรลงทุนสร้างจุดต่างและคุมเงินทุนหมุนเวียน
            </ChartNote>
          </CardBody>
        </Card>
      </div>

      {/* Opportunity & Concerns */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-ink">
            <Badge tone="leaf">โอกาส</Badge> สรุปโอกาสหลัก
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {opportunityCards.map((c) => {
              const Icon = oppIcons[c.icon];
              return (
                <Card key={c.title} className="avoid-break">
                  <CardBody>
                    <span className="inline-flex rounded-xl bg-leaf-50 p-2 text-leaf-600">
                      <Icon className="h-4 w-4" />
                    </span>
                    <p className="mt-2 text-sm font-bold text-ink">{c.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-soft">{c.desc}</p>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-ink">
            <Badge tone="danger">ข้อกังวล</Badge> ประเด็นที่ต้องระวัง
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {concernCards.map((c) => {
              const Icon = conIcons[c.icon];
              return (
                <Card key={c.title} className="avoid-break">
                  <CardBody>
                    <span className="inline-flex rounded-xl bg-red-50 p-2 text-red-500">
                      <Icon className="h-4 w-4" />
                    </span>
                    <p className="mt-2 text-sm font-bold text-ink">{c.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-soft">{c.desc}</p>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Final recommendation */}
      <Card className="avoid-break border-leaf-100 bg-brand-gradient-soft">
        <CardBody>
          <div className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-brand-600" />
            <h3 className="text-lg font-bold text-ink">ข้อเสนอแนะสุดท้าย (Final Recommendation)</h3>
          </div>
          <div className="mt-3">
            <Badge tone="warn" className="text-sm">{finalRecommendation.decision}</Badge>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <RecItem label="กลุ่มลูกค้าแรกที่ควรเจาะ" value={finalRecommendation.firstSegment} />
            <RecItem label="Hero Product ที่ควรเริ่ม" value={finalRecommendation.heroProduct} />
            <RecItem label="ช่องทางแรกที่ควร Launch" value={finalRecommendation.firstChannel} />
            <RecItem
              label="สิ่งที่ต้อง Validate ก่อนลงทุนจริง"
              value={
                <ul className="list-disc pl-4 text-sm">
                  {finalRecommendation.mustValidate.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              }
            />
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <InsightCard>
          ตลาดมีโอกาสโตตาม Aging Society และเป็นสินค้า Repeat Purchase แต่{" "}
          <b>การชนะตลาดไม่ได้ขึ้นกับขนาดตลาดเพียงอย่างเดียว</b> — ต้องชนะเรื่องความน่าเชื่อถือ
          คุณภาพสินค้า และการซื้อซ้ำ
        </InsightCard>
        <RecommendationBox>
          เริ่มจากทดสอบกลุ่ม <b>Family Caregiver</b> ผ่าน Online Marketplace และ Subscription Trial
          เพื่อพิสูจน์ราคา-มาร์จิน-การซื้อซ้ำ ก่อนขยายไป B2B Nursing Home
        </RecommendationBox>
      </div>
    </div>
  );
}

function RecItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white/70 p-3">
      <p className="text-xs font-semibold text-ink-soft">{label}</p>
      <div className="mt-1 text-sm font-medium text-ink">{value}</div>
    </div>
  );
}
