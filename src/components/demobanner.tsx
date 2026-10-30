"use client";
import React, { useEffect, useState } from "react";
import "./demobanner.css";

// Profils publics trouvés via la recherche de l'API OverFast (identifiants OverFast, pas des Battletags)
export const DEMO = {
  gamemode: "competitive",
  left: {
    name: "Hanbin",
    id: "da5fa288ba7fd6feb8a52fa6%7C32b0e6e4139cd4101e56fb4c3d5e5579",
    hero: "sigma",
    platform: "pc",
  },
  right: {
    name: "Proper",
    id: "c24ca39ab663d6ffb8a924a1%7C0af093578c2c19768db6f8fb94fd487f",
    hero: "echo",
    platform: "console",
  },
};

const HIDDEN_KEY = "demo-banner-cache";

export default function DemoBanner({ onRun }: { onRun: () => void }) {
  const [visible, setVisible] = useState(false);

  // Lu après l'affichage : le localStorage n'existe pas côté serveur
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (!localStorage.getItem(HIDDEN_KEY)) setVisible(true);
      } catch {
        setVisible(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  function hide() {
    setVisible(false);
    try {
      localStorage.setItem(HIDDEN_KEY, "1");
    } catch {}
  }

  if (!visible) return null;

  return (
    <div className="demo-banner" role="region" aria-label="Tester le projet">
      <p className="demo-banner-text">
        <strong>Venu tester le projet ?</strong> Lance un duel d&apos;exemple : Hanbin sur Sigma
        contre Proper sur Echo.
      </p>
      <button
        className="demo-banner-run"
        onClick={() => {
          onRun();
          hide();
        }}
      >
        Lancer l&apos;exemple
      </button>
      <button className="demo-banner-close" onClick={hide} aria-label="Fermer">
        ×
      </button>
    </div>
  );
}
