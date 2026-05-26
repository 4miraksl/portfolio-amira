import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, FileText, X, Minus, Maximize2, Code2, Briefcase, GraduationCap, Wrench, Github, Linkedin, Mail } from "lucide-react";

const initialWindows = {
  projects: {
    id: "projects",
    title: "Projets",
    icon: Briefcase,
    isOpen: false,
    x: 130,
    y: 120,
    z: 1,
    width: 720,
    height: 430,
  },
  about: {
    id: "about",
    title: "Parcours",
    icon: GraduationCap,
    isOpen: false,
    x: 250,
    y: 170,
    z: 2,
    width: 640,
    height: 390,
  },
  tools: {
    id: "tools",
    title: "Les outils que j’utilise",
    icon: Wrench,
    isOpen: false,
    x: 390,
    y: 105,
    z: 3,
    width: 560,
    height: 420,
  },
};

const projects = [
  {
    title: "Portfolio macOS",
    type: "React · Vite · Tailwind",
    description: "Interface interactive inspirée d’un bureau Apple avec fenêtres, fichiers cliquables et animations fluides.",
  },
  {
    title: "Dashboard junior dev",
    type: "React · API · UI Design",
    description: "Tableau de bord moderne avec composants réutilisables, filtres et état global.",
  },
  {
    title: "Landing page créative",
    type: "HTML · CSS · JavaScript",
    description: "Page vitrine responsive avec micro-interactions et direction artistique soignée.",
  },
];

const tools = ["React", "Vite", "Tailwind CSS", "Framer Motion", "Zustand", "Git", "Figma", "VS Code"];

function useWindowStore() {
  const [windows, setWindows] = useState(initialWindows);
  const [topZ, setTopZ] = useState(10);

  const openWindow = (id) => {
    setTopZ((z) => z + 1);
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, z: topZ + 1 },
    }));
  };

  const closeWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }));
  };

  const focusWindow = (id) => {
    setTopZ((z) => z + 1);
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], z: topZ + 1 },
    }));
  };

  const updatePosition = (id, x, y) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], x, y },
    }));
  };

  return { windows, openWindow, closeWindow, focusWindow, updatePosition };
}

