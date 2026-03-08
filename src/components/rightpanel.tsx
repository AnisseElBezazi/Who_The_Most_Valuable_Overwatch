"use client";
import React from "react";
import "./rightpanel.css";
import { calculatePlayerScore } from "@/algo/scoring";

export default function RightPanel({ logic }: { logic: any }) {
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
    error,
  } = logic;

  const score = calculatePlayerScore(
    playerStats?.[selectedHero?.key],
    selectedHero,
  );

  const timePlayedSeconds =
    playerStats?.[selectedHero?.key]?.game?.time_played || 0;
  const timePlayedHours = Math.round(timePlayedSeconds / 3600);

  return (
    <div className="d-flex flex-column align-items-end h-100">
      <div className="d-flex mb-3 shadow-sm mt-2 panel-search-right flex-shrink-0">
        <button
          className="bg-theme-gray search-submit-btn-right"
          onClick={() => handleSearch()}
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

      {error && (
        <div className="alert alert-warning border-warning p-3 mb-3 shadow-sm text-end alert-private-right">
          <div className="fw-bold mb-1">{error}</div>
          <div className="small">
            Pour mettre ta carrière en public :
            <br />
            <strong>
              Menu &gt; Options &gt; Social &gt; Visibilité du profil &gt;
              Public
            </strong>
            .
            <br />
            <span className="text-muted">
              Déconnecte-toi du jeu pour forcer la mise à jour Blizzard.
            </span>
          </div>
        </div>
      )}

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

      <div className="bg-white d-flex flex-column pt-4 pb-3 shadow-sm flex-grow-1 main-content-right overflow-hidden">
        <div className="main-content-inner-right flex-grow-1 d-flex flex-column overflow-hidden">
          <div className="mb-3 px-3 mt-2 text-end flex-shrink-0">
            <div className="d-flex align-items-baseline justify-content-end gap-4">
              <div className="text-secondary fw-bold time-played-text-right">
                {timePlayedHours}H
              </div>
              <div className="fw-bold text-uppercase text-dark lh-1 fs-2">
                {selectedHero?.name || "ANA"}
              </div>
            </div>
            <div className="fw-bold text-theme-gray">
              {typeof selectedHero?.role === "string"
                ? selectedHero.role.toUpperCase()
                : selectedHero?.role?.name?.toUpperCase() || "SUPPORT"}
            </div>
          </div>

          <div className="px-3 mt-2 w-100 ms-auto max-w-260 position-relative flex-shrink-0">
            <button
              onClick={() => setIsHeroGridOpen(!isHeroGridOpen)}
              className="btn w-100 d-flex justify-content-between align-items-center fw-bold mb-2 border rounded select-hero-btn"
            >
              SELECT HERO <span>{isHeroGridOpen ? "▲" : "▼"}</span>
            </button>

            {isHeroGridOpen && (
              <div className="hero-grid-dropdown-right p-1 border rounded bg-white overflow-auto shadow">
                {heroes.map((hero: any) => (
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

          <div className="px-3 mt-4 mb-auto w-100 ms-auto max-w-260 overflow-auto">
            {playerStats &&
            selectedHero &&
            playerStats[selectedHero.key]?.hero_specific ? (
              Object.entries(playerStats[selectedHero.key].hero_specific)
                .filter(
                  ([key]) =>
                    !key.includes("_most_in_game") &&
                    !key.includes("_avg_per_10_min"),
                )
                .map(([key, value]) => (
                  <StatLine
                    key={key}
                    label={key.replace(/_/g, " ").toUpperCase()}
                    value={value as number}
                  />
                ))
            ) : (
              <div className="text-muted small text-end py-3">
                Aucune donnée spécifique
              </div>
            )}
          </div>

          <div className="d-flex align-items-center px-3 mt-4 justify-content-end w-100 flex-shrink-0">
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
            <div className="rounded-circle border border-3 border-dark d-flex justify-content-center align-items-center fw-bold fs-3 text-dark rank-circle-right flex-shrink-0">
              {score || 0}
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
