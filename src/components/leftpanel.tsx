"use client";
import React, { useState } from "react";
import "./leftpanel.css";

export default function LeftPanel() {
  const [isHeroGridOpen, setIsHeroGridOpen] = useState(true);

  return (
    <div className="d-flex flex-column h-100">
      {/* Barre de recherche verrouillée */}
      <div className="d-flex mb-3 shadow-sm mt-2 panel-search flex-shrink-0">
        <div className="d-flex align-items-center justify-content-center bg-theme-orange search-icon-box">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="text-dark"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </div>
        <input
          type="text"
          className="form-control border-theme-orange border-start-0 search-input-box"
          placeholder="Pseudo#0000"
        />
      </div>

      {/* En-tête verrouillé */}
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

      {/* Contenu principal qui s'étire */}
      <div className="bg-white d-flex flex-column pt-4 pb-3 shadow-sm flex-grow-1 main-content">
        <div className="mb-3 px-3 mt-2">
          <div className="fw-bold text-uppercase text-dark lh-1 hero-title">
            CASSIDY
          </div>
          <div className="fw-bold text-theme-orange hero-subtitle">Damage</div>
        </div>

        <div className="px-3 mt-2 hero-grid-wrapper w-100">
          <button
            onClick={() => setIsHeroGridOpen(!isHeroGridOpen)}
            className="btn w-100 d-flex justify-content-between align-items-center fw-bold mb-2 btn-hero-select"
          >
            SELECT HERO{" "}
            <span className="arrow-icon">{isHeroGridOpen ? "▲" : "▼"}</span>
          </button>
          {isHeroGridOpen && (
            <div className="d-flex flex-wrap border rounded p-1 bg-white grid-gap">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className={`hero-item ${i === 0 ? "active" : ""}`}>
                  <img
                    src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/9240cd64cc8ef58df9acbf55204ab1b5d8578f743fda5931f0dbccbd75ab841b.png"
                    alt={`hero-${i}`}
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-3 mt-4 mb-auto w-100 hero-grid-wrapper">
          <div className="d-flex justify-content-between mb-1">
            <span className="text-secondary fw-bold stat-text">
              Deadeye Kills
            </span>
            <span className="fw-bold text-dark stat-text">1</span>
          </div>
          <div className="d-flex justify-content-between mb-1">
            <span className="text-secondary fw-bold stat-text">
              Fan the Hammer Kills
            </span>
            <span className="fw-bold text-dark stat-text">1</span>
          </div>
          <div className="d-flex justify-content-between mb-1">
            <span className="text-secondary fw-bold stat-text">
              Long Range Final Blows
            </span>
            <span className="fw-bold text-dark stat-text">2</span>
          </div>
          <div className="d-flex justify-content-between mb-1">
            <span className="text-secondary fw-bold stat-text">
              Mag Grenade Attach Rate
            </span>
            <span className="fw-bold text-dark stat-text">27%</span>
          </div>
        </div>

        <div className="d-flex align-items-center px-3 mt-4">
          <div className="rounded-circle d-flex justify-content-center align-items-center fw-bold fs-3 me-3 text-dark rank-circle">
            88
          </div>
          <div>
            <div className="fw-bold rank-label">Overall</div>
            <div className="fw-bold fs-4 text-uppercase text-dark">MASTER</div>
          </div>
        </div>
      </div>
    </div>
  );
}
