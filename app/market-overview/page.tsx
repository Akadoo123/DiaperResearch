"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { MetricCard } from "@/components/ui/MetricCard";
import { Card, CardBody } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/Table";
import { InsightCard, RecommendationBox, ChartNote } from "@/components/ui/Boxes";
import { DataConfidenceBadge } from "@/components/ui/Badges";
import { LineChartBox } from "@/components/charts/Charts";
import { demandDrivers, marketTrend, macroKpis } from "@/data/marketOverview";
import { Users, TrendingUp, Activity, BedDouble } from "lucide-react";

export default function MarketOverview() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="ภาพรวมตลาด (Market Overview)"
        description="วิเคราะห์ปัจจัยขับเคลื่อนความต้องการระดับมหภาค (Macro Demand Drivers) ที่ทำให้ตลาดสินค้าดูแลผู้สูงอายุและผู้ป่วยติดเตียงเติบโต"
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="ประชากรผู้สูงอายุ" value={macroKpis.elderlyPopulation} unit="ล้านคน" icon={Users} tone="brand" dataType="estimate" />
        <MetricCard label="สัดส่วนผู้สูงอายุ" value={macroKpis.elderlyShare} unit="% ของประชากร" icon={Activity} tone="brand" dataType="estimate" />
        <MetricCard label="การเติบโตตลาด (CAGR)" value={macroKpis.cagr} unit="%/ปี" icon={TrendingUp} tone="leaf" dataType="assumption" />
        <MetricCard label="ผู้ป่วยติดเตียง (ประมาณ)" value={macroKpis.bedridden} unit="ล้านคน" icon={BedDouble} tone="warn" dataType="needs_validation" />
      </div>

      <Card className="avoid-break">
        <CardBody>
          <h3 className="mb-1 text-base font-bold text-ink">แนวโน้มขนาดตลาดประมาณการ 7 ปี</h3>
          <p className="mb-3 text-xs text-ink-soft">หน่วย: ล้านบาท/ปี (ข้อมูลประมาณการ)</p>
          <LineChartBox data={marketTrend} xKey="year" lines={[{ key: "value", name: "มูลค่าตลาด (ล้านบาท)", color: "#6366F1" }]} />
          <ChartNote>
            กราฟนี้แสดงแนวโน้มการเติบโตของตลาดตามโครงสร้างประชากรสูงวัย — ตลาดโตต่อเนื่องเชิงโครงสร้าง
            แต่ <b>การโตของตลาดไม่ได้แปลว่ากำไรง่าย</b> เพราะการแข่งขันด้านราคายังสูง
            จึงต้องเลือกกลุ่มและจุดต่างให้ชัด
          </ChartNote>
        </CardBody>
      </Card>

      <div>
        <h3 className="mb-3 text-base font-bold text-ink">ปัจจัยขับเคลื่อนความต้องการ (Demand Drivers)</h3>
        <DataTable
          columns={[
            { key: "driver", label: "ปัจจัยขับเคลื่อนตลาด" },
            { key: "why", label: "ทำไมสำคัญ" },
            { key: "impact", label: "ผลต่อความต้องการผ้าอ้อม" },
            { key: "dataNeeded", label: "ข้อมูลที่ต้องใช้" },
            { key: "confidence", label: "Confidence" },
          ]}
          rows={demandDrivers.map((d) => ({
            driver: <span className="font-medium">{d.driver}</span>,
            why: d.why,
            impact: d.impact,
            dataNeeded: <span className="text-xs text-ink-soft">{d.dataNeeded}</span>,
            confidence: <DataConfidenceBadge type={d.dataType} />,
          }))}
          caption="ข้อมูลตัวอย่าง — ต้อง Validate กับแหล่งข้อมูลภาครัฐและรายงานวิจัยตลาดจริง"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <InsightCard>
          ตลาดเติบโตเชิงโครงสร้างจาก <b>สังคมสูงวัย + ครอบครัวเล็กลง + ขาดแคลนผู้ดูแล</b>{" "}
          ทำให้ความต้องการสินค้าที่ "ลดภาระการดูแล" เพิ่มขึ้นต่อเนื่อง
        </InsightCard>
        <RecommendationBox>
          อย่าใช้ "ตลาดโต" เป็นเหตุผลเดียวในการเข้า — ควรเก็บข้อมูลจริงเรื่องจำนวนผู้ป่วยติดเตียง
          และปริมาณการใช้ เพื่อประเมินขนาดตลาดที่เข้าถึงได้จริง (SAM/SOM)
        </RecommendationBox>
      </div>
    </div>
  );
}
