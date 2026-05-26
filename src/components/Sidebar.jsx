import { tools } from "../data/tools";

export default function Sidebar({ openWindow }) {
  return (
    <aside className="fixed right-5 top-20 z-20 hidden w-64 rounded-[28px] border border-white/40 bg-white/35 p-4 shadow-2xl backdrop-blur-2xl lg:block">
      <h2 className="mb-4 text-lg font-bold text-zinc-900">
        Les outils que j’utilise
      </h2>

      <div className="grid grid-cols-2 gap-2">
        {tools.slice(0, 6).map((tool) => (
          <div
            key={tool}
            className="rounded-2xl bg-white/55 px-3 py-2 text-sm font-semibold text-zinc-700 shadow-sm"
          >
            {tool}
          </div>
        ))}
      </div>

      <button
        onClick={() => openWindow("tools")}
        className="mt-4 w-full rounded-2xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02]"
      >
        Voir tous les outils
      </button>
    </aside>
  );
}
