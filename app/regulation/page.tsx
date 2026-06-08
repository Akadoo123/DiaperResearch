"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/Table";
import { InsightCard, RecommendationBox, ChartNote } from "@/components/ui/Boxes";
import { Badge } from "@/components/ui/Badges";
import { Tabs } from "@/components/ui/Tabs";
import { RadarChartBox } from "@/components/charts/Charts";
import {
  regulationChecklist,
  sourcingOptions,
  sourcingDecision,
  qcChecklist,
  recommendedSourcing,
} from "@/data/regulation";
import { ShieldAlert, CheckCircle2, AlertTriangle, Info } from "lucide-react";

export default function RegulationPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="กฎระเบียบและซัพพลายเชน (Regulation & Supply Chain)"
        description="ตรวจสอบข้อกำหนดด้านกฎหมาย/อย. และเปรียบเทียบทางเลือกการจัดหาสินค้า (Sourcing) — ข้อมูลกฎระเบียบต้องยืนยันกับหน่วยงานรัฐ/ที่ปรึกษา"
      />

      <Card className="avoid-break border-amber-100 bg-amber-50/50">
        <CardBody className="flex items-start gap-3 py-3">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-xs text-amber-700">
            ข้อมูลกฎระเบียบทั้งหมดต้อง <b>ตรวจสอบกับหน่วยงานรัฐ (อย./สคบ.) / ที่ปรึกษากฎหมาย /
            ผู้นำเข้า</b> ก่อนดำเนินการจริง
          </p>
        </CardBody>
      </Card>

      <Tabs
        tabs={[
          {
            label: "Regulation Checklist",
            content: (
              <DataTable
                columns={[
                  { key: "item", label: "รายการตรวจสอบ" },
                  { key: "status", label: "สถานะ" },
                  { key: "note", label: "หมายเหตุ" },
                ]}
                rows={regulationChecklist.map((r) => ({
                  item: <span className="font-medium">{r.item}</span>,
                  status:
                    r.status === "needs" ? (
                      <Badge tone="danger">ต้องตรวจสอบ</Badge>
                    ) : r.status === "recommended" ? (
                      <Badge tone="brand">แนะนำ</Badge>
                    ) : (
                      <Badge tone="neutral">ทางเลือก</Badge>
                    ),
                  note: <span className="text-xs text-ink-soft">{r.note}</span>,
                }))}
              />
            ),
          },
          {
            label: "เปรียบเทียบ Sourcing",
            content: (
              <DataTable
                columns={[
                  { key: "name", label: "ทางเลือก Sourcing" },
                  { key: "moq", label: "MOQ" },
                  { key: "cost", label: "ต้นทุน" },
                  { key: "qc", label: "คุมคุณภาพ" },
                  { key: "lead", label: "Lead Time" },
                  { key: "wc", label: "เงินทุน" },
                  { key: "custom", label: "ปรับแต่ง" },
                  { key: "scale", label: "ขยายได้" },
                ]}
                rows={sourcingOptions.map((s) => ({
                  name: <span className="font-medium">{s.name}</span>,
                  moq: s.moq,
                  cost: s.cost,
                  qc: s.qc,
                  lead: s.leadTime,
                  wc: s.workingCapital,
                  custom: s.customization,
                  scale: <Badge tone={s.scalability >= 8 ? "leaf" : "neutral"}>{s.scalability}/10</Badge>,
                }))}
              />
            ),
          },
          {
            label: "Decision Matrix",
            content: (
              <Card>
                <CardBody>
                  <RadarChartBox
                    data={sourcingDecision}
                    height={360}
                    series={[
                      { key: "thai_oem", name: "OEM ไทย", color: "#22C55E" },
                      { key: "china_import", name: "นำเข้าจีน", color: "#6366F1" },
                      { key: "private_label", name: "Private Label", color: "#F59E0B" },
                    ]}
                  />
                  <ChartNote>
                    Radar นี้เทียบ Sourcing 3 แบบในหลายมิติ — Private Label เด่นเรื่องเงินทุนต่ำ/เร็ว
                    (เหมาะเริ่มต้น) ส่วน OEM ไทยเด่นเรื่องคุณภาพ/ขยายได้ (เหมาะระยะถัดไป)
                  </ChartNote>
                </CardBody>
              </Card>
            ),
          },
          {
            label: "QC Checklist",
            content: (
              <div className="grid gap-2 sm:grid-cols-2">
                {qcChecklist.map((q) => (
                  <div key={q} className="flex items-center gap-2 rounded-xl border border-line bg-white p-3 text-sm shadow-soft">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-leaf-500" /> {q}
                  </div>
                ))}
              </div>
            ),
          },
        ]}
      />

      <Card className="avoid-break border-leaf-100 bg-leaf-50/40">
        <CardBody className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" />
          <div>
            <h4 className="text-sm font-bold text-leaf-600">แนวทาง Sourcing แรกที่แนะนำ</h4>
            <p className="mt-1 text-sm leading-relaxed text-ink">{recommendedSourcing}</p>
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <InsightCard>
          ความเสี่ยงด้านกฎระเบียบหลักคือ <b>การกล่าวอ้างสรรพคุณเกินจริง</b> (ห้ามอ้างรักษาโรค)
          และ <b>ฉลากภาษาไทย</b> — ต้องเคลียร์ก่อนทำการตลาด
        </InsightCard>
        <RecommendationBox>
          เริ่มจาก <b>Private label / OEM คุณภาพดี MOQ ต่ำ</b> เพื่อทดสอบตลาดด้วยเงินทุนต่ำ
          พร้อมตรวจสอบข้อกำหนด อย./ฉลาก/โฆษณา กับที่ปรึกษาก่อนวางขาย
        </RecommendationBox>
      </div>
    </div>
  );
}
