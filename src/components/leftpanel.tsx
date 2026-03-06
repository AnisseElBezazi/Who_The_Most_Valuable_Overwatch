"use client";
import React, { useState } from "react";
import "./leftpanel.css";

export default function LeftPanel() {
  const [isHeroGridOpen, setIsHeroGridOpen] = useState(true);

  return (
    <div className="d-flex flex-column ">
      {/* Barre de recherche (Fixe) */}
      <div className="d-flex mb-3 shadow-sm mt-2 panel-search flex-shrink-0">
        <input
          type="text"
          className="form-control border-theme-orange search-input-box"
          placeholder="Pseudo#0000"
        />
        <button className="bg-theme-orange search-submit-btn">
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
      <div className="mb-0 position-relative header-container flex-shrink-0">
        <div className="position-absolute top-0 start-0 bg-dark header-banner"></div>
        <div className="bg-white p-1 position-absolute header-avatar">
          <img
            src="https://clipartcraft.com/images/overwatch-logo-transparent-high-resolution-4.png"
            alt="Avatar"
            className="w-100 h-100 object-fit-cover"
          />
        </div>
        <div className="fw-bold fs-3 text-dark text-nowrap position-absolute top-50 translate-middle-y header-pseudo">
          Raysquad
        </div>
      </div>

      {/* Contenu qui s'étire */}
      <div className="bg-white d-flex flex-column pt-4 pb-3 shadow-sm flex-grow-1 main-content">
        {/* Titre du héros */}
        <div className="mb-3 px-3 mt-2">
          <div className="fw-bold text-uppercase text-dark lh-1 fs-2">
            CASSIDY
          </div>
          <div className="fw-bold text-theme-orange">Damage</div>
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
            <div className="hero-grid p-1 border rounded bg-white">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className={`hero-item ${i === 0 ? "active" : ""}`}>
                  <img
                    src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/9240cd64cc8ef58df9acbf55204ab1b5d8578f743fda5931f0dbccbd75ab841b.png"
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
          <StatLine label="Deadeye Kills" value="1" />
          <StatLine label="Fan the Hammer Kills" value="1" />
          <StatLine label="Long Range Final Blows" value="2" />
          <StatLine label="Mag Grenade Attach Rate" value="27%" />
        </div>

        {/* Rank Section */}
        <div className="d-flex align-items-center px-3 mt-4">
          <div className="rounded-circle d-flex justify-content-center align-items-center fw-bold fs-3 me-3 text-dark rank-circle">
            88
          </div>
          <div>
            <div className="fw-bold text-muted small">Overall</div>
            <div className="fw-bold fs-4 text-dark">MASTER</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StatLine = ({ label, value }) => (
  <div className="d-flex justify-content-between mb-1 border-bottom border-light pb-1">
    <span className="text-secondary fw-bold" style={{ fontSize: "0.75rem" }}>
      {label}
    </span>
    <span className="fw-bold text-dark" style={{ fontSize: "0.75rem" }}>
      {value}
    </span>
  </div>
);
