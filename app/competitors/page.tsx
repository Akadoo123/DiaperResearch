"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { MetricCard } from "@/components/ui/MetricCard";
import { Card, CardBody } from "@/components/ui/Card";
import { InsightCard, RecommendationBox, ChartNote } from "@/components/ui/Boxes";
import { Badge } from "@/components/ui/Badges";
import { Tabs, PillToggle } from "@/components/ui/Tabs";
import { BarChartBox, DonutChartBox, ScatterMap, RadarChartBox, COLORS } from "@/components/charts/Charts";
import { BrandLogo } from "@/components/competitors/BrandLogo";
import { SourceFooter } from "@/components/competitors/SourceFooter";
import {
  brands,
  othersShare,
  sortedByShare,
  cr,
  hhi,
  hhiInterpretation,
  channelKeys,
  whiteSpaces,
  Brand,
} from "@/data/competitors";
import { fmt } from "@/lib/utils";
import { ArrowRight, Crown, Trophy, Layers, Target, Lightbulb } from "lucide-react";

const positionTone: Record<string, "brand" | "leaf" | "warn" | "danger" | "neutral"> = {
  Premium: "brand",
  Mass: "leaf",
  Budget: "neutral",
  "Online Challenger": "warn",
  "Hospital-grade": "brand",
};

export default function CompetitorsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Competitor Intelligence — คู่แข่งจริงในตลาดไทย"
        description="ระบบวิเคราะห์คู่แข่งด้วยแบรนด์จริงที่ทำตลาดผ้าอ้อมผู้ใหญ่ในไทย — ส่วนแบ่ง ราคา ตำแหน่ง ช่องทาง จุดแข็ง/อ่อน และช่องว่างตลาด"
      />

      <Card className="avoid-break border-amber-100 bg-amber-50/50">
        <CardBody className="py-3 text-xs text-amber-700">
          ⚠️ <b>ชื่อแบรนด์/บริษัทแม่/ประเทศ</b> = ข้อมูลสาธารณะ · <b>ส่วนแบ่งตลาด/ราคา/คะแนน</b> ={" "}
          <b>Modeled Estimate</b> ประเมินจาก shelf presence, SKU count, search volume, online sales,
          hospital presence — ติดป้าย Confidence ทุกจุด และต้อง Validate ด้วย retail audit จริง
        </CardBody>
      </Card>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="จำนวนแบรนด์หลักที่ติดตาม" value={brands.length} unit="แบรนด์" icon={Layers} tone="brand" />
        <MetricCard label="Market Leader (ประเมิน)" value="Certainty" sub="~24% share" icon={Crown} tone="leaf" dataType="estimate" />
        <MetricCard label="CR3 (3 แบรนด์ใหญ่)" value={fmt(cr(3))} unit="%" icon={Trophy} tone="brand" dataType="estimate" />
        <MetricCard label="HHI (กระจุกตัว)" value={fmt(hhi())} sub={hhiInterpretation(hhi())} icon={Target} tone="warn" dataType="estimate" />
      </div>

      <Tabs
        tabs={[
          { label: "Overview (การ์ดแบรนด์)", content: <OverviewGrid /> },
          { label: "Market Share", content: <MarketShare /> },
          { label: "Positioning Map", content: <Positioning /> },
          { label: "Benchmark Radar", content: <Benchmark /> },
          { label: "Market Structure", content: <MarketStructure /> },
          { label: "Channel Analysis", content: <ChannelAnalysis /> },
          { label: "White Space", content: <WhiteSpace /> },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <InsightCard>
          ตลาดมี <b>ผู้นำชัด (Certainty) + แบรนด์ญี่ปุ่นครองตลาดบน (Lifree/MamyPoko)</b> แต่ CR3 ~
          {fmt(cr(3))}% และ HHI ~{fmt(hhi())} แปลว่ายัง <b>ไม่ผูกขาด</b> — มีช่องว่างให้ผู้เล่นใหม่ที่มีจุดต่าง
        </InsightCard>
        <RecommendationBox>
          เลี่ยงปะทะ Certainty (mass) และแบรนด์ญี่ปุ่น (premium) ตรงๆ — เจาะ{" "}
          <b>White Space: Subscription + Caregiver ecosystem</b> ที่แบรนด์ใหญ่ยังอ่อน
        </RecommendationBox>
      </div>
    </div>
  );
}

