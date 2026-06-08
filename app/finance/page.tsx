"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { MetricCard } from "@/components/ui/MetricCard";
import { Card, CardBody } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/Table";
import { InsightCard, RecommendationBox, ChartNote } from "@/components/ui/Boxes";
import { Badge } from "@/components/ui/Badges";
import { Tabs } from "@/components/ui/Tabs";
import { BarChartBox } from "@/components/charts/Charts";
import { FinancialScenarioCalculator } from "@/components/tools/FinancialScenarioCalculator";
import {
  unitEconomicsDefaults as ue,
  channelMargin,
  finScenarios,
  financeInsights,
  initialCapital,
} from "@/data/finance";
import {
  grossMargin,
  contributionMargin,
  breakEvenUnits,
  inventoryCash,
} from "@/lib/formulas";
import { fmt, fmtBaht, fmtPct } from "@/lib/utils";
import { Wallet, Percent, TrendingUp, Package, Coins, Calendar } from "lucide-react";

export default function FinancePage() {
  const gm = grossMargin(ue.sellingPrice, ue.cogs + ue.packaging);
  const cm = contributionMargin(ue.sellingPrice, ue.cogs + ue.packaging, ue.marketplaceFee + ue.paymentFee, ue.shipping, ue.promotion, ue.advertising);
  const totalCapital = initialCapital.reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="ความเป็นไปได้ทางการเงิน (Financial Feasibility)"
        description="Unit Economics, มาร์จินตามช่องทาง, Scenario การเงิน, จุดคุ้มทุน และเงินทุนที่ต้องใช้"
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
        <MetricCard label="Gross Margin" value={fmtPct(gm * 100, 0)} icon={Percent} tone="leaf" dataType="estimate" />
        <MetricCard label="Contribution/ชิ้น" value={`${cm.toFixed(1)}฿`} icon={Coins} tone="brand" dataType="estimate" />
        <MetricCard label="ราคาขาย/ชิ้น" value={`${ue.sellingPrice}฿`} icon={Wallet} tone="brand" dataType="assumption" />
        <MetricCard label="COGS/ชิ้น" value={`${ue.cogs}฿`} icon={Package} tone="neutral" dataType="assumption" />
        <MetricCard label="เงินลงทุนเริ่มต้น" value={fmtBaht(totalCapital)} icon={Coins} tone="warn" dataType="assumption" />
        <MetricCard label="Break-even (Base)" value="~7" unit="เดือน" icon={Calendar} tone="warn" dataType="assumption" />
      </div>

      <Tabs
        tabs={[
          {
            label: "Unit Economics",
            content: (
              <Card>
                <CardBody>
                  <h3 className="mb-3 text-base font-bold text-ink">โครงสร้างต้นทุนต่อชิ้น (Base Case)</h3>
                  <BarChartBox
                    data={[
                      { name: "ราคาขาย", v: ue.sellingPrice },
                      { name: "COGS", v: ue.cogs },
                      { name: "บรรจุภัณฑ์", v: ue.packaging },
                      { name: "ขนส่ง", v: ue.shipping },
                      { name: "ค่าช่องทาง", v: ue.marketplaceFee },
                      { name: "ค่าธรรมเนียมจ่าย", v: ue.paymentFee },
                      { name: "โปรโมชัน", v: ue.promotion },
                      { name: "โฆษณา", v: ue.advertising },
                      { name: "Contribution", v: Number(cm.toFixed(2)) },
                    ]}
                    xKey="name"
                    height={280}
                    bars={[{ key: "v", name: "บาท/ชิ้น", color: "#6366F1" }]}
                  />
                  <ChartNote>
                    จากราคาขาย {ue.sellingPrice} บาท เหลือ Contribution Margin ~{cm.toFixed(1)} บาท/ชิ้น
                    หลังหักทุกต้นทุน — ต้องบริหารค่าโฆษณาและโลจิสติกส์ไม่ให้กิน margin จนติดลบ
                  </ChartNote>
                </CardBody>
              </Card>
            ),
          },
          {
            label: "มาร์จินตามช่องทาง",
            content: (
              <Card>
                <CardBody>
                  <BarChartBox
                    data={channelMargin}
                    xKey="channel"
                    layout="vertical"
                    height={300}
                    bars={[
                      { key: "gm", name: "Gross Margin %", color: "#22C55E" },
                      { key: "cm", name: "Contribution %", color: "#6366F1" },
                    ]}
                  />
                  <ChartNote>
                    D2C Online ให้มาร์จินสูงสุด ขณะที่ Modern Trade/โรงพยาบาลต่ำสุด —
                    ใช้ตัดสินใจว่าจะดันยอดผ่านช่องทางไหนเพื่อรักษากำไรรวม
                  </ChartNote>
                </CardBody>
              </Card>
            ),
          },
          {
            label: "Best / Base / Worst",
            content: (
              <DataTable
                columns={[
                  { key: "name", label: "Scenario" },
                  { key: "units", label: "ยอด/เดือน" },
                  { key: "asp", label: "ราคาเฉลี่ย" },
                  { key: "rev", label: "รายได้/เดือน" },
                  { key: "gp", label: "กำไรขั้นต้น" },
                  { key: "net", label: "กำไรสุทธิ" },
                  { key: "inv", label: "เงินจมสต๊อก" },
                  { key: "be", label: "คุ้มทุน" },
                ]}
                rows={finScenarios.map((s) => {
                  const rev = s.monthlyUnits * s.asp;
                  const gp = (s.asp - s.cogs) * s.monthlyUnits;
                  const cmUnit = s.asp - s.cogs - 2.5;
                  const net = cmUnit * s.monthlyUnits - s.marketingCost - s.opCost;
                  const inv = inventoryCash(s.monthlyUnits, s.cogs, s.inventoryMonths);
                  const be = breakEvenUnits(s.marketingCost + s.opCost, cmUnit);
                  return {
                    name: <Badge tone={s.tone}>{s.name}</Badge>,
                    units: fmt(s.monthlyUnits),
                    asp: `${s.asp}฿`,
                    rev: fmtBaht(rev),
                    gp: fmtBaht(gp),
                    net: <span className={net > 0 ? "font-bold text-leaf-600" : "font-bold text-red-500"}>{fmtBaht(net)}</span>,
                    inv: fmtBaht(inv),
                    be: isFinite(be) ? `${fmt(be)} ชิ้น` : "-",
                  };
                })}
                caption="สมมติ contribution อื่นๆ ~2.5 บาท/ชิ้น — ตัวเลขตัวอย่าง ต้อง Validate"
              />
            ),
          },
          {
            label: "Break-even",
            content: (
              <Card>
                <CardBody>
                  <BarChartBox
                    data={finScenarios.map((s) => {
                      const cmUnit = s.asp - s.cogs - 2.5;
                      return { name: s.name, units: Math.round(breakEvenUnits(s.marketingCost + s.opCost, cmUnit)) };
                    })}
                    xKey="name"
                    height={240}
                    bars={[{ key: "units", name: "หน่วยคุ้มทุน/เดือน", color: "#F59E0B" }]}
                  />
                  <ChartNote>
                    จุดคุ้มทุน = ต้นทุนคงที่ ÷ Contribution Margin ต่อหน่วย — ยิ่งต้องขายมากเท่าไรจึงคุ้มทุน
                    ยิ่งเสี่ยง ถ้ายอดจริงต่ำกว่านี้จะขาดทุน
                  </ChartNote>
                </CardBody>
              </Card>
            ),
          },
          {
            label: "เงินทุนที่ต้องใช้",
            content: (
              <div className="space-y-3">
                <Card>
                  <CardBody>
                    <BarChartBox
                      data={initialCapital.map((i) => ({ name: i.item, v: Math.round(i.amount / 1000) }))}
                      xKey="name"
                      layout="vertical"
                      height={240}
                      bars={[{ key: "v", name: "พันบาท", color: "#6366F1" }]}
                    />
                    <ChartNote>
                      เงินลงทุนเริ่มต้นรวม ~{fmtBaht(totalCapital)} โดยส่วนใหญ่จมในสต๊อก (สินค้า bulky)
                      และการตลาด — Cashflow คือความเสี่ยงหลัก ควรเริ่มด้วย MOQ ต่ำ
                    </ChartNote>
                  </CardBody>
                </Card>
              </div>
            ),
          },
        ]}
      />

      <FinancialScenarioCalculator />

      <div className="grid gap-3 md:grid-cols-2">
        <InsightCard title="Key Finance Insight — สรุปการเงิน">
          <ul className="list-disc space-y-1 pl-4">
            <li>{financeInsights.gmNeeded}</li>
            <li>{financeInsights.mostProfitable}</li>
            <li>{financeInsights.volumeLowMargin}</li>
            <li><b>ความเสี่ยงหลัก:</b> {financeInsights.cashRisk}</li>
          </ul>
        </InsightCard>
        <RecommendationBox>
          {financeInsights.initialCapital} — เริ่มจากช่องทาง Margin สูง (D2C/Online) เพื่อพิสูจน์โมเดล
          ก่อนขยายช่องทาง Volume ที่กดมาร์จินและกินเงินทุนหมุนเวียน
        </RecommendationBox>
      </div>
    </div>
  );
}
