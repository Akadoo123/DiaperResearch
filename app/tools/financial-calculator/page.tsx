"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { InsightCard } from "@/components/ui/Boxes";
import { FinancialScenarioCalculator } from "@/components/tools/FinancialScenarioCalculator";

export default function FinancialCalculatorPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="เครื่องคำนวณ Scenario การเงิน (Financial Scenario Calculator)"
        description="ปรับราคาขาย ต้นทุน ค่าช่องทาง โลจิสติกส์ โฆษณา และยอดขาย เพื่อดู Gross Margin, Contribution Margin, กำไรสุทธิ และจุดคุ้มทุน"
      />
      <FinancialScenarioCalculator />
      <InsightCard>
        ตัวเลขสำคัญที่ต้องจับตาคือ <b>Contribution Margin ต่อชิ้น</b> — ถ้าติดลบ ยิ่งขายยิ่งขาดทุน
        และ <b>จุดคุ้มทุน (Break-even)</b> ต้องอยู่ในระดับที่ยอดขายจริงทำได้ในเวลาที่เหมาะสม
      </InsightCard>
    </div>
  );
}
