"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { MetricCard } from "@/components/ui/MetricCard";
import { Card, CardBody } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/Table";
import { InsightCard, RecommendationBox, ChartNote } from "@/components/ui/Boxes";
import { Badge } from "@/components/ui/Badges";
import { Tabs } from "@/components/ui/Tabs";
import { BarChartBox } from "@/components/charts/Charts";
import {
  priceRows,
  tierBenchmark,
  onlineVsOffline,
  packSizeCompare,
  pricingRecommendation,
} from "@/data/pricing";
import { Tag, TrendingDown, Target, Percent } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="เปรียบเทียบราคา (Pricing Benchmark)"
        description="วิเคราะห์ราคาต่อชิ้นตามแบรนด์ ช่องทาง และขนาดแพ็ค พร้อมข้อเสนอแนะ Tier และราคาเข้าตลาด"
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
        <MetricCard label="Economy/ชิ้น" value="5.5" unit="บาท" icon={TrendingDown} tone="neutral" dataType="estimate" />
        <MetricCard label="Mid-market/ชิ้น" value="11" unit="บาท" icon={Tag} tone="brand" dataType="estimate" />
        <MetricCard label="Premium/ชิ้น" value="15.5" unit="บาท" icon={Tag} tone="warn" dataType="estimate" />
        <MetricCard label="ราคาเข้าแนะนำ" value="9-11" unit="บาท" icon={Target} tone="leaf" dataType="assumption" />
        <MetricCard label="Gross Margin เป้า" value="45" unit="%" icon={Percent} tone="leaf" dataType="assumption" />
        <MetricCard label="ช่องว่างโปรออนไลน์" value="~12" unit="%" icon={Percent} tone="warn" dataType="estimate" />
      </div>

      <Tabs
        tabs={[
          {
            label: "ราคาต่อชิ้น",
            content: (
              <DataTable
                columns={[
                  { key: "brand", label: "แบรนด์" },
                  { key: "type", label: "ประเภท" },
                  { key: "size", label: "ไซส์" },
                  { key: "pcs", label: "ชิ้น/แพ็ค" },
                  { key: "pack", label: "ราคาแพ็ค" },
                  { key: "ppp", label: "ราคา/ชิ้น" },
                  { key: "promo", label: "ราคาโปร" },
                  { key: "channel", label: "ช่องทาง" },
                  { key: "rating", label: "รีวิว" },
                  { key: "tier", label: "Tier" },
                ]}
                rows={priceRows.map((p) => ({
                  brand: <span className="font-medium">{p.brand}</span>,
                  type: p.type,
                  size: p.size,
                  pcs: p.piecesPerPack,
                  pack: `${p.packPrice}฿`,
                  ppp: <span className="font-bold text-brand-600">{p.pricePerPiece}฿</span>,
                  promo: `${p.promoPrice}฿`,
                  channel: p.channel,
                  rating: `⭐ ${p.rating}`,
                  tier: <Badge tone="neutral">{p.tier}</Badge>,
                }))}
                caption="ข้อมูลตัวอย่าง — ต้อง scrape ราคาจริงจาก Shopee / Lazada / TikTok Shop"
              />
            ),
          },
          {
            label: "Online vs Offline",
            content: (
              <Card>
                <CardBody>
                  <BarChartBox
                    data={onlineVsOffline}
                    xKey="type"
                    height={300}
                    bars={[
                      { key: "online", name: "ออนไลน์", color: "#6366F1" },
                      { key: "offline", name: "ออฟไลน์", color: "#22C55E" },
                    ]}
                  />
                  <ChartNote>
                    ราคาออนไลน์มักต่ำกว่าออฟไลน์ ~10-15% เพราะการแข่งขันและโปรโมชัน —
                    ต้องวางกลยุทธ์ราคาให้สอดคล้องกันเพื่อไม่ให้ช่องทางขัดแย้งกัน (channel conflict)
                  </ChartNote>
                </CardBody>
              </Card>
            ),
          },
          {
            label: "ขนาดแพ็ค",
            content: (
              <Card>
                <CardBody>
                  <BarChartBox
                    data={packSizeCompare}
                    xKey="pack"
                    layout="vertical"
                    height={260}
                    bars={[{ key: "pricePerPiece", name: "ราคา/ชิ้น (บาท)", color: "#A855F7" }]}
                  />
                  <ChartNote>
                    แพ็คใหญ่/ลังขายส่งทำให้ราคาต่อชิ้นถูกลง — ใช้เป็นเครื่องมือผูกลูกค้า (Subscription/B2B)
                    และเพิ่ม basket size โดยไม่ต้องลดราคาหน้าร้าน
                  </ChartNote>
                </CardBody>
              </Card>
            ),
          },
          {
            label: "Tier Benchmark",
            content: (
              <Card>
                <CardBody>
                  <BarChartBox
                    data={tierBenchmark}
                    xKey="tier"
                    height={260}
                    bars={[{ key: "pricePerPiece", name: "ราคา/ชิ้น (บาท)", color: "#6366F1" }]}
                  />
                  <ChartNote>
                    แต่ละ Tier มีช่วงราคาชัดเจน — แบรนด์ใหม่ควรเลือก Tier ที่มีพื้นที่ว่างและทำกำไรได้
                    โดยไม่ชนกับผู้นำในแต่ละกลุ่มโดยตรง
                  </ChartNote>
                </CardBody>
              </Card>
            ),
          },
          {
            label: "ราคาที่แนะนำ",
            content: (
              <div className="grid gap-3 md:grid-cols-2">
                <RecRow label="Tier ที่ควรเข้า" value={pricingRecommendation.enterTier} />
                <RecRow label="ราคาต่อชิ้นที่รับได้" value={pricingRecommendation.acceptablePrice} />
                <RecRow label="เป้า Gross Margin" value={pricingRecommendation.marginTarget} />
                <RecRow label="วิธีเลี่ยงสงครามราคา" value={pricingRecommendation.avoidWar} />
              </div>
            ),
          },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <InsightCard>
          ราคาต่ำสุดในตลาดอยู่ที่ ~5.5 บาท/ชิ้น (นำเข้าราคาถูก) แต่มาพร้อมรีวิวลบเรื่องรั่ว/ผื่น —
          <b> การแข่งที่ราคาต่ำสุดไม่ยั่งยืน</b> สำหรับแบรนด์ใหม่
        </InsightCard>
        <RecommendationBox>
          เข้าที่ <b>9-11 บาท/ชิ้น (Mid/Value)</b> พร้อมจุดต่างที่จับต้องได้ และรักษา Gross Margin ≥
          45% เพื่อรองรับค่าโฆษณาและโลจิสติกส์
        </RecommendationBox>
      </div>
    </div>
  );
}

function RecRow({ label, value }: { label: string; value: string }) {
  return (
    <Card className="avoid-break">
      <CardBody className="p-4">
        <p className="text-xs font-semibold text-ink-soft">{label}</p>
        <p className="mt-1 text-sm font-medium text-ink">{value}</p>
      </CardBody>
    </Card>
  );
}
