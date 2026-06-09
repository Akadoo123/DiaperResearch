"use client";

import Link from "next/link";
import { Card, CardBody } from "@/components/ui/Card";
import { MetricCard } from "@/components/ui/MetricCard";
import { Badge } from "@/components/ui/Badges";
import { InsightCard, RecommendationBox, ChartNote } from "@/components/ui/Boxes";
import { DonutChartBox, BarChartBox, COLORS } from "@/components/charts/Charts";
import { BrandLogo } from "./BrandLogo";
import { SourceFooter } from "./SourceFooter";
import { WordCloud } from "./WordCloud";
import { Brand, channelKeys } from "@/data/competitors";
import { fmt } from "@/lib/utils";
import { ArrowLeft, Globe, Building2, MapPin, Package, Tag, Smile, Frown } from "lucide-react";

const marketAvgPrice = 9.8; // THB/ชิ้น (modeled market average)

export function CompetitorDetail({ brand: b }: { brand: Brand }) {
  const portfolio = [
    { name: "กางเกง (Pant)", v: b.portfolio.pant },
    { name: "เทป (Tape)", v: b.portfolio.tape },
    { name: "แผ่นซับ (Pad)", v: b.portfolio.pad },
    { name: "Overnight", v: b.portfolio.overnight },
    { name: "Hospital-grade", v: b.portfolio.hospital },
  ];
  const totalSku = portfolio.reduce((s, p) => s + p.v, 0);
  const distribution = channelKeys.map((c) => ({ name: c.label, value: b.distribution[c.key] }));
  const priceVsMarket = [
    { name: "ราคาต่ำสุด", v: b.priceMin },
    { name: "ราคาเฉลี่ย", v: b.pricePerPiece },
    { name: "ราคาสูงสุด", v: b.priceMax },
    { name: "ค่าเฉลี่ยตลาด", v: marketAvgPrice },
  ];

  return (
    <div className="space-y-6">
      <Link href="/competitors" className="no-print inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
        <ArrowLeft className="h-4 w-4" /> กลับไปหน้า Competitor Intelligence
      </Link>

      {/* Header */}
      <Card className="avoid-break">
        <CardBody>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <BrandLogo name={b.name} color={b.color} size={60} />
              <div>
                <h1 className="text-xl font-bold text-ink">{b.name} <span className="text-sm font-normal text-ink-soft">/ {b.nameTh}</span></h1>
                <p className="text-sm text-ink-soft">{b.parentCompany}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="brand">{b.position}</Badge>
              <Badge tone="neutral">⭐ {b.reviewRating} (modeled)</Badge>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Company overview */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Overview icon={Building2} label="บริษัทแม่ (Parent)" value={b.parentCompany} conf={b.parentConfidence} />
        <Overview icon={MapPin} label="ประเทศต้นทาง" value={b.country} conf={b.countryConfidence} />
        <Overview icon={Globe} label="เว็บไซต์" value={b.website || "—"} />
        <Overview icon={Tag} label="ส่วนแบ่งตลาด (est.)" value={`${b.shareEst}%`} conf={b.shareConfidence} />
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="ราคาเฉลี่ย/ชิ้น" value={`${b.pricePerPiece}฿`} sub={`ตลาด ~${marketAvgPrice}฿`} icon={Tag} tone="brand" dataType="estimate" />
        <MetricCard label="ช่วงราคา/ชิ้น" value={`${b.priceMin}-${b.priceMax}฿`} icon={Tag} tone="neutral" dataType="estimate" />
        <MetricCard label="จำนวน SKU (รวม)" value={totalSku} unit="รุ่น" icon={Package} tone="brand" dataType="estimate" />
        <MetricCard label="Sentiment Score" value={b.sentiment.score} unit="/100" icon={Smile} tone={b.sentiment.score >= 65 ? "leaf" : "warn"} dataType="estimate" />
      </div>

      {/* Portfolio + Price */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="avoid-break">
          <CardBody>
            <h3 className="mb-3 text-base font-bold text-ink">Product Portfolio (SKU count)</h3>
            <BarChartBox data={portfolio} xKey="name" layout="vertical" height={240} bars={[{ key: "v", name: "SKU", color: b.color }]} />
            <SourceFooter confidence="low" type="Modeled" source="Marketplace/brand site SKU observation" />
          </CardBody>
        </Card>
        <Card className="avoid-break">
          <CardBody>
            <h3 className="mb-3 text-base font-bold text-ink">Price Analysis vs ตลาด</h3>
            <BarChartBox data={priceVsMarket} xKey="name" height={240} bars={[{ key: "v", name: "บาท/ชิ้น", color: COLORS.brand }]} />
            <ChartNote>
              {b.pricePerPiece > marketAvgPrice
                ? `ราคาเฉลี่ยสูงกว่าตลาด ~${fmt(((b.pricePerPiece - marketAvgPrice) / marketAvgPrice) * 100, 0)}% — วางตัวพรีเมียม`
                : `ราคาเฉลี่ยต่ำกว่า/ใกล้ตลาด — เน้นความคุ้มค่า`}
            </ChartNote>
          </CardBody>
        </Card>
      </div>

      {/* Distribution */}
      <Card className="avoid-break">
        <CardBody>
          <h3 className="mb-3 text-base font-bold text-ink">Distribution Channel Mix</h3>
          <div className="grid items-center gap-3 md:grid-cols-2">
            <DonutChartBox data={distribution} height={260} />
            <div className="space-y-1.5">
              {distribution.map((d, i) => (
                <div key={d.name} className="flex items-center justify-between text-sm">
                  <span className="text-ink-soft">{d.name}</span>
                  <span className="font-semibold text-ink">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <SourceFooter confidence="low" type="Modeled" source="Channel mix proxy" />
        </CardBody>
      </Card>

      {/* SWOT */}
      <Card className="avoid-break">
        <CardBody>
          <h3 className="mb-3 text-base font-bold text-ink">SWOT Analysis</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <SwotCard title="Strengths" tone="leaf" items={b.swot.s} />
            <SwotCard title="Weaknesses" tone="danger" items={b.swot.w} />
            <SwotCard title="Opportunities" tone="brand" items={b.swot.o} />
            <SwotCard title="Threats" tone="warn" items={b.swot.t} />
          </div>
        </CardBody>
      </Card>

      {/* Sentiment */}
      <Card className="avoid-break">
        <CardBody>
          <h3 className="mb-1 text-base font-bold text-ink">Customer Sentiment Analysis</h3>
          <p className="mb-3 text-xs text-ink-soft">รวบรวมจาก Shopee, Lazada, TikTok Shop, Facebook, Pantip (modeled themes)</p>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 flex items-center gap-1 text-sm font-semibold text-leaf-600"><Smile className="h-4 w-4" /> Positive Themes</p>
              <WordCloud words={b.sentiment.positive} tone="positive" />
            </div>
            <div>
              <p className="mb-2 flex items-center gap-1 text-sm font-semibold text-red-500"><Frown className="h-4 w-4" /> Negative Themes</p>
              <WordCloud words={b.sentiment.negative} tone="negative" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-ink-soft">
              <span>Net Sentiment</span>
              <span className="font-semibold text-ink">{b.sentiment.score}/100</span>
            </div>
            <div className="mt-1 h-2.5 w-full rounded-full bg-red-100">
              <div className="h-2.5 rounded-full bg-leaf-500" style={{ width: `${b.sentiment.score}%` }} />
            </div>
          </div>
          <SourceFooter confidence="low" type="Modeled" source="Aggregated review themes (sample)" />
        </CardBody>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <InsightCard>
          <b>{b.name}</b>: {b.strengths} — แต่จุดอ่อนคือ {b.weaknesses}
        </InsightCard>
        <RecommendationBox>
          แบรนด์ใหม่ควรเรียนรู้จุดแข็งของ {b.name} และโจมตีจุดอ่อน — โดยเฉพาะช่องทาง/มิติที่ได้คะแนนต่ำ
          (ดู Benchmark Radar เปรียบเทียบหลายแบรนด์)
        </RecommendationBox>
      </div>
    </div>
  );
}

function Overview({ icon: Icon, label, value, conf }: { icon: any; label: string; value: string; conf?: "high" | "medium" | "low" }) {
  const confLabel = conf === "high" ? "ยืนยันได้" : conf === "medium" ? "ค่อนข้างมั่นใจ" : conf === "low" ? "ต้อง Validate" : null;
  const confColor = conf === "high" ? "text-leaf-600" : conf === "medium" ? "text-amber-600" : "text-red-500";
  return (
    <Card className="avoid-break">
      <CardBody className="p-4">
        <div className="flex items-center gap-1.5 text-ink-soft">
          <Icon className="h-3.5 w-3.5" />
          <span className="text-[11px] font-medium">{label}</span>
        </div>
        <p className="mt-1 text-sm font-bold text-ink break-words">{value}</p>
        {confLabel && <p className={`mt-0.5 text-[10px] font-medium ${confColor}`}>● {confLabel}</p>}
      </CardBody>
    </Card>
  );
}

function SwotCard({ title, tone, items }: { title: string; tone: "leaf" | "danger" | "brand" | "warn"; items: string[] }) {
  const map = {
    leaf: "border-leaf-100 bg-leaf-50/40",
    danger: "border-red-100 bg-red-50/40",
    brand: "border-brand-100 bg-brand-50/40",
    warn: "border-amber-100 bg-amber-50/40",
  };
  return (
    <div className={`rounded-xl border p-3 ${map[tone]}`}>
      <p className="mb-1.5 text-xs font-bold text-ink">{title}</p>
      <ul className="space-y-1 text-xs text-ink">
        {items.map((it) => (
          <li key={it} className="flex gap-1.5"><span className="text-ink-soft">•</span> {it}</li>
        ))}
      </ul>
    </div>
  );
}
