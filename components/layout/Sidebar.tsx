"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navGroups } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Activity } from "lucide-react";

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <span className="rounded-xl bg-brand-gradient p-2 text-white shadow-soft">
          <Activity className="h-5 w-5" />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-bold text-ink">ผ้าอ้อมผู้ใหญ่ไทย</p>
          <p className="text-[11px] text-ink-soft">Market Research Dashboard</p>
        </div>
      </div>

      <nav className="thin-scroll flex-1 overflow-y-auto px-3 pb-6">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-4">
            <p className="px-3 pb-1.5 pt-2 text-[10px] font-semibold uppercase tracking-wider text-ink-soft/70">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium transition",
                        active
                          ? "bg-brand-gradient text-white shadow-soft"
                          : "text-ink-soft hover:bg-slate-100 hover:text-ink"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="no-print fixed inset-y-0 left-0 hidden w-64 border-r border-line bg-white lg:block">
      <SidebarContent />
    </aside>
  );
}