/* ---------- Overview card grid ---------- */
function OverviewGrid() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedByShare().map((b) => (
          <Link key={b.slug} href={`/competitors/${b.slug}`}>
            <Card className="avoid-break group cursor-pointer transition hover:-translate-y-0.5 hover:border-brand-500 hover:shadow-soft-lg">
              <CardBody className="p-4">
                <div className="flex items-start gap-3">
                  <BrandLogo name={b.name} color={b.color} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-bold text-ink">{b.name}</p>
                      <Badge tone={positionTone[b.position]}>{b.position}</Badge>
                    </div>
                    <p className="truncate text-[11px] text-ink-soft">{b.parentCompany}</p>
                    <p className="text-[11px] text-ink-soft">🌐 {b.country}</p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-slate-50 p-2">
                    <p className="text-[10px] text-ink-soft">Market Share (est.)</p>
                    <p className="text-sm font-bold text-ink">{b.shareEst}%</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-2">
                    <p className="text-[10px] text-ink-soft">Avg Price</p>
                    <p className="text-sm font-bold text-ink">{b.pricePerPiece}฿/ชิ้น</p>
                  </div>
                </div>
                <p className="mt-2 flex items-center justify-end gap-1 text-[11px] font-medium text-brand-600 opacity-0 transition group-hover:opacity-100">
                  ดู Deep Dive <ArrowRight className="h-3 w-3" />
                </p>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
      <SourceFooter confidence="medium" source="Marketplace + Retail observation + Brand sites" />
    </div>
  );
}

/* ---------- Market share ---------- */
function MarketShare() {
  const [channel, setChannel] = useState<"overall" | "retail" | "hospital" | "ecommerce">("overall");

  const data = sortedByShare().map((b) => {
    let v = b.shareEst;
    if (channel !== "overall") {
      // reweight by channel strength as a proxy
      const w = b.channelStrength[channel === "retail" ? "retail" : channel === "hospital" ? "hospital" : "ecommerce"];
      v = Math.round(b.shareEst * (w / 6) * 10) / 10;
    }
    return { name: b.name, share: v, color: b.color };
  });
  const withOthers = [...data, { name: "Others", share: othersShare, color: "#CBD5E1" }];

  return (
    <Card>
      <CardBody>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-bold text-ink">ส่วนแบ่งตลาด (ประเมิน) ตามช่องทาง</h3>
          <PillToggle
            value={channel}
            onChange={setChannel}
            options={[
              { value: "overall", label: "รวมทุกช่องทาง" },
              { value: "retail", label: "Retail" },
              { value: "hospital", label: "Hospital" },
              { value: "ecommerce", label: "E-commerce" },
            ]}
          />
        </div>
        <BarChartBox
          data={withOthers}
          xKey="name"
          layout="vertical"
          height={360}
          bars={[{ key: "share", name: "ส่วนแบ่ง (%)", color: COLORS.brand }]}
        />
        <ChartNote>
          กราฟนี้แสดงส่วนแบ่งตลาดประเมิน — เมื่อกรองตามช่องทางจะถ่วงน้ำหนักด้วยความแข็งแกร่งของแต่ละแบรนด์ในช่องทางนั้น
          (เช่น Tena เด่นใน Hospital, An-An/MamyPoko เด่นใน E-commerce) ใช้เลือกว่าจะเข้าชนกับใครในช่องทางไหน
        </ChartNote>
        <SourceFooter confidence={channel === "overall" ? "medium" : "low"} type="Modeled"
          source="Shelf presence + SKU count + search volume + online sales proxy" />
      </CardBody>
    </Card>
  );
}

