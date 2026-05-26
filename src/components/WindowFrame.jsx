import { motion } from "framer-motion";
import { X, Minus, Maximize2 } from "lucide-react";

export default function WindowFrame({
  win,
  children,
  icon: Icon,
  onClose,
  onFocus,
  onDragEnd,
}) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      onMouseDown={onFocus}
      onDragEnd={(_, info) => {
        onDragEnd(win.x + info.offset.x, win.y + info.offset.y);
      }}
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: 18 }}
      transition={{ type: "spring", stiffness: 280, damping: 25 }}
      className="fixed max-h-[calc(100vh-96px)] overflow-hidden rounded-lg border border-white/50 bg-zinc-50/85 shadow-2xl backdrop-blur-2xl"
      style={{
        left: win.x,
        top: win.y,
        zIndex: win.z,
        width: `min(${win.width}px, calc(100vw - 24px))`,
        height: `min(${win.height}px, calc(100vh - 96px))`,
      }}
    >
      <div className="flex h-11 cursor-grab items-center justify-between border-b border-zinc-200/70 bg-white/55 px-4 active:cursor-grabbing">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={`Fermer ${win.title}`}
            onClick={onClose}
            className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-red-950"
          >
            <X className="h-2.5 w-2.5 opacity-0 transition hover:opacity-70" />
          </button>
          <span className="h-3.5 w-3.5 rounded-full bg-yellow-400" />
          <span className="h-3.5 w-3.5 rounded-full bg-green-500" />
        </div>

        <div className="flex items-center gap-2 text-sm font-semibold text-zinc-700">
          {Icon && <Icon className="h-4 w-4" />}
          {win.title}
        </div>

        <div className="flex items-center gap-3 text-zinc-500">
          <Minus className="h-4 w-4" />
          <Maximize2 className="h-4 w-4" />
        </div>
      </div>

      <div className="h-[calc(100%-44px)] overflow-auto p-6">
        {children}
      </div>
    </motion.div>
  );
}
