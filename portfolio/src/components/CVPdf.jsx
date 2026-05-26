import { jsPDF } from "jspdf";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { languages } from "../data/languages";
import { tools } from "../data/tools";

export const CV_CONTENT_ID = "cv-content";
export const CV_DOWNLOAD_CONTENT_ID = "cv-download-content";

export function downloadCVPdf() {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const filename = `CV_${profile.name.replace(/\s+/g, "_")}.pdf`;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const maxWidth = pageWidth - margin * 2;
  let y = 18;

  const ensureSpace = (height = 10) => {
    if (y + height <= pageHeight - margin) return;
    doc.addPage();
    y = margin;
  };

  const addText = (text, { size = 10, style = "normal", color = "#3f3f46", gap = 5 } = {}) => {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    doc.setTextColor(color);

    const lines = doc.splitTextToSize(text, maxWidth);
    const lineHeight = size * 0.42;
    ensureSpace(lines.length * lineHeight + gap);
    doc.text(lines, margin, y);
    y += lines.length * lineHeight + gap;
  };

  const addSectionTitle = (title) => {
    ensureSpace(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor("#18181b");
    doc.text(title, margin, y);
    y += 7;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor("#09090b");
  doc.text(profile.name, margin, y);
  y += 9;

  doc.setFontSize(13);
  doc.setTextColor("#0284c7");
  doc.text(profile.role, margin, y);
  y += 7;

  addText(`${profile.location} · ${profile.email} · ${profile.phone}`, {
    size: 9,
    color: "#52525b",
    gap: 2,
  });
  addText(profile.languages.join(" · "), { size: 9, color: "#52525b", gap: 6 });

  doc.setDrawColor("#d4d4d8");
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  addSectionTitle("Profil");
  addText(profile.summary);

  addSectionTitle("Compétences");
  addText(`Langages : ${languages.join(", ")}`);
  addText(`Outils : ${tools.join(", ")}`, { gap: 2 });

  addSectionTitle("Projets");
  projects.forEach((project) => {
    addText(project.title, { size: 11, style: "bold", color: "#18181b", gap: 2 });
    addText(project.type, { size: 9, style: "bold", color: "#0284c7", gap: 2 });
    addText(project.description, { gap: 4 });
  });

  addSectionTitle("Formation");
  profile.education.forEach((edu) => {
    addText(edu.title, { size: 11, style: "bold", color: "#18181b", gap: 2 });
    addText(`${edu.place} · ${edu.detail}`, { gap: 4 });
  });

  addSectionTitle("Engagements");
  profile.commitments.forEach((commitment) => {
    addText(`• ${commitment}`, { gap: 2 });
  });

  doc.save(filename);
  return Promise.resolve();
}

export function CVContent({ id = CV_CONTENT_ID }) {
  const styles = {
    page: {
      width: "210mm",
      margin: "0 auto",
      padding: "32px",
      background: "#ffffff",
      color: "#111827",
      fontFamily: "Arial, sans-serif",
      boxSizing: "border-box",
    },
    header: {
      marginBottom: "24px",
      paddingBottom: "16px",
      borderBottom: "2px solid #d4d4d8",
    },
    title: {
      margin: 0,
      color: "#09090b",
      fontSize: "36px",
      fontWeight: 900,
      lineHeight: 1.1,
    },
    role: {
      margin: "8px 0 0",
      color: "#0284c7",
      fontSize: "18px",
      fontWeight: 700,
    },
    meta: {
      marginTop: "8px",
      color: "#52525b",
      fontSize: "12px",
      lineHeight: 1.5,
    },
    section: {
      marginBottom: "24px",
    },
    sectionTitle: {
      margin: "0 0 8px",
      color: "#18181b",
      fontSize: "20px",
      fontWeight: 800,
    },
    paragraph: {
      margin: 0,
      color: "#3f3f46",
      fontSize: "13px",
      lineHeight: 1.6,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "8px",
      color: "#3f3f46",
      fontSize: "13px",
      lineHeight: 1.5,
    },
    strong: {
      margin: 0,
      color: "#18181b",
      fontWeight: 700,
    },
    project: {
      marginBottom: "12px",
    },
    projectTitle: {
      margin: 0,
      color: "#18181b",
      fontWeight: 700,
      fontSize: "14px",
    },
    projectType: {
      margin: "2px 0",
      color: "#0284c7",
      fontSize: "11px",
      fontWeight: 700,
    },
    list: {
      margin: 0,
      paddingLeft: "18px",
      color: "#3f3f46",
      fontSize: "13px",
      lineHeight: 1.6,
    },
  };

  return (
    <div id={id} style={styles.page}>
      {/* En-tête */}
      <div style={styles.header}>
        <h1 style={styles.title}>{profile.name}</h1>
        <p style={styles.role}>{profile.role}</p>
        <div style={styles.meta}>
          <p style={{ margin: 0 }}>{profile.location} · {profile.email} · {profile.phone}</p>
          <p style={{ margin: 0 }}>{profile.languages.join(" · ")}</p>
        </div>
      </div>

      {/* Résumé */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Profil</h2>
        <p style={styles.paragraph}>{profile.summary}</p>
      </section>

      {/* Compétences */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Compétences</h2>
        <div style={styles.grid}>
          <div>
            <p style={styles.strong}>Langages :</p>
            <p style={{ margin: 0 }}>{languages.join(", ")}</p>
          </div>
          <div>
            <p style={styles.strong}>Outils :</p>
            <p style={{ margin: 0 }}>{tools.join(", ")}</p>
          </div>
        </div>
      </section>

      {/* Projets */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Projets</h2>
        {projects.map((project) => (
          <div key={project.title} style={styles.project}>
            <p style={styles.projectTitle}>{project.title}</p>
            <p style={styles.projectType}>{project.type}</p>
            <p style={styles.paragraph}>{project.description}</p>
          </div>
        ))}
      </section>

      {/* Formation */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Formation</h2>
        {profile.education.map((edu) => (
          <div key={edu.title} style={styles.project}>
            <p style={styles.projectTitle}>{edu.title}</p>
            <p style={styles.paragraph}>{edu.place} · {edu.detail}</p>
          </div>
        ))}
      </section>

      {/* Engagements */}
      <section>
        <h2 style={styles.sectionTitle}>Engagements</h2>
        <ul style={styles.list}>
          {profile.commitments.map((commitment) => (
            <li key={commitment}>{commitment}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default function CVPdf() {
  return (
    <div>
      <button
        onClick={() => downloadCVPdf()}
        className="mb-4 rounded-lg bg-zinc-950 px-4 py-2 text-white font-semibold"
      >
        Télécharger le CV en PDF
      </button>

      <CVContent />
    </div>
  );
}
