"use client";

import { useState } from "react";
import { Card, CardBody } from "@/components/ui/Card";
import { ChartNote } from "@/components/ui/Boxes";
import { annualConsumption, annualMarketValue } from "@/lib/formulas";
import { fmt, fmtBaht } from "@/lib/utils";
import { topDownDefaults, tamSamSom } from "@/data/marketSize";
import { BarChartBox } from "@/components/charts/Charts";

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
  display,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
  display?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-ink-soft">{label}</label>
        <span className="text-sm font-bold text-brand-600">
          {display ?? fmt(value)} <span className="text-[11px] font-normal text-ink-soft">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full accent-brand-500"
      />
    </div>
  );
}

export function MarketSizeCalculator() {
  const [users, setUsers] = useState(2_400_000);
  const [perDay, setPerDay] = useState(topDownDefaults.diapersPerDay);
  const [price, setPrice] = useState(topDownDefaults.pricePerPiece);
  const [penetration, setPenetration] = useState(40); // %

  const samUsers = users * (penetration / 100);
  const consumption = annualConsumption(samUsers, perDay);
  const value = annualMarketValue(consumption, price);

  const chartData = [
    { name: "TAM", v: tamSamSom.tam },
    { name: "SAM", v: tamSamSom.sam },
    { name: "SOM (ของคุณ)", v: Math.round(value / 1_000_000) },
    { name: "Year 1", v: tamSamSom.year1 },
    { name: "Year 3", v: tamSamSom.year3 },
  ];

  return (
    <Card className="avoid-break">
      <CardBody>
        <h3 className="mb-1 text-base font-bold text-ink">เครื่องคำนวณขนาดตลาด (Market Size Calculator)</h3>
        <p className="mb-4 text-xs text-ink-soft">
          ปรับค่าเพื่อดูปริมาณการใช้ต่อปีและมูลค่าตลาดแบบ real-time
        </p>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-4">
            <Slider label="จำนวนผู้ใช้เป้าหมาย" value={users} onChange={setUsers} min={500000} max={4000000} step={100000} unit="คน" />
            <Slider label="ผ้าอ้อมต่อคนต่อวัน" value={perDay} onChange={setPerDay} min={1} max={6} step={0.5} unit="ชิ้น/วัน" />
            <Slider label="ราคาเฉลี่ยต่อชิ้น" value={price} onChange={setPrice} min={4} max={18} step={0.5} unit="บาท" />
            <Slider label="Penetration Rate" value={penetration} onChange={setPenetration} min={1} max={100} step={1} unit="%" />

            <div className="grid grid-cols-2 gap-2 pt-2">
              <Stat label="ผู้ใช้ที่เข้าถึง (SAM)" value={`${fmt(samUsers)} คน`} />
              <Stat label="ปริมาณใช้ต่อปี" value={`${fmt(consumption / 1_000_000, 1)} ล้านชิ้น`} />
              <Stat label="มูลค่าตลาด/ปี (SOM)" value={fmtBaht(value)} highlight />
              <Stat label="สูตร" value="ผู้ใช้ × ชิ้น/วัน × 365 × ราคา" small />
            </div>
          </div>

          <div>
            <BarChartBox data={chartData} xKey="name" bars={[{ key: "v", name: "ล้านบาท", color: "#6366F1" }]} height={300} />
            <ChartNote>
              กราฟนี้แยกให้เห็นว่า TAM (ตลาดรวม) ใหญ่แค่ไหน vs. SOM (ส่วนที่เข้าถึงได้จริงใน 1-3 ปี)
              — ช่วยให้ตั้งเป้าที่สมจริง ไม่หลงไปกับขนาดตลาดรวม
            </ChartNote>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function Stat({ label, value, highlight, small }: { label: string; value: string; highlight?: boolean; small?: boolean }) {
  return (
    <div className={`rounded-xl p-3 ${highlight ? "bg-brand-gradient text-white" : "bg-slate-50"}`}>
      <p className={`text-[11px] ${highlight ? "text-white/80" : "text-ink-soft"}`}>{label}</p>
      <p className={`mt-0.5 font-bold ${small ? "text-[11px]" : "text-sm"} ${highlight ? "text-white" : "text-ink"}`}>{value}</p>
    </div>
  );
}
