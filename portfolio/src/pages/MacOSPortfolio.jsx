import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Wrench,
  Mail,
  Code2,
  ExternalLink,
  AtSign,
  Monitor,
  Box,
  FileText,
} from "lucide-react";

import MenuBar from "../components/MenuBar";
import DesktopIcon from "../components/DesktopIcon";
import Dock from "../components/Dock";
import WindowFrame from "../components/WindowFrame";
import CVPdf, { downloadCVPdf } from "../components/CVPdf";

import { useWindowStore } from "../store/windowStore";
import { languages } from "../data/languages";
import { projects } from "../data/projects";
import { profile } from "../data/profile";
import { tools } from "../data/tools";

const icons = {
  projects: Briefcase,
  about: GraduationCap,
  tools: Wrench,
  vscode: Monitor,
  office: Box,
  cv: FileText,
};

const officeApps = ["Word", "Excel", "PowerPoint", "Outlook", "Teams"];

function ProjectsContent() {
  return (
    <div>
      <h2 className="text-3xl font-black text-zinc-950">Mes projets</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
        Une sélection de projets front-end pour montrer ma logique React, mon
        sens du détail et ma progression comme développeuse junior.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-zinc-200/70 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-zinc-950 text-white">
              <Code2 className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-zinc-950">
              {project.title}
            </h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-sky-600">
              {project.type}
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              {project.description}
            </p>
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
        <h2 className="text-3xl font-black text-zinc-950">
          {profile.name}
        </h2>
        <p className="mt-2 text-lg font-semibold text-zinc-700">
          {profile.role}
        </p>
      </div>

      <p className="leading-7 text-zinc-600">
        {profile.summary}
      </p>

      <div className="grid gap-3 md:grid-cols-3">
        {profile.strengths.map((item) => (
          <div
            key={item}
            className="rounded-lg bg-white p-4 text-sm font-bold text-zinc-800 shadow-sm ring-1 ring-zinc-200/70"
          >
            {item}
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-zinc-200/70">
          <h3 className="font-bold text-zinc-950">Formation</h3>
          <div className="mt-3 space-y-3">
            {profile.education.map((item) => (
              <article key={item.title}>
                <p className="font-semibold text-zinc-900">{item.title}</p>
                <p className="text-sm text-zinc-600">{item.place}</p>
                <p className="text-sm text-zinc-500">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-lg bg-zinc-950 p-5 text-white">
          <h3 className="font-bold">Contact</h3>
          <div className="mt-3 space-y-2 text-sm text-zinc-300">
            <p>{profile.location}</p>
            <p>{profile.email}</p>
            <p>{profile.phone}</p>
            <p>{profile.languages.join(" · ")}</p>
          </div>
        </section>
      </div>

      <section className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-zinc-200/70">
        <h3 className="font-bold text-zinc-950">Engagements</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {profile.commitments.map((item) => (
            <span
              key={item}
              className="rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-zinc-200/70">
        <h3 className="font-bold text-zinc-950">Centres d'intérêt</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {profile.interests.map((interest) => (
            <span
              key={interest}
              className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-zinc-700 shadow-sm ring-1 ring-zinc-200/70"
            >
              {interest}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

function ToolsContent() {
  return (
    <div>
      <h2 className="text-3xl font-black">Les outils que j’utilise</h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">
        Les outils et langages mentionnés dans mon CV, utiles pour développer,
        organiser et collaborer.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {tools.map((tool) => (
          <div
            key={tool}
            className="rounded-lg bg-white p-4 text-center font-bold shadow-sm ring-1 ring-zinc-200/70"
          >
            {tool}
          </div>
        ))}
      </div>

      <h3 className="mt-8 text-xl font-black text-zinc-950">
        Langages et technologies
      </h3>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {languages.map((language) => (
          <div
            key={language}
            className="rounded-lg bg-zinc-950 p-3 text-center text-sm font-bold text-white shadow-sm"
          >
            {language}
          </div>
        ))}
      </div>
    </div>
  );
}

function VSCodeContent() {
  return (
    <div>
      <h2 className="text-3xl font-black text-zinc-950">VS Code</h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">
        Les langages et technologies que j’utilise dans mon environnement de
        développement.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {languages.map((language) => (
          <div
            key={language}
            className="rounded-lg bg-white p-4 text-center font-bold text-zinc-800 shadow-sm ring-1 ring-zinc-200/70"
          >
            {language}
          </div>
        ))}
      </div>
    </div>
  );
}

function OfficeContent() {
  return (
    <div>
      <h2 className="text-3xl font-black text-zinc-950">Office</h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">
        Les applications Office que j’utilise pour organiser, rédiger,
        présenter et communiquer.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
        {officeApps.map((app) => (
          <div
            key={app}
            className="rounded-lg bg-white p-4 text-center font-bold text-zinc-800 shadow-sm ring-1 ring-zinc-200/70"
          >
            {app}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MacOSPortfolio() {
  const { windows, openWindow, closeWindow, focusWindow, updatePosition } =
    useWindowStore();
  const [isDownloadingCV, setIsDownloadingCV] = useState(false);

  const openWindows = useMemo(
    () => Object.values(windows).filter((win) => win.isOpen),
    [windows]
  );

  const renderContent = (id) => {
    if (id === "projects") return <ProjectsContent />;
    if (id === "about") return <AboutContent />;
    if (id === "vscode") return <VSCodeContent />;
    if (id === "office") return <OfficeContent />;
    if (id === "cv") return <CVPdf />;
    return <ToolsContent />;
  };

  const handleDesktopOpen = (id) => {
    if (id === "cv") {
      setIsDownloadingCV(true);

      downloadCVPdf().finally(() => {
        setIsDownloadingCV(false);
      });
      return;
    }

    openWindow(id);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eef3f8] text-zinc-950">
      <MenuBar />

      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,165,233,0.22),transparent_36%),linear-gradient(315deg,rgba(244,114,182,0.18),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.74),rgba(226,232,240,0.8))]" />

      <section className="relative flex min-h-screen items-center justify-center px-6 pt-9">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="pointer-events-none text-center"
        >
          <p className="font-serif text-5xl italic text-sky-500 md:text-7xl">
            {profile.name}
          </p>

          <h1 className="mt-1 text-6xl font-black text-[#261515] md:text-[9rem]">
            portfolio
          </h1>

          <p className="mt-2 text-2xl font-semibold uppercase tracking-[0.18em] text-[#261515] md:text-4xl">
            developpeuse informatique junior
          </p>
        </motion.div>

        <div className="absolute left-10 top-24">
          <DesktopIcon id="projects" label="projets" onOpen={handleDesktopOpen} />
        </div>

        <div className="absolute left-48 bottom-28">
          <DesktopIcon id="about" label="parcours" onOpen={handleDesktopOpen} />
        </div>

        <div className="absolute right-80 top-28 hidden md:block">
          <DesktopIcon id="tools" label="outils" onOpen={handleDesktopOpen} />
        </div>

        <div className="absolute bottom-32 right-24 hidden md:block">
          <DesktopIcon
            id="cv"
            label={isDownloadingCV ? "Téléchargement..." : "CV.pdf"}
            kind="file"
            onOpen={handleDesktopOpen}
          />
        </div>
      </section>

      <Dock openWindow={openWindow} />

      <div className="fixed bottom-28 left-8 z-20 flex gap-3 text-zinc-700">
        <ExternalLink className="h-6 w-6" />
        <AtSign className="h-6 w-6" />
        <Mail className="h-6 w-6" />
      </div>

      <AnimatePresence>
        {openWindows.map((win) => (
          <WindowFrame
            key={win.id}
            win={win}
            icon={icons[win.id]}
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
