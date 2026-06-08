"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/Table";
import { InsightCard, RecommendationBox, ChartNote } from "@/components/ui/Boxes";
import { DataConfidenceBadge } from "@/components/ui/Badges";
import { DonutChartBox } from "@/components/charts/Charts";
import { dataPoints, sourceCategories, dataGaps } from "@/data/sources";
import { dataTypeLabel, DataType } from "@/lib/types";
import { BookOpen, AlertCircle } from "lucide-react";

export default function SourcesPage() {
  const mix = (["verified", "estimate", "assumption", "needs_validation"] as DataType[]).map((t) => ({
    name: dataTypeLabel[t],
    value: dataPoints.filter((d) => d.dataType === t).length,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="แหล่งข้อมูลและสมมติฐาน (Research Sources & Assumptions)"
        description="แยกข้อมูลที่ตรวจสอบแล้ว ประมาณการ สมมติฐาน และข้อมูลที่ต้องเก็บภาคสนาม — ทุกตัวเลขมีแหล่งที่มา ระดับความเชื่อมั่น และวันที่อัปเดต"
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="avoid-break">
          <CardBody>
            <h3 className="mb-2 text-sm font-bold text-ink">สัดส่วนความน่าเชื่อถือของข้อมูล</h3>
            <DonutChartBox data={mix} height={220} />
            <ChartNote>
              ข้อมูลส่วนใหญ่ในเวอร์ชันนี้ยังเป็น <b>ประมาณการ/สมมติฐาน</b> — ต้องเก็บข้อมูลจริงเพื่อยกระดับ
              เป็น Verified ก่อนตัดสินใจลงทุน
            </ChartNote>
          </CardBody>
        </Card>

        <Card className="avoid-break lg:col-span-2">
          <CardBody>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-ink">
              <BookOpen className="h-4 w-4 text-brand-500" /> หมวดแหล่งข้อมูลที่ใช้
            </h3>
            <div className="flex flex-wrap gap-2">
              {sourceCategories.map((c) => (
                <span key={c} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-ink-soft">{c}</span>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <div>
        <h3 className="mb-3 text-base font-bold text-ink">ตารางข้อมูลและการอ้างอิง (ตัวอย่าง)</h3>
        <DataTable
          columns={[
            { key: "title", label: "ข้อมูล" },
            { key: "value", label: "ค่า" },
            { key: "source", label: "แหล่งข้อมูล" },
            { key: "conf", label: "ประเภท/ความเชื่อมั่น" },
            { key: "updated", label: "อัปเดตล่าสุด" },
            { key: "note", label: "หมายเหตุ" },
          ]}
          rows={dataPoints.map((d) => ({
            title: <span className="font-medium">{d.title}</span>,
            value: <span className="font-semibold">{typeof d.value === "number" ? d.value.toLocaleString("th-TH") : d.value} {d.unit}</span>,
            source: <span className="text-xs text-ink-soft">{d.source}</span>,
            conf: <DataConfidenceBadge type={d.dataType} />,
            updated: <span className="text-xs">{d.lastUpdated || "—"}</span>,
            note: <span className="text-xs text-ink-soft">{d.note}</span>,
          }))}
          caption="ทุก data point ในเวอร์ชันนี้เป็นข้อมูลตัวอย่าง — โครงสร้างพร้อมแทนที่ด้วยข้อมูลจริงในไฟล์ /data"
        />
      </div>

      <Card className="avoid-break border-red-100 bg-red-50/40">
        <CardBody>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-red-500">
            <AlertCircle className="h-4 w-4" /> Data Gap List — ข้อมูลที่ต้องเก็บก่อนตัดสินใจ
          </h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {dataGaps.map((g, i) => (
              <li key={g} className="flex gap-2 rounded-lg bg-white/70 p-2 text-sm text-ink">
                <span className="font-bold text-red-500">{i + 1}.</span> {g}
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <InsightCard>
          Dashboard นี้ออกแบบให้ <b>ทุกตัวเลขตรวจสอบย้อนกลับได้</b> (Value + Source + Confidence +
          Date) เพื่อให้ผู้บริหารแยกได้ว่าข้อมูลไหนเชื่อถือได้และข้อมูลไหนต้องเก็บเพิ่ม
        </InsightCard>
        <RecommendationBox>
          ใช้ <b>Data Gap List</b> เป็น Input ของการเก็บข้อมูลภาคสนาม 90 วัน — เมื่อได้ข้อมูลจริง
          ให้แก้ในไฟล์ /data แล้วเปลี่ยน dataType เป็น "verified"
        </RecommendationBox>
      </div>
    </div>
  );
}
