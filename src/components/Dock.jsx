import {
  Box,
  Monitor,
  PanelsTopLeft,
  ShipWheel,
  SquareKanban,
  Wrench,
} from "lucide-react";

import { tools } from "../data/tools";

const toolIcons = {
  "VS Code": Monitor,
  GitHub: PanelsTopLeft,
  Docker: ShipWheel,
  Trello: SquareKanban,
  Office: Box,
};

const githubUrl = "https://github.com/miraksl";
const inactiveTools = new Set(["Docker", "Trello"]);

export default function Dock({ openWindow }) {
  return (
    <div className="fixed bottom-5 left-1/2 z-[998] w-[calc(100vw-24px)] max-w-5xl -translate-x-1/2 overflow-x-auto rounded-[28px] border border-white/50 bg-white/45 p-3 shadow-2xl backdrop-blur-2xl">
      <div className="flex min-w-max items-center justify-center gap-3">
        {tools.map((tool) => {
          const ToolIcon = toolIcons[tool] ?? Wrench;

          return (
            <button
              key={tool}
              type="button"
              onClick={() => {
                if (tool === "VS Code") {
                  openWindow("tools");
                  return;
                }

                if (tool === "GitHub") {
                  window.open(githubUrl, "_blank", "noopener,noreferrer");
                  return;
                }

                if (inactiveTools.has(tool)) {
                  return;
                }

                if (tool === "Office") {
                  openWindow("office");
                  return;
                }

                openWindow("tools");
              }}
              title={tool}
              className="flex h-14 w-14 shrink-0 flex-col items-center justify-center gap-0.5 rounded-2xl bg-white/70 text-zinc-800 shadow-sm transition hover:-translate-y-2 hover:scale-110"
            >
              <ToolIcon className="h-5 w-5 text-zinc-900" />
              <span className="max-w-12 truncate text-[10px] font-bold leading-none">
                {tool}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
