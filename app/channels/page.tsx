"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/Table";
import { InsightCard, RecommendationBox, ChartNote } from "@/components/ui/Boxes";
import { Badge } from "@/components/ui/Badges";
import { PillToggle } from "@/components/ui/Tabs";
import { ScoreBar } from "@/components/ui/ScoreCard";
import { BarChartBox } from "@/components/charts/Charts";
import { channels, rolloutPhases, bestChannelFor, Channel } from "@/data/channels";
import { Zap, TrendingUp, Wallet, ShieldCheck } from "lucide-react";

type Filter = "all" | "Online" | "Offline" | "B2B" | "highMargin" | "highVolume";

export default function ChannelsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = channels.filter((c) => {
    if (filter === "all") return true;
    if (filter === "highMargin") return c.margin >= 7;
    if (filter === "highVolume") return c.volume >= 8;
    return c.group === filter;
  });

  const scored = [...filtered]
    .map((c) => ({ ...c, total: c.access + c.trust + c.margin + c.volume + c.scalability - c.difficulty }))
    .sort((a, b) => b.total - a.total);

  return (
    <div className="space-y-6">
      <PageHeader
        title="กลยุทธ์ช่องทางขาย (Channel Strategy)"
        description="ให้คะแนนและจัดลำดับช่องทางตามการเข้าถึง ความน่าเชื่อถือ มาร์จิน ปริมาณ และความยาก พร้อมแผน Rollout แบ่งเฟส"
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MiniCard label="ดีสุดสำหรับ Validate" value={bestChannelFor.validation} icon={Zap} tone="brand" />
        <MiniCard label="ดีสุดสำหรับ Scale" value={bestChannelFor.scale} icon={TrendingUp} tone="leaf" />
        <MiniCard label="ดีสุดสำหรับ Margin" value={bestChannelFor.margin} icon={Wallet} tone="brand" />
        <MiniCard label="ดีสุดสำหรับ Trust" value={bestChannelFor.trust} icon={ShieldCheck} tone="leaf" />
      </div>

      <PillToggle
        value={filter}
        onChange={setFilter}
        options={[
          { value: "all", label: "ทุกช่องทาง" },
          { value: "Online", label: "Online" },
          { value: "Offline", label: "Offline" },
          { value: "B2B", label: "B2B" },
          { value: "highMargin", label: "Margin สูง" },
          { value: "highVolume", label: "Volume สูง" },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="avoid-break lg:col-span-3">
          <CardBody>
            <h3 className="mb-1 text-base font-bold text-ink">คะแนนความน่าสนใจของช่องทาง</h3>
            <BarChartBox
              data={scored.map((c) => ({ name: c.name, score: c.total }))}
              xKey="name"
              layout="vertical"
              height={Math.max(280, scored.length * 28)}
              bars={[{ key: "score", name: "คะแนนรวม", color: "#6366F1" }]}
            />
            <ChartNote>
              คะแนนรวม = การเข้าถึง + ความน่าเชื่อถือ + มาร์จิน + ปริมาณ + ความสามารถขยาย − ความยาก —
              ช่องทางออนไลน์ได้คะแนนสูงเพราะเริ่มเร็วและเก็บข้อมูลได้ทันที
            </ChartNote>
          </CardBody>
        </Card>

        <Card className="avoid-break lg:col-span-2">
          <CardBody>
            <h3 className="mb-3 text-base font-bold text-ink">มาร์จินเทียบช่องทาง</h3>
            <BarChartBox
              data={channels.slice().sort((a, b) => b.margin - a.margin).map((c) => ({ name: c.name, margin: c.margin }))}
              xKey="name"
              layout="vertical"
              height={420}
              bars={[{ key: "margin", name: "Margin (1-10)", color: "#22C55E" }]}
            />
          </CardBody>
        </Card>
      </div>

      <DataTable
        columns={[
          { key: "name", label: "ช่องทาง" },
          { key: "group", label: "กลุ่ม" },
          { key: "access", label: "เข้าถึง" },
          { key: "trust", label: "เชื่อถือ" },
          { key: "margin", label: "มาร์จิน" },
          { key: "volume", label: "ปริมาณ" },
          { key: "difficulty", label: "ความยาก" },
          { key: "credit", label: "เครดิต" },
          { key: "priority", label: "Phase" },
        ]}
        rows={scored.map((c) => ({
          name: <span className="font-medium">{c.name}</span>,
          group: <Badge tone={c.group === "Online" ? "brand" : c.group === "B2B" ? "warn" : "leaf"}>{c.group}</Badge>,
          access: <ScoreMini v={c.access} />,
          trust: <ScoreMini v={c.trust} />,
          margin: <ScoreMini v={c.margin} />,
          volume: <ScoreMini v={c.volume} />,
          difficulty: <ScoreMini v={c.difficulty} invert />,
          credit: <span className="text-xs">{c.creditTerm}</span>,
          priority: <Badge tone={c.priority === 1 ? "leaf" : c.priority === 2 ? "brand" : "neutral"}>Phase {c.priority}</Badge>,
        }))}
      />

      <div>
        <h3 className="mb-3 text-base font-bold text-ink">แผน Rollout แบ่งเฟส</h3>
        <div className="grid gap-3 md:grid-cols-3">
          {rolloutPhases.map((p, i) => (
            <Card key={p.phase} className="avoid-break">
              <CardBody>
                <Badge tone={i === 0 ? "leaf" : i === 1 ? "brand" : "neutral"}>{p.phase}</Badge>
                <ul className="mt-3 space-y-1.5 text-sm text-ink">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="text-brand-500">•</span> {it}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 rounded-lg bg-slate-50 p-2 text-xs text-ink-soft">🎯 {p.goal}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <InsightCard>
          ช่องทางที่ Margin สูง (D2C/LINE) มักมี Volume ต่ำ ส่วนช่องทาง Volume สูง (Distributor/รพ.)
          มี Margin ต่ำและเครดิตยาว — <b>ต้องผสมช่องทางให้สมดุลทั้ง Margin และ Cashflow</b>
        </InsightCard>
        <RecommendationBox>
          เริ่ม Phase 1 ที่ <b>Online Marketplace + Subscription</b> เพื่อ Validate และเก็บ Margin เอง
          แล้วค่อยขยายสู่ร้านยา/Nursing home (Phase 2) และ Distributor/Modern trade (Phase 3)
        </RecommendationBox>
      </div>
    </div>
  );
}

function ScoreMini({ v, invert }: { v: number; invert?: boolean }) {
  const good = invert ? v <= 4 : v >= 7;
  const mid = v >= 5 && v <= 6;
  return (
    <span className={`inline-block w-7 rounded-md px-1 py-0.5 text-center text-xs font-semibold ${good ? "bg-leaf-50 text-leaf-600" : mid ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-500"}`}>
      {v}
    </span>
  );
}

function MiniCard({ label, value, icon: Icon, tone }: { label: string; value: string; icon: any; tone: "brand" | "leaf" }) {
  return (
    <Card className="avoid-break">
      <CardBody className="p-4">
        <span className={`inline-flex rounded-xl p-2 ${tone === "leaf" ? "bg-leaf-50 text-leaf-600" : "bg-brand-50 text-brand-600"}`}>
          <Icon className="h-4 w-4" />
        </span>
        <p className="mt-2 text-[11px] font-semibold text-ink-soft">{label}</p>
        <p className="mt-0.5 text-sm font-bold text-ink">{value}</p>
      </CardBody>
    </Card>
  );
}