function MenuBar() {
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

function DesktopIcon({ id, label, kind = "folder", onOpen, className = "" }) {
  return (
    <button
      onDoubleClick={() => onOpen(id)}
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

function Sidebar({ openWindow }) {
  return (
    <aside className="fixed right-5 top-20 z-20 hidden w-64 rounded-[28px] border border-white/40 bg-white/35 p-4 shadow-2xl backdrop-blur-2xl lg:block">
      <h2 className="mb-4 text-lg font-bold text-zinc-900">Les outils que j’utilise</h2>
      <div className="grid grid-cols-2 gap-2">
        {tools.slice(0, 6).map((tool) => (
          <div key={tool} className="rounded-2xl bg-white/55 px-3 py-2 text-sm font-semibold text-zinc-700 shadow-sm">
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

function WindowFrame({ win, children, onClose, onFocus, onDragEnd }) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      onMouseDown={onFocus}
      onDragEnd={(_, info) => onDragEnd(info.point.x, info.point.y)}
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: 18 }}
      transition={{ type: "spring", stiffness: 280, damping: 25 }}
      className="fixed overflow-hidden rounded-[24px] border border-white/50 bg-zinc-50/80 shadow-2xl backdrop-blur-2xl"
      style={{ left: win.x, top: win.y, zIndex: win.z, width: win.width, height: win.height }}
    >
      <div className="flex h-11 cursor-grab items-center justify-between border-b border-zinc-200/70 bg-white/55 px-4 active:cursor-grabbing">
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="h-3.5 w-3.5 rounded-full bg-red-500" />
          <span className="h-3.5 w-3.5 rounded-full bg-yellow-400" />
          <span className="h-3.5 w-3.5 rounded-full bg-green-500" />
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-zinc-700">
          <win.icon className="h-4 w-4" />
          {win.title}
        </div>
        <div className="flex items-center gap-3 text-zinc-500">
          <Minus className="h-4 w-4" />
          <Maximize2 className="h-4 w-4" />
        </div>
      </div>
      <div className="h-[calc(100%-44px)] overflow-auto p-6">{children}</div>
    </motion.div>
  );
}

function ProjectsContent() {
  return (
    <div>
      <h2 className="text-3xl font-black text-zinc-950">Mes projets</h2>
      <p className="mt-2 max-w-xl text-zinc-600">Une sélection de projets pensés pour montrer mon sens du détail, ma logique front-end et ma progression de développeuse junior.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {projects.map((project) => (
          <article key={project.title} className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-zinc-200/70 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white">
              <Code2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-zinc-950">{project.title}</h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-sky-600">{project.type}</p>
            <p className="mt-3 text-sm leading-6 text-zinc-600">{project.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function AboutContent() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-3xl font-black text-zinc-950">Kassoul Amira</h2>
        <p className="mt-2 text-lg font-semibold text-zinc-700">Développeuse junior</p>
      </div>
      <p className="leading-7 text-zinc-600">
        Je construis des interfaces modernes, claires et agréables à utiliser. Mon objectif est de créer des expériences web professionnelles avec une attention particulière portée à l’ergonomie, aux animations et à la qualité du code.
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        {[
          "Front-end moderne",
          "UI responsive",
          "Composants réutilisables",
        ].map((item) => (
          <div key={item} className="rounded-2xl bg-white p-4 text-sm font-bold text-zinc-800 shadow-sm ring-1 ring-zinc-200/70">
            {item}
          </div>
        ))}
      </div>
      <div className="rounded-3xl bg-zinc-950 p-5 text-white">
        <h3 className="font-bold">Mon approche</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-300">Créer un portfolio qui ne se contente pas d’afficher du contenu, mais qui donne envie d’explorer.</p>
      </div>
    </div>
  );
}

function ToolsContent() {
  return (
    <div>
      <h2 className="text-3xl font-black text-zinc-950">Les outils que j’utilise</h2>
      <p className="mt-2 text-zinc-600">Cette section présente réellement mon environnement de travail et mes technologies principales.</p>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {tools.map((tool) => (
          <div key={tool} className="rounded-3xl bg-white p-4 text-center font-bold text-zinc-800 shadow-sm ring-1 ring-zinc-200/70">
            {tool}
          </div>
        ))}
      </div>
    </div>
  );
}

function Dock({ openWindow }) {
  const items = [
    { id: "projects", icon: Briefcase, label: "Projets" },
    { id: "about", icon: GraduationCap, label: "Parcours" },
    { id: "tools", icon: Wrench, label: "Outils" },
  ];

  return (
    <div className="fixed bottom-5 left-1/2 z-[998] flex -translate-x-1/2 gap-3 rounded-[28px] border border-white/50 bg-white/45 p-3 shadow-2xl backdrop-blur-2xl">
      {items.map((item) => (
        <button key={item.id} onClick={() => openWindow(item.id)} title={item.label} className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/75 shadow-sm transition hover:-translate-y-2 hover:scale-110">
          <item.icon className="h-7 w-7 text-zinc-900" />
        </button>
      ))}
    </div>
  );
}

export default function MacOSPortfolio() {
  const { windows, openWindow, closeWindow, focusWindow, updatePosition } = useWindowStore();
  const openWindows = useMemo(() => Object.values(windows).filter((win) => win.isOpen), [windows]);

  const renderContent = (id) => {
    if (id === "projects") return <ProjectsContent />;
    if (id === "about") return <AboutContent />;
    return <ToolsContent />;
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f2eee5] text-zinc-950">
      <MenuBar />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(125,211,252,0.35),transparent_25%),radial-gradient(circle_at_70%_35%,rgba(251,207,232,0.35),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(216,180,254,0.25),transparent_28%)]" />

      <section className="relative flex min-h-screen items-center justify-center px-6 pt-9">
        <div className="pointer-events-none text-center">
          <p className="font-serif text-6xl italic text-sky-300 md:text-8xl">designer</p>
          <h1 className="-mt-8 text-7xl font-black tracking-[-0.08em] text-[#321515] md:text-[11rem]">portfolio</h1>
          <p className="mt-2 text-4xl tracking-[0.25em] text-[#321515]">2026</p>
        </div>

        <div className="absolute left-10 top-24">
          <DesktopIcon id="projects" label="projets" onOpen={openWindow} />
        </div>
        <div className="absolute left-48 bottom-28">
          <DesktopIcon id="about" label="parcours" onOpen={openWindow} />
        </div>
        <div className="absolute right-80 top-28 hidden md:block">
          <DesktopIcon id="tools" label="outils" onOpen={openWindow} />
        </div>
        <div className="absolute bottom-32 right-24 hidden md:block">
          <DesktopIcon id="about" label="CV.pdf" kind="file" onOpen={openWindow} />
        </div>
      </section>

      <Sidebar openWindow={openWindow} />
      <Dock openWindow={openWindow} />

      <div className="fixed bottom-28 left-8 z-20 flex gap-3 text-zinc-700">
        <Github className="h-6 w-6" />
        <Linkedin className="h-6 w-6" />
        <Mail className="h-6 w-6" />
      </div>

      <AnimatePresence>
        {openWindows.map((win) => (
          <WindowFrame
            key={win.id}
            win={win}
            onClose={() => closeWindow(win.id)}
            onFocus={() => focusWindow(win.id)}
            onDragEnd={(x, y) => updatePosition(win.id, x, y)}
          >
            {renderContent(win.id)}
          </WindowFrame>
        ))}
      </AnimatePresence>
    </main>
  );
}
