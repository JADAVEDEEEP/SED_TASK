import { FaFire, FaHeart, FaLayerGroup, FaSyncAlt } from "react-icons/fa";

const statIcon = {
  feed: FaLayerGroup,
  trending: FaFire,
  favorites: FaHeart,
  status: FaSyncAlt,
};

export function StatStrip({
  total,
  trending,
  favorites,
  status,
}: {
  total: number;
  trending: number;
  favorites: number;
  status: string;
}) {
  const stats = [
    { id: "feed", label: "Unified feed", value: total },
    { id: "trending", label: "Trending", value: trending },
    { id: "favorites", label: "Favorites", value: favorites },
    { id: "status", label: "Sync status", value: status },
  ] as const;

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = statIcon[stat.id];

        return (
          <div
            className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
            key={stat.id}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {stat.label}
              </p>
              <Icon className="text-teal-700 dark:text-teal-300" />
            </div>
            <p className="mt-3 text-2xl font-bold text-zinc-950 dark:text-white">
              {stat.value}
            </p>
          </div>
        );
      })}
    </section>
  );
}
