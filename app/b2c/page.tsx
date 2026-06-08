"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { MetricCard } from "@/components/ui/MetricCard";
import { Card, CardBody } from "@/components/ui/Card";
import { InsightCard, RecommendationBox, ChartNote } from "@/components/ui/Boxes";
import { Badge } from "@/components/ui/Badges";
import { BarChartBox } from "@/components/charts/Charts";
import {
  b2cPersonas,
  b2cJourney,
  emotionalAngles,
  marketingMessages,
  subscriptionModel,
} from "@/data/b2cOpportunity";
import { repeatPurchaseValue } from "@/lib/formulas";
import { fmtBaht } from "@/lib/utils";
import { Heart, Repeat, Wallet, ChevronRight } from "lucide-react";

export default function B2CPage() {
  const ltv = repeatPurchaseValue(subscriptionModel.monthlyValue, subscriptionModel.retentionMonths);
  const ranked = [...b2cPersonas].sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-6">
      <PageHeader
        title="โอกาส B2C (B2C Opportunity)"
        description="วิเคราะห์ผู้บริโภค — แรงจูงใจทางอารมณ์ ความต้องการเชิงฟังก์ชัน พฤติกรรมซื้อซ้ำ และโอกาส Subscription"
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="มูลค่าซื้อ/เดือน/ลูกค้า" value={fmtBaht(subscriptionModel.monthlyValue)} icon={Wallet} tone="brand" dataType="assumption" />
        <MetricCard label="ระยะเวลาอยู่กับเรา" value={subscriptionModel.retentionMonths} unit="เดือน" icon={Repeat} tone="brand" dataType="assumption" />
        <MetricCard label="LTV/ลูกค้า (ประมาณ)" value={fmtBaht(ltv)} icon={Heart} tone="leaf" dataType="assumption" />
        <MetricCard label="กลุ่มที่ Subscription สูง" value="Caregiver" sub="+ ลูกหลานซื้อให้พ่อแม่" icon={Repeat} tone="leaf" />
      </div>

      <Card className="avoid-break">
        <CardBody>
          <h3 className="mb-1 text-base font-bold text-ink">อันดับกลุ่ม B2C ตามคะแนนโอกาส</h3>
          <BarChartBox
            data={ranked.map((p) => ({ name: p.name, score: p.score }))}
            xKey="name"
            layout="vertical"
            height={300}
            bars={[{ key: "score", name: "Opportunity Score", color: "#22C55E" }]}
          />
          <ChartNote>
            กลุ่มที่คะแนนสูง (ลูกหลานซื้อให้พ่อแม่, Family caregiver) มีศักยภาพ Subscription สูง
            และเข้าถึงผ่านออนไลน์ได้ — เป็นกลุ่มเป้าหมายแรกที่คุ้มค่าในการลงทุนการตลาด
          </ChartNote>
        </CardBody>
      </Card>

      <div>
        <h3 className="mb-3 text-base font-bold text-ink">B2C Persona Cards</h3>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {ranked.map((p) => (
            <Card key={p.name} className="avoid-break">
              <CardBody className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-ink">{p.name}</p>
                  <Badge tone={p.score >= 8 ? "leaf" : "brand"}>{p.score}/10</Badge>
                </div>
                <div className="mt-2 space-y-1 text-xs text-ink-soft">
                  <p>❤️ อารมณ์: {p.emotional}</p>
                  <p>⚙️ ฟังก์ชัน: {p.functional}</p>
                  <p>⚠️ กังวล: {p.concern}</p>
                  <p>🛒 ช่องทาง: {p.channel}</p>
                  <p>🔁 ความถี่: {p.frequency}</p>
                  <p>📦 Subscription: <span className="font-semibold text-ink">{p.subscription}</span></p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      <Card className="avoid-break">
        <CardBody>
          <h3 className="mb-3 text-base font-bold text-ink">B2C Buying Journey</h3>
          <div className="flex flex-col gap-2 md:flex-row">
            {b2cJourney.map((b, i) => (
              <div key={b.stage} className="flex flex-1 items-center gap-2">
                <div className="flex-1 rounded-xl bg-brand-gradient-soft p-3">
                  <p className="text-xs font-bold text-brand-700">{b.stage}</p>
                  <p className="mt-1 text-[11px] text-ink-soft">{b.desc}</p>
                </div>
                {i < b2cJourney.length - 1 && <ChevronRight className="hidden h-4 w-4 text-ink-soft md:block" />}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="avoid-break">
          <CardBody>
            <h3 className="mb-3 text-sm font-bold text-ink">มุมการสื่อสารทางอารมณ์ (Emotional Angles)</h3>
            <div className="flex flex-wrap gap-2">
              {emotionalAngles.map((a) => (
                <span key={a} className="rounded-full bg-leaf-50 px-3 py-1 text-xs font-medium text-leaf-600">{a}</span>
              ))}
            </div>
          </CardBody>
        </Card>
        <Card className="avoid-break">
          <CardBody>
            <h3 className="mb-3 text-sm font-bold text-ink">ตัวอย่างข้อความการตลาด</h3>
            <ul className="space-y-2 text-sm text-ink">
              {marketingMessages.map((m) => (
                <li key={m} className="rounded-lg bg-slate-50 p-2">{m}</li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>

      <Card className="avoid-break border-brand-100 bg-brand-gradient-soft">
        <CardBody>
          <h3 className="text-sm font-bold text-brand-700">โมเดล Subscription / ซื้อซ้ำ</h3>
          <p className="mt-2 text-sm text-ink">
            ถ้าลูกค้าซื้อ <b>{fmtBaht(subscriptionModel.monthlyValue)}/เดือน</b> และอยู่กับเรา{" "}
            <b>{subscriptionModel.retentionMonths} เดือน</b> → LTV ≈ <b>{fmtBaht(ltv)}/ลูกค้า</b> —
            ทำให้ลงทุนหาลูกค้า (CAC) ได้สูงขึ้นและคุม Cashflow ได้ดีกว่าการขายครั้งเดียว
          </p>
        </CardBody>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <InsightCard>
          B2C ในตลาดนี้ขับเคลื่อนด้วย <b>อารมณ์ (ความกตัญญู/ลดภาระ) + ฟังก์ชัน (กันรั่ว/ลดผื่น)</b> —
          การสื่อสารต้องจับทั้งสองด้าน ไม่ใช่แค่ขายราคา
        </InsightCard>
        <RecommendationBox>
          สร้างโมเดล <b>Subscription รายเดือน</b> ตั้งแต่ต้น เพื่อล็อกการซื้อซ้ำ ลดการพึ่งโฆษณา
          และเพิ่ม LTV — เริ่มทดสอบกับกลุ่ม Caregiver/ลูกหลานซื้อให้พ่อแม่
        </RecommendationBox>
      </div>
    </div>
  );
}
