export function LoadingGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          className="h-80 animate-pulse rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
          key={index}
        >
          <div className="h-36 rounded-md bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-4 h-4 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-4 h-5 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-3 h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-2 h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
      ))}
    </div>
  );
}
