"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { InsightCard, RecommendationBox } from "@/components/ui/Boxes";
import { Badge } from "@/components/ui/Badges";
import { fieldChecklist } from "@/data/fieldResearch";
import { cn } from "@/lib/utils";
import {
  Tag,
  Search,
  FlaskConical,
  Users,
  Building2,
  Truck,
  CheckCircle2,
  Circle,
} from "lucide-react";

const icons: any = { tag: Tag, search: Search, flask: FlaskConical, users: Users, building: Building2, truck: Truck };

export default function FieldResearchPage() {
  const allItems = fieldChecklist.flatMap((g) => g.items);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const doneCount = Object.values(done).filter(Boolean).length;
  const pct = Math.round((doneCount / allItems.length) * 100);

  function toggle(item: string) {
    setDone((d) => ({ ...d, [item]: !d[item] }));
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="เช็กลิสต์เก็บข้อมูลภาคสนาม (Field Research Checklist)"
        description="เช็กลิสต์ที่ทีมงานใช้ได้จริง — เช็กราคาคู่แข่ง ขุดรีวิว ทดสอบสินค้า สัมภาษณ์ผู้ดูแล/B2B และเช็กซัพพลายเออร์"
      >
        <div className="text-right">
          <p className="text-2xl font-bold text-brand-600">{pct}%</p>
          <p className="text-xs text-ink-soft">{doneCount}/{allItems.length} รายการ</p>
        </div>
      </PageHeader>

      <Card className="avoid-break">
        <CardBody className="py-3">
          <div className="h-2.5 w-full rounded-full bg-slate-100">
            <div className="h-2.5 rounded-full bg-brand-gradient transition-all" style={{ width: `${pct}%` }} />
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {fieldChecklist.map((group) => {
          const Icon = icons[group.icon];
          const groupDone = group.items.filter((i) => done[i]).length;
          return (
            <Card key={group.title} className="avoid-break">
              <CardBody>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-ink">
                    <span className="rounded-xl bg-brand-50 p-2 text-brand-600">
                      <Icon className="h-4 w-4" />
                    </span>
                    {group.title}
                  </h3>
                  <Badge tone={groupDone === group.items.length ? "leaf" : "neutral"}>
                    {groupDone}/{group.items.length}
                  </Badge>
                </div>
                <ul className="space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => toggle(item)}
                        className={cn(
                          "flex w-full items-start gap-2 rounded-lg p-2 text-left text-sm transition hover:bg-slate-50",
                          done[item] && "text-ink-soft line-through"
                        )}
                      >
                        {done[item] ? (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-leaf-500" />
                        ) : (
                          <Circle className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
                        )}
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <InsightCard>
          เช็กลิสต์นี้คือ <b>หัวใจของ Validate phase</b> — ข้อมูลที่ได้จะเปลี่ยนสมมติฐานในไฟล์ /data
          ให้กลายเป็นข้อมูลจริงที่ใช้ตัดสินใจลงทุนได้
        </InsightCard>
        <RecommendationBox>
          มอบหมายแต่ละหมวดให้ผู้รับผิดชอบ และตั้งเป้าทำให้ครบภายใน 90 วัน — เริ่มจาก
          <b> Price Check + Caregiver Interview</b> เพราะให้ insight เร็วและต้นทุนต่ำที่สุด
        </RecommendationBox>
      </div>
    </div>
  );
}
