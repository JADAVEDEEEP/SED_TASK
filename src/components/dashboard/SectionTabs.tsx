"use client";

import type { SectionId } from "@/components/layout/Sidebar";

const sections: { id: SectionId; label: string }[] = [
  { id: "feed", label: "Feed" },
  { id: "trending", label: "Trending" },
  { id: "favorites", label: "Favorites" },
  { id: "settings", label: "Settings" },
];

export function SectionTabs({
  activeSection,
  onSectionChange,
}: {
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto lg:hidden">
      {sections.map((section) => (
        <button
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            activeSection === section.id
              ? "bg-teal-700 text-white"
              : "bg-white text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300"
          }`}
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          type="button"
        >
          {section.label}
        </button>
      ))}
    </div>
  );
}
