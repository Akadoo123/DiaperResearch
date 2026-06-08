"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/Table";
import { InsightCard, RecommendationBox, ChartNote } from "@/components/ui/Boxes";
import { Badge } from "@/components/ui/Badges";
import { Tabs } from "@/components/ui/Tabs";
import { ScatterMap } from "@/components/charts/Charts";
import {
  positioningOptions,
  positioningMap,
  recommendedMessage,
  taglineIdeas,
  namingDirection,
  packagingDirection,
} from "@/data/positioning";
import { Target, Check, X } from "lucide-react";

export default function PositioningPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="กลยุทธ์การวางตำแหน่ง (Positioning Strategy)"
        description="เปรียบเทียบทางเลือกการวางตำแหน่ง — หลีกเลี่ยงการวางตำแหน่งที่ราคาถูกอย่างเดียว หาจุดที่สร้างความเชื่อมั่น การซื้อซ้ำ และความแตกต่าง"
      />

      <Tabs
        tabs={[
          {
            label: "เปรียบเทียบตำแหน่ง",
            content: (
              <DataTable
                columns={[
                  { key: "name", label: "ตำแหน่ง" },
                  { key: "target", label: "กลุ่มเป้าหมาย" },
                  { key: "promise", label: "คำสัญญาหลัก" },
                  { key: "price", label: "ระดับราคา" },
                  { key: "diff", label: "จุดต่าง" },
                  { key: "risk", label: "ความเสี่ยง" },
                  { key: "rec", label: "แนะนำ?" },
                ]}
                rows={positioningOptions.map((p) => ({
                  name: <span className="font-medium">{p.name}</span>,
                  target: <span className="text-xs">{p.target}</span>,
                  promise: <span className="text-xs">{p.promise}</span>,
                  price: p.priceLevel,
                  diff: <Badge tone={p.differentiation >= 7 ? "leaf" : "neutral"}>{p.differentiation}/10</Badge>,
                  risk: <span className="text-xs text-ink-soft">{p.risk}</span>,
                  rec: p.recommended ? (
                    <span className="inline-flex items-center gap-1 text-leaf-600"><Check className="h-4 w-4" /> ใช่</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-ink-soft"><X className="h-4 w-4" /> ไม่</span>
                  ),
                }))}
              />
            ),
          },
          {
            label: "Positioning Map",
            content: (
              <Card>
                <CardBody>
                  <ScatterMap
                    points={positioningMap}
                    xLabel="ราคา (Price)"
                    yLabel="ความน่าเชื่อถือ/คุณภาพที่รับรู้"
                  />
                  <ChartNote>
                    ตำแหน่งเป้าหมายของเรา (จุดเขียว) อยู่ที่ "คุณภาพ/ความน่าเชื่อถือสูง ในราคาที่เข้าถึงได้"
                    — หลบจากสงครามราคามุมล่างซ้าย และไม่ชนกับ Premium มุมขวาบนโดยตรง
                  </ChartNote>
                </CardBody>
              </Card>
            ),
          },
        ]}
      />

      <Card className="avoid-break border-leaf-100 bg-brand-gradient-soft">
        <CardBody>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-brand-600" />
            <h3 className="text-base font-bold text-ink">ตำแหน่งเชิงกลยุทธ์ที่แนะนำให้ทดสอบ</h3>
          </div>
          <p className="mt-3 rounded-xl bg-white/70 p-4 text-sm font-medium leading-relaxed text-ink">
            "{recommendedMessage}"
          </p>
        </CardBody>
      </Card>

      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="avoid-break">
          <CardBody>
            <h4 className="mb-2 text-sm font-bold text-ink">Tagline Ideas</h4>
            <ul className="space-y-1.5 text-sm text-ink">
              {taglineIdeas.map((t) => (
                <li key={t} className="rounded-lg bg-slate-50 p-2">"{t}"</li>
              ))}
            </ul>
          </CardBody>
        </Card>
        <Card className="avoid-break">
          <CardBody>
            <h4 className="mb-2 text-sm font-bold text-ink">ทิศทางการตั้งชื่อแบรนด์</h4>
            <p className="text-sm leading-relaxed text-ink-soft">{namingDirection}</p>
          </CardBody>
        </Card>
        <Card className="avoid-break">
          <CardBody>
            <h4 className="mb-2 text-sm font-bold text-ink">ทิศทางบรรจุภัณฑ์</h4>
            <p className="text-sm leading-relaxed text-ink-soft">{packagingDirection}</p>
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <InsightCard>
          การวางตำแหน่งที่ "ถูกที่สุด" เป็นกับดัก — แข่งยากและไม่ยั่งยืน ตำแหน่งที่ดีคือ{" "}
          <b>"เพื่อผู้ดูแล + ลดรั่วกลางคืน + ดูแลอย่างมีศักดิ์ศรี"</b> ซึ่งสร้างความผูกพันและซื้อซ้ำ
        </InsightCard>
        <RecommendationBox>
          ทดสอบ message <b>"ออกแบบเพื่อผู้ดูแล"</b> กับกลุ่ม Caregiver จริงก่อน Launch เต็มรูปแบบ
          และใช้ผลทดสอบปรับ tagline/บรรจุภัณฑ์ให้ตรงใจที่สุด
        </RecommendationBox>
      </div>
    </div>
  );
}
