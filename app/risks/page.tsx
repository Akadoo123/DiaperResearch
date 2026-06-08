"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/Table";
import { InsightCard, RecommendationBox, ChartNote } from "@/components/ui/Boxes";
import { Badge, RiskBadge } from "@/components/ui/Badges";
import { PillToggle } from "@/components/ui/Tabs";
import { DonutChartBox } from "@/components/charts/Charts";
import { risks, categoryLabel, mitigationRoadmap, Risk } from "@/data/risks";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

type Filter = "all" | "highProb" | "highImpact" | Risk["category"];

function cellColor(score: number) {
  if (score >= 16) return "bg-red-500 text-white";
  if (score >= 10) return "bg-amber-400 text-white";
  if (score >= 5) return "bg-amber-100 text-amber-700";
  return "bg-leaf-100 text-leaf-700";
}

export default function RisksPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<Risk | null>(null);

  const filtered = risks.filter((r) => {
    if (filter === "all") return true;
    if (filter === "highProb") return r.probability >= 4;
    if (filter === "highImpact") return r.impact >= 4;
    return r.category === filter;
  });

  const top5 = [...risks].sort((a, b) => b.probability * b.impact - a.probability * a.impact).slice(0, 5);

  // Heatmap grid 5x5
  const grid: Record<string, Risk[]> = {};
  risks.forEach((r) => {
    const key = `${r.probability}-${r.impact}`;
    (grid[key] = grid[key] || []).push(r);
  });

  const catMix = (["product", "finance", "channel", "regulation", "market"] as const).map((c) => ({
    name: categoryLabel[c],
    value: risks.filter((r) => r.category === c).length,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="วิเคราะห์ความเสี่ยง (Risk Analysis)"
        description="ประเมินความเสี่ยงตามโอกาสเกิดและผลกระทบ พร้อม Heatmap, Top 5 ความเสี่ยงวิกฤต และแผนลดความเสี่ยง"
      />

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="avoid-break lg:col-span-3">
          <CardBody>
            <h3 className="mb-3 text-base font-bold text-ink">Risk Heatmap (โอกาสเกิด × ผลกระทบ)</h3>
            <div className="flex">
              <div className="flex flex-col justify-around pr-2 text-[10px] font-medium text-ink-soft">
                <span className="rotate-0">สูง</span>
                <span>โอกาสเกิด</span>
                <span>ต่ำ</span>
              </div>
              <div className="grid flex-1 grid-cols-5 gap-1">
                {[5, 4, 3, 2, 1].map((prob) =>
                  [1, 2, 3, 4, 5].map((impact) => {
                    const key = `${prob}-${impact}`;
                    const items = grid[key] || [];
                    return (
                      <div
                        key={key}
                        className={cn(
                          "flex min-h-[54px] flex-col items-center justify-center rounded-lg p-1 text-center text-[9px] leading-tight",
                          cellColor(prob * impact)
                        )}
                      >
                        {items.map((it) => (
                          <button
                            key={it.id}
                            onClick={() => setActive(it)}
                            className="truncate hover:underline"
                            title={it.name}
                          >
                            • {it.name.length > 10 ? it.name.slice(0, 9) + "…" : it.name}
                          </button>
                        ))}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div className="mt-1 flex justify-between pl-8 text-[10px] text-ink-soft">
              <span>ผลกระทบต่ำ</span>
              <span>→ ผลกระทบสูง</span>
            </div>
            <ChartNote>
              Heatmap นี้ช่วยจัดลำดับความเสี่ยงตามโอกาสเกิดและผลกระทบ เพื่อให้ทีมรู้ว่าควรแก้ความเสี่ยงไหนก่อน
              (มุมขวาบนสีแดง = วิกฤต) — คลิกที่ความเสี่ยงเพื่อดู Early Warning และแผนรับมือ
            </ChartNote>
          </CardBody>
        </Card>

        <div className="space-y-3 lg:col-span-2">
          <Card className="avoid-break">
            <CardBody>
              <h3 className="mb-2 text-sm font-bold text-ink">สัดส่วนความเสี่ยงตามหมวด</h3>
              <DonutChartBox data={catMix} height={200} />
            </CardBody>
          </Card>
          <Card className="avoid-break border-red-100 bg-red-50/40">
            <CardBody>
              <h3 className="mb-2 flex items-center gap-1 text-sm font-bold text-red-500">
                <AlertTriangle className="h-4 w-4" /> Top 5 ความเสี่ยงวิกฤต
              </h3>
              <ol className="space-y-1.5 text-sm">
                {top5.map((r, i) => (
                  <li key={r.id} className="flex items-center justify-between">
                    <button onClick={() => setActive(r)} className="text-left hover:underline">
                      {i + 1}. {r.name}
                    </button>
                    <Badge tone="danger">{r.probability * r.impact}</Badge>
                  </li>
                ))}
              </ol>
            </CardBody>
          </Card>
        </div>
      </div>

      {active && (
        <Card className="avoid-break border-brand-200">
          <CardBody>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-ink">{active.name}</h3>
              <Badge tone="neutral">{categoryLabel[active.category]}</Badge>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Info label="โอกาสเกิด" value={`${active.probability}/5`} />
              <Info label="ผลกระทบ" value={`${active.impact}/5`} />
              <Info label="สัญญาณเตือนล่วงหน้า" value={active.warning} />
              <Info label="ผู้รับผิดชอบ" value={active.owner} />
            </div>
            <div className="mt-3 rounded-xl bg-leaf-50/60 p-3">
              <p className="text-xs font-semibold text-leaf-600">แผนลดความเสี่ยง (Mitigation)</p>
              <p className="mt-1 text-sm text-ink">{active.mitigation}</p>
            </div>
          </CardBody>
        </Card>
      )}

      <PillToggle
        value={filter}
        onChange={setFilter}
        options={[
          { value: "all", label: "ทั้งหมด" },
          { value: "highProb", label: "โอกาสสูง" },
          { value: "highImpact", label: "ผลกระทบสูง" },
          { value: "product", label: "สินค้า" },
          { value: "finance", label: "การเงิน" },
          { value: "channel", label: "ช่องทาง" },
          { value: "regulation", label: "กฎระเบียบ" },
        ]}
      />

      <DataTable
        columns={[
          { key: "name", label: "ความเสี่ยง" },
          { key: "cat", label: "หมวด" },
          { key: "prob", label: "โอกาส" },
          { key: "impact", label: "ผลกระทบ" },
          { key: "warning", label: "สัญญาณเตือน" },
          { key: "mit", label: "แผนรับมือ" },
          { key: "owner", label: "ผู้รับผิดชอบ" },
        ]}
        rows={filtered.map((r) => ({
          name: <button onClick={() => setActive(r)} className="font-medium hover:text-brand-600">{r.name}</button>,
          cat: <Badge tone="neutral">{categoryLabel[r.category]}</Badge>,
          prob: <RiskBadge level={r.probability >= 4 ? "high" : r.probability >= 3 ? "medium" : "low"} />,
          impact: <RiskBadge level={r.impact >= 4 ? "high" : r.impact >= 3 ? "medium" : "low"} />,
          warning: <span className="text-xs text-ink-soft">{r.warning}</span>,
          mit: <span className="text-xs">{r.mitigation}</span>,
          owner: <span className="text-xs">{r.owner}</span>,
        }))}
      />

      <Card className="avoid-break">
        <CardBody>
          <h3 className="mb-3 text-base font-bold text-ink">Mitigation Roadmap</h3>
          <div className="grid gap-3 md:grid-cols-3">
            {mitigationRoadmap.map((m, i) => (
              <div key={m.phase} className="rounded-xl bg-brand-gradient-soft p-4">
                <Badge tone={i === 0 ? "danger" : i === 1 ? "warn" : "leaf"}>{m.phase}</Badge>
                <p className="mt-2 text-sm text-ink">{m.action}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <InsightCard>
          ความเสี่ยงวิกฤตที่สุดคือ <b>สงครามราคา, Cashflow ตึง, และปัญหาคุณภาพ (รั่ว/ผื่น) ที่นำไปสู่รีวิวลบ</b>{" "}
          — ทั้งหมดเชื่อมโยงกันและกระทบความอยู่รอดของแบรนด์ใหม่
        </InsightCard>
        <RecommendationBox>
          จัดการความเสี่ยง 3 ตัวก่อนลงทุน: <b>(1) QC คุณภาพเข้ม (2) เริ่ม MOQ ต่ำลดเงินจม (3) เน้นซื้อซ้ำลดพึ่งโฆษณา</b>
        </RecommendationBox>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-[11px] font-semibold text-ink-soft">{label}</p>
      <p className="mt-0.5 text-sm text-ink">{value}</p>
    </div>
  );
}
