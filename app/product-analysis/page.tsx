"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/Table";
import { InsightCard, RecommendationBox, ChartNote } from "@/components/ui/Boxes";
import { Badge } from "@/components/ui/Badges";
import { Tabs } from "@/components/ui/Tabs";
import { BarChartBox, ScatterMap } from "@/components/charts/Charts";
import {
  productCategories,
  productComparison,
  featureBenchmark,
  heroProducts,
  portfolioMatrix,
} from "@/data/productAnalysis";
import { Package } from "lucide-react";

export default function ProductAnalysis() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="วิเคราะห์สินค้า (Product Analysis)"
        description="แผนผังหมวดสินค้า เปรียบเทียบคุณสมบัติ และเลือก Hero Product ที่เหมาะกับแบรนด์ใหม่"
      />

      <Tabs
        tabs={[
          {
            label: "หมวดสินค้า",
            content: (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {productCategories.map((c) => (
                  <Card key={c.name} className="avoid-break">
                    <CardBody className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex rounded-xl bg-brand-50 p-2 text-brand-600">
                          <Package className="h-4 w-4" />
                        </span>
                        <Badge tone="neutral">{c.note}</Badge>
                      </div>
                      <p className="mt-2 text-sm font-bold text-ink">{c.name}</p>
                      <p className="mt-1 text-xs text-ink-soft">ผู้ใช้หลัก: {c.use}</p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            ),
          },
          {
            label: "เปรียบเทียบสินค้า",
            content: (
              <DataTable
                columns={[
                  { key: "type", label: "ประเภทสินค้า" },
                  { key: "user", label: "ผู้ใช้หลัก" },
                  { key: "scenario", label: "สถานการณ์ใช้งาน" },
                  { key: "pros", label: "ข้อดี" },
                  { key: "cons", label: "ข้อเสีย" },
                  { key: "priceSens", label: "อ่อนไหวราคา" },
                  { key: "fitNew", label: "เหมาะแบรนด์ใหม่" },
                ]}
                rows={productComparison.map((p) => ({
                  type: <span className="font-medium">{p.type}</span>,
                  user: p.user,
                  scenario: p.scenario,
                  pros: p.pros,
                  cons: p.cons,
                  priceSens: p.priceSens,
                  fitNew: <Badge tone={p.fitNew.includes("สูง") ? "leaf" : "warn"}>{p.fitNew}</Badge>,
                }))}
              />
            ),
          },
          {
            label: "Feature Benchmark",
            content: (
              <Card>
                <CardBody>
                  <h3 className="mb-1 text-base font-bold text-ink">เปรียบเทียบคุณสมบัติ (1-5)</h3>
                  <BarChartBox
                    data={featureBenchmark}
                    xKey="feature"
                    layout="vertical"
                    height={360}
                    bars={[
                      { key: "premium", name: "Premium", color: "#A855F7" },
                      { key: "brandNew", name: "แบรนด์ใหม่ (เป้าหมาย)", color: "#22C55E" },
                      { key: "economy", name: "Economy", color: "#94A3B8" },
                    ]}
                  />
                  <ChartNote>
                    กราฟนี้ช่วยกำหนดว่าแบรนด์ใหม่ควร "ดีกว่า Economy ชัดเจน และเข้าใกล้ Premium ในจุดสำคัญ"
                    โดยเฉพาะการกันรั่วและป้องกันผื่น ซึ่งเป็นเหตุผลหลักที่ลูกค้าเปลี่ยนแบรนด์
                  </ChartNote>
                </CardBody>
              </Card>
            ),
          },
          {
            label: "Portfolio Matrix",
            content: (
              <Card>
                <CardBody>
                  <h3 className="mb-1 text-base font-bold text-ink">
                    Product Portfolio Matrix — ราคา × ความซับซ้อนการดูแล
                  </h3>
                  <ScatterMap
                    points={portfolioMatrix}
                    xLabel="ระดับราคา (Price Level)"
                    yLabel="ความซับซ้อนการดูแล (Care Complexity)"
                  />
                  <ChartNote>
                    Matrix นี้ช่วยจัดวางสินค้าในพอร์ต — สินค้าที่ทั้งราคาดีและตอบโจทย์การดูแลซับซ้อน
                    (เช่น Premium Overnight, Home-care Bundle) มีโอกาสสร้างมาร์จินและความแตกต่างได้มากกว่า
                  </ChartNote>
                </CardBody>
              </Card>
            ),
          },
        ]}
      />

      <div>
        <h3 className="mb-3 text-base font-bold text-ink">Hero Product ที่แนะนำให้เริ่ม</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {heroProducts.map((h) => (
            <Card key={h.name} className="avoid-break">
              <CardBody className="p-4">
                <Badge tone={h.tone as any}>แนะนำ</Badge>
                <p className="mt-2 text-sm font-bold text-ink">{h.name}</p>
                <p className="mt-1 text-xs text-ink-soft">{h.reason}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <InsightCard>
          สินค้าที่ "แข่งราคาอย่างเดียว" (เทป/กางเกงพื้นฐาน) เสี่ยงสงครามราคา ขณะที่{" "}
          <b>Overnight, Caregiver Bundle และ Underpad B2B</b> มีโอกาสสร้างจุดต่างและมาร์จินมากกว่า
        </InsightCard>
        <RecommendationBox>
          เริ่มจาก <b>ผ้าอ้อมเทปซึมซับสูง/Overnight</b> เป็น Hero และเสริม Bundle (wipes + barrier
          cream + underpad) เพื่อเพิ่ม basket size และความผูกพันลูกค้า
        </RecommendationBox>
      </div>
    </div>
  );
}