/* ---------- Positioning ---------- */
function Positioning() {
  return (
    <Card>
      <CardBody>
        <ScatterMap
          points={brands.map((b) => ({ x: b.priceAxis, y: b.qualityAxis, name: b.name, color: b.color }))}
          xLabel="ราคา (ต่ำ → สูง)"
          yLabel="คุณภาพ/ความพรีเมียม (ต่ำ → สูง)"
        />
        <ChartNote>
          แผนที่นี้วางทุกแบรนด์ตามราคา×คุณภาพ — มุมขวาบน (Lifree, Tena, Depend) = Premium/Hospital,
          กลาง (Certainty, MamyPoko) = Mass, ล่างซ้าย (An-An, Fitti, OEM) = Budget,
          Dr.Pants = Online Challenger ที่อยู่กลางตลาด ช่องว่างน่าสนใจ = "คุณภาพสูง-ราคากลาง" ที่ยังโล่ง
        </ChartNote>
        <SourceFooter confidence="medium" type="Modeled" source="Price observation + review quality signals" />
      </CardBody>
    </Card>
  );
}

/* ---------- Benchmark radar (multi-select) ---------- */
const benchAxes: { key: keyof Brand["benchmark"]; label: string }[] = [
  { key: "marketShare", label: "Market Share" },
  { key: "price", label: "Price" },
  { key: "absorbency", label: "Absorbency" },
  { key: "comfort", label: "Comfort" },
  { key: "availability", label: "Availability" },
  { key: "hospital", label: "Hospital" },
  { key: "online", label: "Online" },
  { key: "brandStrength", label: "Brand Strength" },
];

