import { create } from "zustand";

export const useWindowStore = create((set, get) => ({
  topZ: 10,

  windows: {
    projects: {
      id: "projects",
      title: "Projets",
      isOpen: false,
      x: 130,
      y: 120,
      z: 1,
      width: 720,
      height: 520,
    },
    about: {
      id: "about",
      title: "Parcours",
      isOpen: false,
      x: 250,
      y: 170,
      z: 2,
      width: 640,
      height: 520,
    },
    tools: {
      id: "tools",
      title: "Les outils que j’utilise",
      isOpen: false,
      x: 390,
      y: 105,
      z: 3,
      width: 560,
      height: 470,
    },
    vscode: {
      id: "vscode",
      title: "VS Code",
      isOpen: false,
      x: 460,
      y: 155,
      z: 4,
      width: 520,
      height: 360,
    },
    office: {
      id: "office",
      title: "Office",
      isOpen: false,
      x: 520,
      y: 190,
      z: 5,
      width: 520,
      height: 360,
    },
    cv: {
      id: "cv",
      title: "CV.pdf",
      isOpen: false,
      x: 300,
      y: 200,
      z: 6,
      width: 700,
      height: 600,
    },
  },

  openWindow: (id) => {
    if (!get().windows[id]) return;

    const newZ = get().topZ + 1;

    set((state) => ({
      topZ: newZ,
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isOpen: true,
          z: newZ,
        },
      },
    }));
  },

  closeWindow: (id) => {
    if (!get().windows[id]) return;

    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isOpen: false,
        },
      },
    }));
  },

  focusWindow: (id) => {
    if (!get().windows[id]) return;

    const newZ = get().topZ + 1;

    set((state) => ({
      topZ: newZ,
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          z: newZ,
        },
      },
    }));
  },

  updatePosition: (id, x, y) => {
    if (!get().windows[id]) return;

    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          x: Math.max(12, Math.min(x, window.innerWidth - 160)),
          y: Math.max(48, Math.min(y, window.innerHeight - 96)),
        },
      },
    }));
  },
}));
