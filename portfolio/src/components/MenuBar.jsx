export default function MenuBar() {
    return (
      <div className="fixed left-0 right-0 top-0 z-[999] flex h-9 items-center justify-between bg-white/55 px-4 text-sm font-medium text-zinc-900 shadow-sm backdrop-blur-xl">
        <div className="flex items-center gap-5">
          <span className="text-lg"></span>
          <span className="font-bold">Portfolio</span>
          <span>Projets</span>
          <span>Parcours</span>
          <span>Contact</span>
        </div>
  
        <span>© 2026</span>
      </div>
    );
  }