function Benchmark() {
  const [selected, setSelected] = useState<string[]>(["certainty", "lifree", "tena"]);

  function toggle(slug: string) {
    setSelected((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : s.length < 4 ? [...s, slug] : s));
  }

  const chosen = brands.filter((b) => selected.includes(b.slug));
  const radarData = benchAxes.map((ax) => {
    const row: any = { axis: ax.label };
    chosen.forEach((b) => (row[b.slug] = b.benchmark[ax.key]));
    return row;
  });

  return (
    <Card>
      <CardBody>
        <div className="mb-3">
          <p className="mb-2 text-xs text-ink-soft">เลือกแบรนด์เพื่อเปรียบเทียบ (สูงสุด 4)</p>
          <div className="flex flex-wrap gap-2">
            {brands.map((b) => (
              <button
                key={b.slug}
                onClick={() => toggle(b.slug)}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition ${
                  selected.includes(b.slug) ? "border-transparent text-white" : "border-line bg-white text-ink-soft hover:bg-slate-50"
                }`}
                style={selected.includes(b.slug) ? { backgroundColor: b.color } : undefined}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>
        <RadarChartBox
          data={radarData}
          height={380}
          series={chosen.map((b) => ({ key: b.slug, name: b.name, color: b.color }))}
        />
        <ChartNote>
          Radar นี้เทียบหลายแบรนด์พร้อมกันใน 8 มิติ — ใช้หา "ช่องที่คู่แข่งทุกเจ้าได้คะแนนต่ำ" เพื่อเป็นจุดต่างของแบรนด์ใหม่
          (เช่น Subscription/Online ที่แบรนด์ hospital-grade ได้คะแนนต่ำ)
        </ChartNote>
        <SourceFooter confidence="low" type="Modeled" source="Composite scoring (1-10) จาก proxy หลายแหล่ง" />
      </CardBody>
    </Card>
  );
}

/* ---------- Market structure ---------- */
function MarketStructure() {
  const top3 = cr(3);
  const top5 = cr(5);
  const sorted = sortedByShare();
  const concentration = [
    { name: "Top 3", value: top3 },
    { name: "Top 5", value: top5 - top3 },
    { name: "อื่นๆ", value: 100 - top5 },
  ];
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="CR3 (Top 3 รวม)" value={fmt(top3)} unit="%" tone="brand" dataType="estimate" />
        <MetricCard label="CR5 (Top 5 รวม)" value={fmt(top5)} unit="%" tone="brand" dataType="estimate" />
        <MetricCard label="HHI" value={fmt(hhi())} sub={hhiInterpretation(hhi())} tone="warn" dataType="estimate" />
        <MetricCard label="แบรนด์ Top 5" value={sorted.slice(0, 5).map((b) => b.name.split(" ")[0]).join(", ")} tone="neutral" />
      </div>
      <Card>
        <CardBody>
          <div className="grid items-center gap-3 md:grid-cols-2">
            <DonutChartBox data={concentration} height={260} />
            <div>
              <h4 className="text-sm font-bold text-ink">โครงสร้างการกระจุกตัวของตลาด</h4>
              <p className="mt-2 text-sm text-ink-soft">
                Top 3 ครอง ~{fmt(top3)}% และ Top 5 ~{fmt(top5)}% ของตลาด · HHI ~{fmt(hhi())} ({hhiInterpretation(hhi())})
                — ตลาด <b>มีผู้นำแต่ยังไม่ผูกขาด</b> ส่วน "อื่นๆ" ~{fmt(100 - top5)}% สะท้อนตลาดล่างที่กระจายและแข่งราคา
              </p>
            </div>
          </div>
          <ChartNote>
            CR3/CR5 และ HHI ใช้วัดว่าตลาดกระจุกตัวแค่ไหน — ค่ายิ่งสูงยิ่งเข้ายาก ที่ระดับนี้ผู้เล่นใหม่ยังมีที่ยืน
            ถ้าเข้าด้วยจุดต่างชัดและไม่ชนผู้นำตรงๆ
          </ChartNote>
          <SourceFooter confidence="medium" type="Modeled" source="Estimated shares (modeled)" />
        </CardBody>
      </Card>
    </div>
  );
}

/* ---------- Channel analysis ---------- */
function ChannelAnalysis() {
  const data = channelKeys.map((ch) => {
    const row: any = { channel: ch.label };
    sortedByShare().slice(0, 5).forEach((b) => (row[b.slug] = b.channelStrength[ch.key]));
    return row;
  });
  const top5 = sortedByShare().slice(0, 5);
  return (
    <Card>
      <CardBody>
        <h3 className="mb-3 text-base font-bold text-ink">ความแข็งแกร่งของแบรนด์ในแต่ละช่องทาง (Top 5)</h3>
        <BarChartBox
          data={data}
          xKey="channel"
          height={340}
          bars={top5.map((b) => ({ key: b.slug, name: b.name, color: b.color }))}
        />
        <ChartNote>
          กราฟนี้บอกว่าแต่ละช่องทาง "ใครแข็งสุด" — Tena ครอง Hospital/Nursing home, Certainty ครอง Retail/Pharmacy,
          MamyPoko/An-An แข็งใน E-commerce ส่วน Subscription <b>ยังไม่มีใครแข็งจริง</b> = ช่องเข้าของแบรนด์ใหม่
        </ChartNote>
        <SourceFooter confidence="low" type="Modeled" source="Channel presence proxy (1-10)" />
      </CardBody>
    </Card>
  );
}

/* ---------- White space ---------- */
function WhiteSpace() {
  const diffTone = (d: string) => (d === "Low" ? "leaf" : d === "Medium" ? "warn" : "danger");
  const revTone = (r: string) => (r === "High" ? "leaf" : r === "Medium" ? "brand" : "neutral");
  return (
    <div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {whiteSpaces.sort((a, b) => b.score - a.score).map((w) => (
          <Card key={w.title} className="avoid-break">
            <CardBody className="p-4">
              <div className="flex items-start justify-between gap-2">
                <span className="inline-flex rounded-xl bg-brand-50 p-2 text-brand-600">
                  <Lightbulb className="h-4 w-4" />
                </span>
                <div className="text-right">
                  <p className="text-2xl font-bold text-brand-600">{w.score}</p>
                  <p className="text-[10px] text-ink-soft">Opportunity Score</p>
                </div>
              </div>
              <p className="mt-2 text-sm font-bold text-ink">{w.title}</p>
              <p className="mt-1 text-xs text-ink-soft">{w.desc}</p>
              <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100">
                <div className="h-1.5 rounded-full bg-brand-gradient" style={{ width: `${w.score}%` }} />
              </div>
              <div className="mt-3 flex gap-2">
                <Badge tone={revTone(w.revenue) as any}>Revenue: {w.revenue}</Badge>
                <Badge tone={diffTone(w.difficulty) as any}>Difficulty: {w.difficulty}</Badge>
              </div>
              <p className="mt-2 text-[11px] text-ink-soft">💡 {w.weakCompetitors}</p>
            </CardBody>
          </Card>
        ))}
      </div>
      <SourceFooter confidence="low" type="Modeled" source="Competitor gap analysis" />
    </div>
  );
}
