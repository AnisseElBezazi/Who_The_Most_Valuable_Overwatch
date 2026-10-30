"use client";
import React, { useCallback, useEffect, useState } from "react";
import "./demomodal.css";

// Profils publics trouvés via la recherche de l'API OverFast (identifiants OverFast, pas des Battletags)
export type DemoPlayer = { name: string; id: string; hero: string };
export type DemoMatch = {
  title: string;
  detail: string;
  gamemode: string;
  platform: string;
  left: DemoPlayer;
  right: DemoPlayer;
};

export const DEMO_MATCHES: DemoMatch[] = [
  {
    title: "Duel de Sojourn",
    detail: "Proper contre Kevster, en compétitif sur console",
    gamemode: "competitive",
    platform: "console",
    left: { name: "Proper", id: "c24ca39ab663d6ffb8a924a1%7C0af093578c2c19768db6f8fb94fd487f", hero: "sojourn" },
    right: { name: "Kevster", id: "d95bba99a77489e0b8a123a2d7%7C102152028b28f6c04faa9a93329d9ea2", hero: "sojourn" },
  },
  {
    title: "Duel de Tracer",
    detail: "Hanbin contre Fleta, en compétitif sur PC",
    gamemode: "competitive",
    platform: "pc",
    left: { name: "Hanbin", id: "da5fa288ba7fd6feb8a52fa6%7C32b0e6e4139cd4101e56fb4c3d5e5579", hero: "tracer" },
    right: { name: "Fleta", id: "d452a99eb23cc8ffbda923%7Ca6300a19b6d52ec188d55c9b7b9f4381", hero: "tracer" },
  },
  {
    title: "Tank contre support",
    detail: "Sigma de Hanbin contre Ana de Shu, en compétitif sur PC",
    gamemode: "competitive",
    platform: "pc",
    left: { name: "Hanbin", id: "da5fa288ba7fd6feb8a52fa6%7C32b0e6e4139cd4101e56fb4c3d5e5579", hero: "sigma" },
    right: { name: "Shu", id: "c156b9c7e123cdfcb9%7C7375285c0d0f214704f529e6661217a3", hero: "ana" },
  },
];

const SEEN_KEY = "demo-modal-vue";

export default function DemoModal({ onPick }: { onPick: (match: DemoMatch) => void }) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {}
  }, []);

  // Ouverte d'office à la première visite seulement (lu après l'affichage, le localStorage n'existe pas côté serveur)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (!localStorage.getItem(SEEN_KEY)) setOpen(true);
      } catch {
        setOpen(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  function pick(match: DemoMatch) {
    onPick(match);
    close();
  }

  return (
    <>
      <button className="demo-reopen shadow" onClick={() => setOpen(true)}>
        Exemples
      </button>

      {open && (
        <div className="demo-backdrop" onClick={close}>
          <div
            className="demo-modal shadow-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="demo-title" className="demo-title">
              Venu tester le projet ?
            </h2>
            <p className="demo-text">
              Pas besoin de compte Overwatch : choisis un duel, les deux profils publics se chargent
              et la comparaison se lance toute seule.
            </p>

            <div className="d-flex flex-column gap-2">
              {DEMO_MATCHES.map((m) => (
                <button key={m.title} className="demo-match" onClick={() => pick(m)}>
                  <span className="demo-match-title">{m.title}</span>
                  <span className="demo-match-detail">{m.detail}</span>
                </button>
              ))}
            </div>

            <button className="demo-close" onClick={close}>
              Je préfère chercher moi-même
            </button>
          </div>
        </div>
      )}
    </>
  );
}
