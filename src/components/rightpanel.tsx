"use client";
import React from "react";
import { usePanelLogic } from "@/hooks/usePanelLogic";
import "./rightpanel.css";

export default function RightPanel() {
  const {
    isHeroGridOpen,
    setIsHeroGridOpen,
    searchInput,
    setSearchInput,
    playerData,
    playerStats,
    heroes,
    selectedHero,
    handleSearch,
    fetchHeroDetails,
    rankDivision,
    rankTier,
    rankIcon,
  } = usePanelLogic("ana");

  return (
    <div className="d-flex flex-column align-items-end">
      <div className="d-flex mb-3 shadow-sm mt-2 panel-search-right flex-shrink-0">
        <button
          className="bg-theme-gray search-submit-btn-right"
          onClick={handleSearch}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="white"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
        <input
          type="text"
          className="form-control border-theme-gray search-input-box-right"
          placeholder="Pseudo#0000"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>

      <div className="mb-0 position-relative header-container-right flex-shrink-0">
        <div
          className="position-absolute top-0 end-0 header-banner-right"
          style={{
            backgroundImage: `url(${selectedHero?.backgrounds?.[2]?.url || selectedHero?.portrait || ""})`,
          }}
        ></div>
        <div className="bg-white p-1 position-absolute header-avatar-right overflow-hidden">
          <img
            src={
              playerData?.summary?.avatar ||
              "https://clipartcraft.com/images/overwatch-logo-transparent-high-resolution-4.png"
            }
            alt="Avatar"
            className="w-100 h-100 object-fit-cover"
          />
        </div>
        <div className="fw-bold fs-3 text-dark text-nowrap position-absolute top-50 translate-middle-y header-pseudo-right">
          {playerData?.summary?.username || "Player 2"}
        </div>
      </div>

      <div className="bg-white d-flex flex-column pt-4 pb-3 shadow-sm flex-grow-1 main-content-right">
        <div className="main-content-inner-right flex-grow-1 d-flex flex-column">
          <div className="mb-3 px-3 mt-2 text-end">
            <div className="fw-bold text-uppercase text-dark lh-1 fs-2">
              {selectedHero?.name || "ANA"}
            </div>
            <div className="fw-bold text-theme-gray">
              {typeof selectedHero?.role === "string"
                ? selectedHero.role.toUpperCase()
                : selectedHero?.role?.name?.toUpperCase() || "SUPPORT"}
            </div>
          </div>

          <div className="px-3 mt-2 w-100 ms-auto max-w-260">
            <button
              onClick={() => setIsHeroGridOpen(!isHeroGridOpen)}
              className="btn w-100 d-flex justify-content-between align-items-center fw-bold mb-2 border rounded select-hero-btn"
            >
              SELECT HERO <span>{isHeroGridOpen ? "▲" : "▼"}</span>
            </button>

            {isHeroGridOpen && (
              <div className="hero-grid-right p-1 border rounded bg-white overflow-auto">
                {heroes.map((hero) => (
                  <div
                    key={hero.key}
                    className={`hero-item-right ${hero.key === selectedHero?.key ? "active" : ""}`}
                    onClick={() => {
                      fetchHeroDetails(hero.key);
                      setIsHeroGridOpen(false);
                    }}
                  >
                    <img
                      src={hero.portrait}
                      alt={hero.name}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="px-3 mt-4 mb-auto w-100 ms-auto max-w-260">
            {playerStats ? (
              <>
                <StatLine
                  label="Eliminations"
                  value={playerStats.general?.eliminations || 0}
                />
                <StatLine
                  label="Deaths"
                  value={playerStats.general?.deaths || 0}
                />
                <StatLine
                  label="Win Rate"
                  value={`${playerStats.general?.win_rate || 0}%`}
                />
                <StatLine
                  label="Avg Damage"
                  value={playerStats.general?.damage_dealt || 0}
                />
              </>
            ) : (
              <div className="text-muted small text-end py-3">
                Aucune donnée
              </div>
            )}
          </div>

          <div className="d-flex align-items-center px-3 mt-4 justify-content-end w-100">
            {rankIcon && (
              <img src={rankIcon} alt="Rank" className="rank-icon-right me-2" />
            )}
            <div className="text-end me-3">
              <div className="fw-bold text-muted small text-uppercase">
                {typeof selectedHero?.role === "string"
                  ? selectedHero.role
                  : selectedHero?.role?.name || "OVERALL"}
              </div>
              <div className="fw-bold fs-4 text-dark">
                {rankDivision !== "UNRANKED"
                  ? `${rankDivision} ${rankTier}`
                  : rankDivision}
              </div>
            </div>
            <div className="rounded-circle border border-3 border-dark d-flex justify-content-center align-items-center fw-bold fs-3 text-dark rank-circle-right">
              0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StatLine = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="d-flex justify-content-between mb-1 border-bottom border-light pb-1 w-100">
    <span className="text-secondary fw-bold fs-small-custom">{label}</span>
    <span className="fw-bold text-dark fs-small-custom">{value}</span>
  </div>
);
