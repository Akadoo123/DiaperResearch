"use client";

import { useState } from "react";
import { SidebarContent } from "./Sidebar";
import { Badge } from "@/components/ui/Badges";
import { Menu, X, MapPin, Database, Languages, Download, Share2 } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);

  function handleExport() {
    window.print();
  }

  function handleShare() {
    const url = window.location.origin;
    if (navigator.share) {
      navigator.share({ title: "Thailand Adult Diaper Market Dashboard", url });
    } else {
      navigator.clipboard?.writeText(url);
      alert("คัดลอกลิงก์ Dashboard แล้ว: " + url);
    }
  }

  return (
    <>
      <header className="no-print sticky top-0 z-30 border-b border-line bg-white/80 backdrop-blur">
        <div className="flex items-center justify-between gap-3 px-4 py-3 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="rounded-lg p-2 text-ink-soft hover:bg-slate-100 lg:hidden"
              aria-label="เปิดเมนู"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-ink">
                ตลาดผ้าอ้อมผู้ใหญ่และสินค้าดูแลผู้ป่วยติดเตียง
              </p>
              <p className="flex items-center gap-1 text-[11px] text-ink-soft">
                <MapPin className="h-3 w-3" /> ตลาดเป้าหมาย: ประเทศไทย
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge tone="warn" className="hidden md:inline-flex">
              <Database className="h-3 w-3" /> Demo Data
            </Badge>
            <div className="hidden items-center rounded-full border border-line bg-white text-xs md:flex">
              <button className="rounded-full bg-brand-gradient px-2.5 py-1 font-medium text-white">
                TH
              </button>
              <button className="px-2.5 py-1 font-medium text-ink-soft">EN</button>
            </div>
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink hover:bg-slate-50"
            >
              <Download className="h-3.5 w-3.5" /> Export Summary
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-3 py-1.5 text-xs font-medium text-white shadow-soft"
            >
              <Share2 className="h-3.5 w-3.5" /> Share Dashboard
            </button>
          </div>
        </div>
        {/* Demo data note */}
        <div className="border-t border-amber-100 bg-amber-50/70 px-4 py-1.5 text-center text-[11px] text-amber-700 lg:px-6">
          ข้อมูลชุดนี้เป็นข้อมูลตัวอย่างเพื่อใช้ดูโครงสร้าง Dashboard — ต้อง Validate
          ด้วยข้อมูลจริงก่อนตัดสินใจลงทุน
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="no-print fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-soft-lg">
            <div className="flex justify-end p-2">
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-ink-soft hover:bg-slate-100"
                aria-label="ปิดเมนู"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

export { Languages };
