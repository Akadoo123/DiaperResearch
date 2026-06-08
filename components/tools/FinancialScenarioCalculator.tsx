"use client";

import { useState } from "react";
import { Card, CardBody } from "@/components/ui/Card";
import { ChartNote } from "@/components/ui/Boxes";
import {
  grossMargin,
  contributionMargin,
  breakEvenUnits,
  monthlyRevenue,
} from "@/lib/formulas";
import { fmt, fmtBaht, fmtPct } from "@/lib/utils";
import { BarChartBox } from "@/components/charts/Charts";

function Field({
  label,
  value,
  onChange,
  step = 0.1,
  unit,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  unit: string;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-ink-soft">{label}</label>
      <div className="mt-1 flex items-center rounded-xl border border-line bg-white px-3 py-2">
        <input
          type="number"
          value={value}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-transparent text-sm font-semibold text-ink outline-none"
        />
        <span className="text-[11px] text-ink-soft">{unit}</span>
      </div>
    </div>
  );
}

export function FinancialScenarioCalculator() {
  const [price, setPrice] = useState(10);
  const [cogs, setCogs] = useState(4.5);
  const [channelFee, setChannelFee] = useState(1.0);
  const [logistics, setLogistics] = useState(1.2);
  const [ads, setAds] = useState(0.9);
  const [promo, setPromo] = useState(0.6);
  const [units, setUnits] = useState(55000);
  const [fixedCost, setFixedCost] = useState(350000);

  const gm = grossMargin(price, cogs);
  const cm = contributionMargin(price, cogs, channelFee, logistics, promo, ads);
  const revenue = monthlyRevenue(units, price);
  const beUnits = breakEvenUnits(fixedCost, cm);
  const netProfit = cm * units - fixedCost;

  const cmpData = [
    { name: "ราคาขาย", v: price },
    { name: "COGS", v: cogs },
    { name: "ค่าช่องทาง", v: channelFee },
    { name: "โลจิสติกส์", v: logistics },
    { name: "โฆษณา", v: ads },
    { name: "โปรโมชัน", v: promo },
    { name: "Contribution", v: Number(cm.toFixed(2)) },
  ];

  return (
    <Card className="avoid-break">
      <CardBody>
        <h3 className="mb-1 text-base font-bold text-ink">
          เครื่องคำนวณ Scenario การเงิน (Financial Scenario Calculator)
        </h3>
        <p className="mb-4 text-xs text-ink-soft">
          ปรับตัวเลขเพื่อดู Gross Margin, Contribution Margin, กำไรสุทธิ และจุดคุ้มทุน
        </p>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-3">
            <Field label="ราคาขาย/ชิ้น" value={price} onChange={setPrice} unit="บาท" />
            <Field label="COGS/ชิ้น" value={cogs} onChange={setCogs} unit="บาท" />
            <Field label="ค่าธรรมเนียมช่องทาง/ชิ้น" value={channelFee} onChange={setChannelFee} unit="บาท" />
            <Field label="โลจิสติกส์/ชิ้น" value={logistics} onChange={setLogistics} unit="บาท" />
            <Field label="ค่าโฆษณา/ชิ้น" value={ads} onChange={setAds} unit="บาท" />
            <Field label="โปรโมชัน/ชิ้น" value={promo} onChange={setPromo} unit="บาท" />
            <Field label="ยอดขาย/เดือน" value={units} onChange={setUnits} step={1000} unit="ชิ้น" />
            <Field label="ต้นทุนคงที่/เดือน" value={fixedCost} onChange={setFixedCost} step={10000} unit="บาท" />
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Result label="Gross Margin" value={fmtPct(gm * 100)} tone={gm >= 0.45 ? "leaf" : "warn"} />
              <Result label="Contribution/ชิ้น" value={`${cm.toFixed(2)} บาท`} tone={cm > 0 ? "leaf" : "danger"} />
              <Result label="รายได้/เดือน" value={fmtBaht(revenue)} />
              <Result label="กำไรสุทธิ/เดือน" value={fmtBaht(netProfit)} tone={netProfit > 0 ? "leaf" : "danger"} />
              <Result label="จุดคุ้มทุน" value={isFinite(beUnits) ? `${fmt(beUnits)} ชิ้น/เดือน` : "ขาดทุนทุกหน่วย"} tone={isFinite(beUnits) ? "brand" : "danger"} />
              <Result label="สถานะ" value={netProfit > 0 ? "มีกำไร ✓" : "ยังขาดทุน"} tone={netProfit > 0 ? "leaf" : "danger"} />
            </div>
            <BarChartBox data={cmpData} xKey="name" bars={[{ key: "v", name: "บาท/ชิ้น", color: "#6366F1" }]} height={200} />
            <ChartNote>
              กราฟ waterfall นี้แสดงว่าจากราคาขาย เหลือเป็น Contribution Margin เท่าไรหลังหักต้นทุนทุกตัว —
              ถ้า Contribution ติดลบ ยิ่งขายยิ่งขาดทุน
            </ChartNote>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function Result({ label, value, tone = "brand" }: { label: string; value: string; tone?: "brand" | "leaf" | "warn" | "danger" }) {
  const map = {
    brand: "bg-brand-50 text-brand-700",
    leaf: "bg-leaf-50 text-leaf-600",
    warn: "bg-amber-50 text-amber-600",
    danger: "bg-red-50 text-red-500",
  };
  return (
    <div className={`rounded-xl p-3 ${map[tone]}`}>
      <p className="text-[11px] opacity-80">{label}</p>
      <p className="mt-0.5 text-sm font-bold">{value}</p>
    </div>
  );
}
