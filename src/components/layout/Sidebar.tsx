"use client";

import {
  FaChartLine,
  FaCog,
  FaFire,
  FaHeart,
  FaLayerGroup,
} from "react-icons/fa";

const navItems = [
  { id: "feed", label: "Feed", icon: FaLayerGroup },
  { id: "trending", label: "Trending", icon: FaFire },
  { id: "favorites", label: "Favorites", icon: FaHeart },
  { id: "settings", label: "Settings", icon: FaCog },
] as const;

export type SectionId = (typeof navItems)[number]["id"];

export function Sidebar({
  activeSection,
  onSectionChange,
}: {
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
}) {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950 lg:block">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-teal-700 text-white">
          <FaChartLine />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300">
            Pulse
          </p>
          <h1 className="text-lg font-bold text-zinc-950 dark:text-white">
            Dashboard
          </h1>
        </div>
      </div>

      <nav className="mt-8 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold transition ${
                isActive
                  ? "bg-teal-700 text-white"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
              }`}
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              type="button"
            >
              <Icon />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
