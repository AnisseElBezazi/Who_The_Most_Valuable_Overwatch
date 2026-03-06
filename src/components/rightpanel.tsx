"use client";
import React, { useState } from "react";
import "./rightpanel.css";

export default function RightPanel() {
  const [isHeroGridOpen, setIsHeroGridOpen] = useState(true);

  return (
    <div className="d-flex flex-column align-items-end"> {/* <-- h-100 ajouté ici */}
      {/* Barre de recherche (Fixe) - Calée à droite */}
      <div className="d-flex mb-3 shadow-sm mt-2 panel-search-right flex-shrink-0">
        <input
          type="text"
          className="form-control border-theme-gray search-input-box-right"
          placeholder="Pseudo#0000"
        />
        <button className="bg-theme-gray search-submit-btn-right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="white"
            viewBox="0 0 16 16"
          >
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l2.578 2.576L12.736 3.97z" />
          </svg>
        </button>
      </div>

      {/* Header Avatar (Fixe) */}
      <div className="mb-0 position-relative header-container-right flex-shrink-0">
        <div className="position-absolute top-0 end-0 bg-dark header-banner-right"></div>
        <div className="bg-white p-1 position-absolute header-avatar-right">
          <img
            src="https://clipartcraft.com/images/overwatch-logo-transparent-high-resolution-4.png"
            alt="Avatar"
            className="w-100 h-100 object-fit-cover"
          />
        </div>
        <div className="fw-bold fs-3 text-dark text-nowrap position-absolute top-50 translate-middle-y header-pseudo-right">
          Genji92
        </div>
      </div>

      {/* Contenu qui s'étire */}
      <div className="bg-white d-flex flex-column pt-4 pb-3 shadow-sm flex-grow-1 main-content-right"> {/* <-- d-flex flex-column ajouté ici */}
        <div className="main-content-inner-right flex-grow-1 d-flex flex-column"> {/* <-- flex-grow-1 d-flex flex-column ajoutés ici */}
          
          {/* Titre du héros - Alignement droite */}
          <div className="mb-3 px-3 mt-2 text-end">
            <div className="fw-bold text-uppercase text-dark lh-1 fs-2">
              ANA
            </div>
            <div className="fw-bold text-theme-gray">Support</div>
          </div>

          {/* Grille de sélection */}
          <div className="px-3 mt-2 w-100" style={{ maxWidth: "260px" }}>
            <button
              onClick={() => setIsHeroGridOpen(!isHeroGridOpen)}
              className="btn w-100 d-flex justify-content-between align-items-center fw-bold mb-2 border rounded"
              style={{ backgroundColor: "#d0d5d9", fontSize: "0.85rem" }}
            >
              SELECT HERO <span>{isHeroGridOpen ? "▲" : "▼"}</span>
            </button>

            {isHeroGridOpen && (
              <div className="hero-grid-right p-1 border rounded bg-white">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className={`hero-item-right ${i === 0 ? "active" : ""}`}
                  >
                    <img
                      src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/985b06beae46b7ba3ca87d1512d0fc62ca7f206ceca58ef16fc44d43a1cc84ed.png"
                      alt="hero"
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Statistiques */}
          <div className="px-3 mt-4 mb-auto w-100" style={{ maxWidth: "260px" }}>
            <StatLine label="Nano Boost Assists" value="4.5" />
            <StatLine label="Sleep Dart Success" value="45%" />
            <StatLine label="Biotic Grenade Kills" value="12" />
            <StatLine label="Unscoped Accuracy" value="62%" />
          </div>

          {/* Rank Section */}
          <div className="d-flex align-items-center px-3 mt-4 justify-content-end w-100">
            <div className="text-end me-3">
              <div className="fw-bold text-muted small">Overall</div>
              <div className="fw-bold fs-4 text-dark">GRANDMASTER</div>
            </div>
            <div className="rounded-circle d-flex justify-content-center align-items-center fw-bold fs-3 text-dark rank-circle-right">
              88
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

const StatLine = ({ label, value }) => (
  <div className="d-flex justify-content-between mb-1 border-bottom border-light pb-1 w-100">
    <span className="text-secondary fw-bold" style={{ fontSize: "0.75rem" }}>
      {label}
    </span>
    <span className="fw-bold text-dark" style={{ fontSize: "0.75rem" }}>
      {value}
    </span>
  </div>
);