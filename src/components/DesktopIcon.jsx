import { Folder, FileText } from "lucide-react";

export default function DesktopIcon({
  id,
  label,
  kind = "folder",
  onOpen,
  className = "",
}) {
  return (
    <button
      onClick={() => onOpen(id)}
      className={`group flex w-28 flex-col items-center gap-2 rounded-2xl p-2 text-center transition hover:bg-white/40 ${className}`}
    >
      <div className="flex h-20 w-24 items-center justify-center rounded-2xl">
        {kind === "folder" ? (
          <Folder className="h-16 w-16 fill-sky-300 text-sky-500 drop-shadow-md" />
        ) : (
          <FileText className="h-14 w-14 fill-white text-zinc-700 drop-shadow-md" />
        )}
      </div>

      <span className="rounded-md px-2 py-0.5 text-sm font-medium text-zinc-800 group-hover:bg-sky-500 group-hover:text-white">
        {label}
      </span>
    </button>
  );
}
