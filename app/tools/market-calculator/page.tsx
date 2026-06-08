"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { InsightCard } from "@/components/ui/Boxes";
import { MarketSizeCalculator } from "@/components/tools/MarketSizeCalculator";

export default function MarketCalculatorPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="เครื่องคำนวณขนาดตลาด (Market Size Calculator)"
        description="ปรับจำนวนผู้ใช้ ปริมาณการใช้ ราคาต่อชิ้น และ Penetration Rate เพื่อดูปริมาณและมูลค่าตลาดต่อปีแบบ real-time"
      />
      <MarketSizeCalculator />
      <InsightCard>
        เครื่องมือนี้ออกแบบให้ <b>เปลี่ยนสมมติฐานได้ง่าย</b> เมื่อได้ข้อมูลจริงจากการเก็บภาคสนาม
        เพียงปรับค่า ตัวเลข TAM/SAM/SOM และมูลค่าตลาดจะอัปเดตทันที — ใช้ทดสอบ Best/Base/Worst
        ก่อนตัดสินใจลงทุน
      </InsightCard>
    </div>
  );
}
