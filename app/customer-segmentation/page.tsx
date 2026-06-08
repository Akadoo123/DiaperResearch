"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { InsightCard, RecommendationBox, ChartNote } from "@/components/ui/Boxes";
import { Badge } from "@/components/ui/Badges";
import { ScoreBar } from "@/components/ui/ScoreCard";
import { BarChartBox } from "@/components/charts/Charts";
import { segments, buyingJourney, Segment } from "@/data/customerSegments";
import { ChevronRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CustomerSegmentation() {
  const [active, setActive] = useState<Segment | null>(null);
  const ranked = [...segments].sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-6">
      <PageHeader
        title="กลุ่มลูกค้า (Customer Segmentation)"
        description="ในตลาดนี้ คนใช้สินค้า คนจ่ายเงิน คนตัดสินใจ และคนแนะนำ อาจไม่ใช่คนเดียวกัน — การเข้าใจบทบาทเหล่านี้คือหัวใจของการขาย"
      />

      <Card className="avoid-break border-brand-100 bg-brand-50/50">
        <CardBody className="flex items-start gap-3">
          <Users className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
          <p className="text-sm text-ink">
            <b>ข้อสังเกตสำคัญ:</b> "คนใช้สินค้า คนจ่ายเงิน คนตัดสินใจ และคนแนะนำ
            อาจไม่ใช่คนเดียวกัน" เช่น ผู้ป่วยติดเตียงเป็น <b>ผู้ใช้</b> แต่{" "}
            <b>ลูกหลานเป็นคนจ่ายและตัดสินใจ</b> ส่วน <b>พยาบาล/เภสัชเป็นผู้แนะนำ</b> —
            การสื่อสารต้องตรงกับ "คนตัดสินใจ" ไม่ใช่แค่ผู้ใช้
          </p>
        </CardBody>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="avoid-break">
          <CardBody>
            <h3 className="mb-1 text-base font-bold text-ink">อันดับความน่าสนใจของกลุ่มลูกค้า</h3>
            <BarChartBox
              data={ranked.map((s) => ({ name: s.name, score: s.score }))}
              xKey="name"
              layout="vertical"
              height={420}
              bars={[{ key: "score", name: "Opportunity Score", color: "#6366F1" }]}
            />
            <ChartNote>
              กราฟนี้จัดอันดับกลุ่มลูกค้าตามคะแนนโอกาส — กลุ่มที่คะแนนสูงสุด (Family Caregiver,
              ผู้ป่วยติดเตียง, ลูกหลานซื้อให้พ่อแม่) ควรเป็น beachhead แรกเพราะ price sensitivity
              ต่ำและซื้อซ้ำสูง
            </ChartNote>
          </CardBody>
        </Card>

        <div>
          <h3 className="mb-3 text-base font-bold text-ink">
            Persona Cards <span className="text-xs font-normal text-ink-soft">(คลิกเพื่อดูรายละเอียด)</span>
          </h3>
          <div className="grid max-h-[460px] gap-2 overflow-y-auto thin-scroll pr-1 sm:grid-cols-2">
            {ranked.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s)}
                className={cn(
                  "rounded-xl border border-line bg-white p-3 text-left shadow-soft transition hover:border-brand-500",
                  active?.id === s.id && "border-brand-500 ring-1 ring-brand-500"
                )}
              >
                <div className="flex items-center justify-between">
                  <Badge tone={s.type === "B2B" ? "warn" : "brand"}>{s.type}</Badge>
                  <span className="text-xs font-bold text-ink">{s.score}/10</span>
                </div>
                <p className="mt-1 text-xs font-bold leading-snug text-ink">{s.name}</p>
                <p className="mt-0.5 text-[11px] text-ink-soft">ช่องทาง: {s.channel}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Drill-down detail */}
      {active && (
        <Card className="avoid-break border-brand-200">
          <CardBody>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-ink">{active.name}</h3>
              <Badge tone={active.type === "B2B" ? "warn" : "brand"}>{active.type}</Badge>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Detail label="ผู้ใช้ (User)" value={active.user} />
              <Detail label="ผู้ซื้อ (Buyer)" value={active.buyer} />
              <Detail label="ผู้ตัดสินใจ" value={active.decisionMaker} />
              <Detail label="ผู้มีอิทธิพล" value={active.influencer} />
              <Detail label="Pain Points" value={active.painPoints} />
              <Detail label="เกณฑ์การซื้อ" value={active.buyingCriteria} />
              <Detail label="อ่อนไหวราคา" value={active.priceSensitivity} />
              <Detail label="ความถี่ซื้อ" value={active.frequency} />
              <Detail label="ช่องทางที่ชอบ" value={active.channel} />
              <Detail label="ข้อความที่ตรงใจ" value={active.message} />
            </div>
            <div className="mt-3">
              <p className="mb-1 text-xs font-semibold text-ink-soft">Opportunity Score</p>
              <ScoreBar score={active.score} />
            </div>
          </CardBody>
        </Card>
      )}

      <Card className="avoid-break">
        <CardBody>
          <h3 className="mb-3 text-base font-bold text-ink">Buying Journey — เส้นทางการตัดสินใจซื้อ</h3>
          <div className="flex flex-col gap-2 md:flex-row md:items-stretch">
            {buyingJourney.map((b, i) => (
              <div key={b.stage} className="flex flex-1 items-center gap-2">
                <div className="flex-1 rounded-xl bg-brand-gradient-soft p-3">
                  <p className="text-xs font-bold text-brand-700">{i + 1}. {b.stage}</p>
                  <p className="mt-1 text-[11px] text-ink-soft">{b.desc}</p>
                </div>
                {i < buyingJourney.length - 1 && (
                  <ChevronRight className="hidden h-4 w-4 shrink-0 text-ink-soft md:block" />
                )}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <InsightCard>
          กลุ่มที่น่าเริ่มที่สุดคือ <b>Family Caregiver และลูกหลานที่ซื้อให้พ่อแม่</b> เพราะตัดสินใจเอง
          ซื้อออนไลน์ได้ และมีแนวโน้มซื้อซ้ำ/สมัคร Subscription สูง
        </InsightCard>
        <RecommendationBox>
          ออกแบบข้อความให้ตรง "ผู้ตัดสินใจ" (ลูกหลาน/ผู้ดูแล) ไม่ใช่ผู้ใช้ — เน้น "ลดภาระผู้ดูแล +
          ดูแลอย่างมีศักดิ์ศรี" และใช้ผู้แนะนำ (เภสัช/พยาบาล/กลุ่มผู้ดูแล) สร้างความเชื่อมั่น
        </RecommendationBox>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-[11px] font-semibold text-ink-soft">{label}</p>
      <p className="mt-0.5 text-sm text-ink">{value}</p>
    </div>
  );
}
