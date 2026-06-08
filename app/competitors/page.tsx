"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/Table";
import { InsightCard, RecommendationBox, ChartNote } from "@/components/ui/Boxes";
import { Badge } from "@/components/ui/Badges";
import { Tabs, PillToggle } from "@/components/ui/Tabs";
import { BarChartBox, DonutChartBox, ScatterMap } from "@/components/charts/Charts";
import { competitors, competitorGroupSwot, Competitor } from "@/data/competitors";

const tierColor: Record<string, string> = {
  Economy: "#94A3B8",
  Value: "#38BDF8",
  Mid: "#6366F1",
  Premium: "#A855F7",
  Medical: "#F59E0B",
};

export default function CompetitorsPage() {
  const [tier, setTier] = useState<string>("all");
  const filtered = tier === "all" ? competitors : competitors.filter((c) => c.tier === tier);

  return (
    <div className="space-y-6">
      <PageHeader
        title="คู่แข่งในตลาด (Competitor Landscape)"
        description="วิเคราะห์คู่แข่งตามกลุ่ม ราคา ตำแหน่ง และความแข็งแกร่ง — ข้อมูลเป็นตัวอย่าง ใช้ชื่อกลุ่มแทนแบรนด์จริง ต้อง Validate เพิ่ม"
      />

      <Card className="avoid-break border-amber-100 bg-amber-50/50">
        <CardBody className="py-3 text-xs text-amber-700">
          ⚠️ ข้อมูลคู่แข่งทั้งหมดเป็น <b>ข้อมูลตัวอย่าง / ต้อง Validate เพิ่ม</b> —
          ควรเก็บข้อมูลจริงจาก Marketplace, ร้านยา และการสำรวจหน้าร้าน
        </CardBody>
      </Card>

      <Tabs
        tabs={[
          {
            label: "เปรียบเทียบแบรนด์",
            content: (
              <div className="space-y-3">
                <PillToggle
                  value={tier}
                  onChange={setTier}
                  options={[
                    { value: "all", label: "ทั้งหมด" },
                    { value: "Economy", label: "Economy" },
                    { value: "Value", label: "Value" },
                    { value: "Mid", label: "Mid" },
                    { value: "Premium", label: "Premium" },
                    { value: "Medical", label: "Medical" },
                  ]}
                />
                <DataTable
                  columns={[
                    { key: "brand", label: "แบรนด์ (กลุ่ม)" },
                    { key: "origin", label: "ที่มา" },
                    { key: "tier", label: "Tier" },
                    { key: "channel", label: "ช่องทางหลัก" },
                    { key: "positioning", label: "Positioning" },
                    { key: "rating", label: "รีวิว" },
                    { key: "strength", label: "จุดแข็ง" },
                    { key: "weakness", label: "จุดอ่อน" },
                  ]}
                  rows={filtered.map((c) => ({
                    brand: <span className="font-medium">{c.brand}</span>,
                    origin: c.origin,
                    tier: <Badge tone="neutral">{c.tier}</Badge>,
                    channel: c.channel,
                    positioning: c.positioning,
                    rating: <span className="font-semibold">⭐ {c.rating}</span>,
                    strength: <span className="text-xs">{c.strength}</span>,
                    weakness: <span className="text-xs text-red-500">{c.weakness}</span>,
                  }))}
                />
              </div>
            ),
          },
          {
            label: "Price Tier",
            content: (
              <Card>
                <CardBody>
                  <BarChartBox
                    data={competitors.map((c) => ({ name: c.brand, price: c.pricePerPiece }))}
                    xKey="name"
                    layout="vertical"
                    height={320}
                    bars={[{ key: "price", name: "ราคา/ชิ้น (บาท)", color: "#6366F1" }]}
                  />
                  <ChartNote>
                    กราฟนี้ช่วยให้เห็นว่าแบรนด์ส่วนใหญ่อยู่ในช่วงราคาใด — ถ้าแบรนด์ใหม่เข้าไปต่ำเกินไป
                    จะเสี่ยงแข่งราคา แต่ถ้าสูงเกินไปต้องมีความแตกต่างที่ชัดเจน
                  </ChartNote>
                </CardBody>
              </Card>
            ),
          },
          {
            label: "Positioning Map",
            content: (
              <Card>
                <CardBody>
                  <ScatterMap
                    points={competitors.map((c) => ({ x: c.pricePerPiece, y: c.quality, name: c.brand, color: tierColor[c.tier] }))}
                    xLabel="ราคา (บาท/ชิ้น)"
                    yLabel="คุณภาพ/ความน่าเชื่อถือที่รับรู้"
                    xDomain={[0, 18]}
                    yDomain={[0, 10]}
                  />
                  <ChartNote>
                    แผนที่นี้แสดงตำแหน่งคู่แข่ง — มุมขวาบน (แพง+คุณภาพสูง) คือ Premium, มุมซ้ายล่าง
                    (ถูก+คุณภาพต่ำ) คือ Economy ช่องว่างที่น่าสนใจคือ "คุณภาพดีในราคาที่เข้าถึงได้"
                  </ChartNote>
                </CardBody>
              </Card>
            ),
          },
          {
            label: "Market Share Proxy",
            content: (
              <Card>
                <CardBody>
                  <div className="grid items-center gap-3 md:grid-cols-2">
                    <DonutChartBox data={competitors.map((c) => ({ name: c.brand, value: c.shareProxy }))} height={300} />
                    <ChartNote>
                      สัดส่วนนี้เป็น <b>proxy</b> จากความแข็งแกร่งและการมองเห็นในช่องทาง ไม่ใช่ส่วนแบ่งจริง —
                      ตลาดยังกระจาย ไม่มีผู้เล่นครองเด็ดขาด เปิดช่องให้แบรนด์ใหม่ที่มีจุดต่าง
                    </ChartNote>
                  </div>
                </CardBody>
              </Card>
            ),
          },
          {
            label: "SWOT ตามกลุ่ม",
            content: (
              <div className="grid gap-3 md:grid-cols-3">
                {competitorGroupSwot.map((g) => (
                  <Card key={g.group} className="avoid-break">
                    <CardBody>
                      <h4 className="text-sm font-bold text-ink">{g.group}</h4>
                      <div className="mt-2 space-y-1.5 text-xs">
                        <p><span className="font-semibold text-leaf-600">S:</span> {g.s}</p>
                        <p><span className="font-semibold text-red-500">W:</span> {g.w}</p>
                        <p><span className="font-semibold text-brand-600">O:</span> {g.o}</p>
                        <p><span className="font-semibold text-amber-600">T:</span> {g.t}</p>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            ),
          },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <InsightCard>
          ตลาดมี <b>ช่องว่างระหว่าง Economy (ถูกแต่คุณภาพต่ำ) และ Premium (ดีแต่แพง)</b> —
          แบรนด์ใหม่มีโอกาสในตำแหน่ง "คุณภาพดีในราคาที่เข้าถึงได้ + จุดต่างด้าน Caregiver/Overnight"
        </InsightCard>
        <RecommendationBox>
          อย่าเข้าไปแข่งในกลุ่ม Economy (สงครามราคา) — วางตำแหน่งช่วง <b>Mid/Value</b> ที่ราคา 9-11
          บาท/ชิ้น พร้อมจุดต่างที่พิสูจน์ได้ (กันรั่วกลางคืน/ลดผื่น)
        </RecommendationBox>
      </div>
    </div>
  );
}
