"use client";

import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { InsightCard, RecommendationBox, ChartNote } from "@/components/ui/Boxes";
import { Badge } from "@/components/ui/Badges";
import { BarChartBox, COLORS } from "@/components/charts/Charts";
import { BrandLogo } from "@/components/competitors/BrandLogo";
import { SourceFooter } from "@/components/competitors/SourceFooter";
import { marketLeaders, sortedByShare, brands, cr, hhi, hhiInterpretation } from "@/data/competitors";
import { fmt } from "@/lib/utils";
import { Crown, TrendingUp, Gem, Zap, Stethoscope, Wallet, ArrowRight } from "lucide-react";

const cards = [
  { key: "leader", title: "Market Leader", icon: Crown, tone: "leaf", data: marketLeaders.leader },
  { key: "fastestGrowing", title: "Fastest Growing", icon: TrendingUp, tone: "brand", data: marketLeaders.fastestGrowing },
  { key: "mostPremium", title: "Most Premium", icon: Gem, tone: "brand", data: marketLeaders.mostPremium },
  { key: "mostAggressiveOnline", title: "Most Aggressive Online", icon: Zap, tone: "warn", data: marketLeaders.mostAggressiveOnline },
  { key: "mostHospital", title: "Most Hospital-Oriented", icon: Stethoscope, tone: "brand", data: marketLeaders.mostHospital },
  { key: "bestValue", title: "Best Value", icon: Wallet, tone: "leaf", data: marketLeaders.bestValue },
];

function findBrand(name: string) {
  const first = name.split(" / ")[0].split(" ")[0];
  return brands.find((b) => b.name.startsWith(first));
}

export default function MarketLeadersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="ใครกำลังชนะตลาดผ้าอ้อมผู้ใหญ่ไทย? (Who Is Winning)"
        description="มุมมองนักลงทุน — สรุปว่าใครเป็นผู้นำ ใครโตเร็ว ใครพรีเมียม ใครแรงออนไลน์ ใครครอง รพ. และใครคุ้มค่าที่สุด พร้อมหลักฐานสนับสนุน"
      />

      <Card className="avoid-break border-amber-100 bg-amber-50/50">
        <CardBody className="py-3 text-xs text-amber-700">
          ⚠️ ข้อสรุปอิงจาก <b>Modeled Estimate</b> (ส่วนแบ่ง/ราคา/ช่องทางประเมินจาก proxy) — ใช้เพื่อจัดวางภาพการแข่งขัน
          ต้อง Validate ด้วยข้อมูล retail audit จริงก่อนใช้ตัดสินใจลงทุน
        </CardBody>
      </Card>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          const b = findBrand(c.data.brand);
          return (
            <Card key={c.key} className="avoid-break">
              <CardBody className="p-4">
                <div className="flex items-center justify-between">
                  <Badge tone={c.tone as any}>{c.title}</Badge>
                  <span className={`inline-flex rounded-xl p-2 ${
                    c.tone === "leaf" ? "bg-leaf-50 text-leaf-600" : c.tone === "warn" ? "bg-amber-50 text-amber-600" : "bg-brand-50 text-brand-600"
                  }`}>
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  {b && <BrandLogo name={b.name} color={b.color} size={36} />}
                  <p className="text-lg font-bold text-ink">{c.data.brand}</p>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-soft">{c.data.why}</p>
                {b && (
                  <Link href={`/competitors/${b.slug}`} className="no-print mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-brand-600 hover:underline">
                    ดู Deep Dive <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </CardBody>
            </Card>
          );
        })}
      </div>

      <Card className="avoid-break">
        <CardBody>
          <h3 className="mb-3 text-base font-bold text-ink">ตารางคะแนนผู้นำตลาด (Leaderboard)</h3>
          <BarChartBox
            data={sortedByShare().map((b) => ({ name: b.name, share: b.shareEst, color: b.color }))}
            xKey="name"
            layout="vertical"
            height={340}
            bars={[{ key: "share", name: "ส่วนแบ่งตลาด (est. %)", color: COLORS.brand }]}
          />
          <ChartNote>
            ภาพรวมการแข่งขัน: Certainty นำ ตามด้วยกลุ่มญี่ปุ่น (Lifree/MamyPoko) — CR3 ~{fmt(cr(3))}%, HHI ~{fmt(hhi())}
            ({hhiInterpretation(hhi())}). ตลาดยังเปิดให้ผู้ท้าชิงที่มีจุดต่าง
          </ChartNote>
          <SourceFooter confidence="medium" type="Modeled" source="Estimated market shares (modeled)" />
        </CardBody>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <InsightCard>
          "ผู้ชนะ" ในแต่ละมิติไม่ใช่เจ้าเดียวกัน — Certainty ชนะเรื่องสเกล/คุ้มค่า, Lifree/Tena ชนะเรื่องพรีเมียม/คุณภาพ,
          Dr.Pants ชนะเรื่องโมเมนตัมออนไลน์ <b>แปลว่าไม่มีใครครองทุกมิติ</b>
        </InsightCard>
        <RecommendationBox>
          แบรนด์ใหม่ควรเลือก "มิติที่จะชนะ" ให้ชัด — แนะนำชิงมิติ <b>Online + Subscription + Caregiver</b>{" "}
          ที่ผู้นำปัจจุบันยังไม่ได้เป็นเจ้าของ แทนการไล่ชนผู้นำในเกมที่เขาแข็งอยู่แล้ว
        </RecommendationBox>
      </div>
    </div>
  );
}
