"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/Table";
import { InsightCard, RecommendationBox, ChartNote } from "@/components/ui/Boxes";
import { Badge } from "@/components/ui/Badges";
import { Tabs } from "@/components/ui/Tabs";
import { BarChartBox } from "@/components/charts/Charts";
import {
  b2bSegments,
  b2bFunnel,
  procurementSteps,
  b2bPackages,
  b2bPitch,
} from "@/data/b2bOpportunity";
import { Building2, ChevronRight } from "lucide-react";

export default function B2BPage() {
  const ranked = [...b2bSegments].sort((a, b) => b.score - a.score);
  return (
    <div className="space-y-6">
      <PageHeader
        title="โอกาส B2B (B2B Opportunity)"
        description="วิเคราะห์ลูกค้าองค์กร — Nursing home, โรงพยาบาล, Home care, ร้านเวชภัณฑ์ และภาครัฐ พร้อม Sales Funnel และแพ็กเกจที่แนะนำ"
      />

      <Tabs
        tabs={[
          {
            label: "ตารางกลุ่ม B2B",
            content: (
              <DataTable
                columns={[
                  { key: "name", label: "กลุ่ม B2B" },
                  { key: "buyer", label: "ผู้ซื้อ" },
                  { key: "dm", label: "ผู้ตัดสินใจ" },
                  { key: "vol", label: "ปริมาณ/เดือน" },
                  { key: "price", label: "อ่อนไหวราคา" },
                  { key: "credit", label: "เครดิต" },
                  { key: "cycle", label: "Sales Cycle" },
                  { key: "score", label: "คะแนน" },
                ]}
                rows={ranked.map((s) => ({
                  name: <span className="font-medium">{s.name}</span>,
                  buyer: s.buyer,
                  dm: s.decisionMaker,
                  vol: <span className="text-xs">{s.monthlyVolume}</span>,
                  price: s.priceSens,
                  credit: <span className="text-xs">{s.creditTerm}</span>,
                  cycle: <span className="text-xs">{s.salesCycle}</span>,
                  score: <Badge tone={s.score >= 7 ? "leaf" : s.score >= 5 ? "brand" : "neutral"}>{s.score}/10</Badge>,
                }))}
              />
            ),
          },
          {
            label: "Sales Funnel",
            content: (
              <Card>
                <CardBody>
                  <BarChartBox
                    data={b2bFunnel}
                    xKey="stage"
                    layout="vertical"
                    height={260}
                    bars={[{ key: "value", name: "จำนวน (จาก 100 prospect)", color: "#6366F1" }]}
                  />
                  <ChartNote>
                    Funnel นี้ประมาณว่าจาก 100 รายชื่อ จะปิดได้ ~9 ราย — ใช้ตั้งเป้าจำนวน prospect
                    ที่ต้องหาเพื่อให้ได้ลูกค้า B2B ตามเป้า และระบุจุดที่หล่นมากที่สุด (ส่งตัวอย่าง→เจรจา)
                  </ChartNote>
                </CardBody>
              </Card>
            ),
          },
          {
            label: "กระบวนการจัดซื้อ",
            content: (
              <Card>
                <CardBody>
                  <div className="flex flex-wrap items-center gap-2">
                    {procurementSteps.map((s, i) => (
                      <div key={s} className="flex items-center gap-2">
                        <span className="rounded-xl bg-brand-gradient-soft px-3 py-2 text-xs font-medium text-brand-700">
                          {i + 1}. {s}
                        </span>
                        {i < procurementSteps.length - 1 && <ChevronRight className="h-4 w-4 text-ink-soft" />}
                      </div>
                    ))}
                  </div>
                  <ChartNote>
                    เข้าใจขั้นตอนจัดซื้อช่วยเตรียมเอกสาร (ใบเสนอราคา/ใบรับรอง) และวางแผนเครดิตเทอม —
                    จุดสำคัญคือ "การส่งตัวอย่างให้ทดลอง" ซึ่งเป็นด่านชี้ขาด
                  </ChartNote>
                </CardBody>
              </Card>
            ),
          },
          {
            label: "Pitch & Pilot",
            content: (
              <div className="space-y-3">
                <Card className="avoid-break border-brand-100 bg-brand-50/40">
                  <CardBody>
                    <h4 className="text-sm font-bold text-brand-700">B2B Pitch Message</h4>
                    <p className="mt-2 text-sm leading-relaxed text-ink">{b2bPitch}</p>
                  </CardBody>
                </Card>
                <Card className="avoid-break border-leaf-100 bg-leaf-50/40">
                  <CardBody>
                    <h4 className="text-sm font-bold text-leaf-600">Pilot Program ที่แนะนำ</h4>
                    <p className="mt-2 text-sm text-ink">
                      เสนอ <b>Pilot 1 เดือน</b> กับ Nursing home 2-3 แห่ง: ส่งสินค้าทดลองฟรี/ราคาพิเศษ
                      วัดผลเรื่องการรั่ว/ผื่น/ความพึงพอใจของพนักงาน แล้วใช้ผลปิดเป็นสัญญารายเดือน
                    </p>
                  </CardBody>
                </Card>
              </div>
            ),
          },
        ]}
      />

      <div>
        <h3 className="mb-3 text-base font-bold text-ink">แพ็กเกจ B2B ที่แนะนำ</h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {b2bPackages.map((p) => (
            <div key={p} className="flex items-center gap-2 rounded-xl border border-line bg-white p-3 text-sm shadow-soft">
              <Building2 className="h-4 w-4 shrink-0 text-brand-500" /> {p}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <InsightCard>
          <b>Nursing home, ศูนย์ดูแล และ Home care agency</b> ให้คะแนนสูงสุด — ปริมาณดี เข้าถึงได้
          และ Sales cycle สั้นกว่าโรงพยาบาล/ภาครัฐที่ต้องประมูลและเครดิตยาว
        </InsightCard>
        <RecommendationBox>
          เริ่ม B2B จาก <b>Nursing home pilot</b> ก่อน เพราะตัดสินใจเร็วและวัดผลได้ชัด — เลื่อนโรงพยาบาล
          และจัดซื้อภาครัฐไป Phase หลังเมื่อมีเอกสาร/มาตรฐานพร้อม
        </RecommendationBox>
      </div>
    </div>
  );
}
