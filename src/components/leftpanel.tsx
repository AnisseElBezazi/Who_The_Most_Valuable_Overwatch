"use client";
import React from "react";
import "./leftpanel.css";
import { calculatePlayerScore } from "@/algo/scoring";

export default function LeftPanel({ logic }: { logic: any }) {
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
  } = logic;

  const score = calculatePlayerScore(
    playerStats?.[selectedHero?.key],
    selectedHero,
  );

  return (
    <div className="d-flex flex-column h-100">
      <div
        className="d-flex mb-3 shadow-sm mt-2 flex-shrink-0"
        style={{
          borderRadius: "4px",
          overflow: "hidden",
          border: "1px solid #F99E1A",
          backgroundColor: "white",
          width: "100%",
          maxWidth: "300px",
          marginRight: "20px",
        }}
      >
        <button
          className="bg-theme-orange border-0 d-flex align-items-center justify-content-center"
          onClick={handleSearch}
          style={{ width: "45px", flexShrink: 0, height: "38px" }}
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
          className="form-control border-0 shadow-none"
          placeholder="Pseudo#0000"
          style={{ borderRadius: "0", height: "38px", fontSize: "0.9rem" }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>

      <div className="mb-0 position-relative header-container flex-shrink-0">
        <div
          className="position-absolute top-0 start-0 header-banner"
          style={{
            backgroundImage: `url(${selectedHero?.backgrounds?.[2]?.url || selectedHero?.portrait || ""})`,
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
          }}
        ></div>
        <div className="bg-white p-1 position-absolute header-avatar overflow-hidden">
          <img
            src={
              playerData?.summary?.avatar ||
              "https://clipartcraft.com/images/overwatch-logo-transparent-high-resolution-4.png"
            }
            alt="Avatar"
            className="w-100 h-100 object-fit-cover"
          />
        </div>
        <div className="fw-bold fs-3 text-dark text-nowrap position-absolute top-50 translate-middle-y header-pseudo">
          {playerData?.summary?.username || "Player 1"}
        </div>
      </div>

      <div className="bg-white d-flex flex-column pt-4 pb-3 shadow-sm flex-grow-1 main-content overflow-hidden">
        <div className="mb-3 px-3 mt-2 flex-shrink-0">
          <div className="fw-bold text-uppercase text-dark lh-1 fs-2">
            {selectedHero?.name || "CASSIDY"}
          </div>
          <div className="fw-bold text-theme-orange">
            {typeof selectedHero?.role === "string"
              ? selectedHero.role.toUpperCase()
              : selectedHero?.role?.name?.toUpperCase() || "DAMAGE"}
          </div>
        </div>

        <div
          className="px-3 mt-2 w-100 select-hero-container position-relative flex-shrink-0"
          style={{ maxWidth: "260px" }}
        >
          <button
            onClick={() => setIsHeroGridOpen(!isHeroGridOpen)}
            className="btn w-100 d-flex justify-content-between align-items-center fw-bold mb-2 border rounded select-hero-btn"
            style={{ backgroundColor: "#d0d5d9", fontSize: "0.85rem" }}
          >
            SELECT HERO <span>{isHeroGridOpen ? "▲" : "▼"}</span>
          </button>

          {isHeroGridOpen && (
            <div
              className="hero-grid p-1 border rounded bg-white overflow-auto shadow"
              style={{
                maxHeight: "200px",
                position: "absolute",
                top: "100%",
                left: "15px",
                right: "15px",
                zIndex: 10,
              }}
            >
              {heroes.map((hero) => (
                <div
                  key={hero.key}
                  className={`hero-item ${hero.key === selectedHero?.key ? "active" : ""}`}
                  onClick={() => {
                    fetchHeroDetails(hero.key);
                    setIsHeroGridOpen(false);
                  }}
                  style={{ cursor: "pointer" }}
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

        <div
          className="px-3 mt-4 mb-auto w-100 stats-container overflow-auto"
          style={{ maxWidth: "260px" }}
        >
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
            <div className="text-muted small text-center py-3">
              Aucune donnée spécifique
            </div>
          )}
        </div>

        <div className="d-flex align-items-center px-3 mt-4 w-100 flex-shrink-0">
          <div
            className="rounded-circle border border-3 border-warning d-flex justify-content-center align-items-center fw-bold fs-3 me-3 text-dark rank-circle flex-shrink-0"
            style={{ width: "80px", height: "80px" }}
          >
            {score || 0}
          </div>
          <div className="me-3">
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
          {rankIcon && (
            <img
              src={rankIcon}
              alt="Rank"
              style={{ width: "40px", height: "40px", marginLeft: "auto" }}
            />
          )}
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
  <div className="d-flex justify-content-between mb-1 border-bottom border-light pb-1">
    <span
      className="text-secondary fw-bold fs-small-custom"
      style={{ fontSize: "0.75rem" }}
    >
      {label}
    </span>
    <span
      className="fw-bold text-dark fs-small-custom"
      style={{ fontSize: "0.75rem" }}
    >
      {value}
    </span>
  </div>
);
