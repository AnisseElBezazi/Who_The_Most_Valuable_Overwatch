"use client";
import React, { useState } from "react";
import "./rightpanel.css";

export default function RightPanel() {
  const [isHeroGridOpen, setIsHeroGridOpen] = useState(true);

  return (
    <div className="d-flex flex-column h-100 align-items-end">
      <div className="d-flex mb-3 shadow-sm mt-2 panel-search-right">
        <div className="d-flex align-items-center justify-content-center bg-theme-gray search-icon-box-right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="text-white"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </div>
        <input
          type="text"
          className="form-control border-theme-gray border-start-0 search-input-box-right"
          placeholder="Pseudo#0000"
        />
      </div>

      <div className="mb-0 position-relative header-container-right">
        <div className="position-absolute top-0 end-0 bg-dark header-banner-right"></div>

        <div className="bg-white p-1 position-absolute header-avatar-right">
          <img
            src="https://clipartcraft.com/images/overwatch-logo-transparent-high-resolution-4.png"
            alt="Avatar"
            className="w-100 h-100 object-fit-cover"
          />
        </div>

        <div className="fw-bold fs-3 text-dark text-nowrap position-absolute top-50 translate-middle-y text-end header-pseudo-right">
          Genji92
        </div>
      </div>

      <div className="bg-white d-flex flex-column align-items-end pt-4 pb-3 shadow-sm flex-grow-1 main-content-right">
        <div className="mb-3 px-3 mt-2 text-end">
          <div className="fw-bold text-uppercase text-dark lh-1 hero-title-right">
            ANA
          </div>
          <div className="fw-bold text-theme-gray hero-subtitle-right">
            Support
          </div>
        </div>

        <div className="px-3 mt-2 hero-grid-wrapper-right w-100">
          <button
            onClick={() => setIsHeroGridOpen(!isHeroGridOpen)}
            className="btn w-100 d-flex justify-content-between align-items-center fw-bold mb-2 btn-hero-select-right"
          >
            SELECT HERO
            <span className="arrow-icon-right">
              {isHeroGridOpen ? "▲" : "▼"}
            </span>
          </button>

          {isHeroGridOpen && (
            <div className="d-flex flex-wrap border rounded p-1 bg-white justify-content-end grid-gap-right">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className={`hero-item-right ${i === 0 ? "active" : ""}`}
                >
                  <img
                    src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/985b06beae46b7ba3ca87d1512d0fc62ca7f206ceca58ef16fc44d43a1cc84ed.png"
                    alt={`hero-${i}`}
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-3 mt-4 mb-auto w-100 hero-grid-wrapper-right">
          <div className="d-flex justify-content-between mb-1">
            <span className="text-secondary fw-bold stat-text-right">
              Nano Boost Assists
            </span>
            <span className="fw-bold text-dark stat-text-right">4.5</span>
          </div>
          <div className="d-flex justify-content-between mb-1">
            <span className="text-secondary fw-bold stat-text-right">
              Sleep Dart Success Rate
            </span>
            <span className="fw-bold text-dark stat-text-right">45%</span>
          </div>
          <div className="d-flex justify-content-between mb-1">
            <span className="text-secondary fw-bold stat-text-right">
              Biotic Grenade Kills
            </span>
            <span className="fw-bold text-dark stat-text-right">12</span>
          </div>
          <div className="d-flex justify-content-between mb-1">
            <span className="text-secondary fw-bold stat-text-right">
              Unscoped Accuracy
            </span>
            <span className="fw-bold text-dark stat-text-right">62%</span>
          </div>
        </div>

        <div className="d-flex align-items-center px-3 mt-4 justify-content-end w-100">
          <div className="text-end me-3">
            <div className="fw-bold rank-label-right">Overall</div>
            <div className="fw-bold fs-4 text-uppercase text-dark">
              GRANDMASTER
            </div>
          </div>
          <div className="rounded-circle d-flex justify-content-center align-items-center fw-bold fs-3 text-dark rank-circle-right">
            88
          </div>
        </div>
      </div>
    </div>
  );
}
