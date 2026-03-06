"use client";
import React, { useState, useEffect } from "react";
import "./leftpanel.css";

export default function LeftPanel() {
  const [isHeroGridOpen, setIsHeroGridOpen] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [searchedBattletag, setSearchedBattletag] = useState("");
  const [playerData, setPlayerData] = useState<any>(null);
  const [playerStats, setPlayerStats] = useState<any>(null);
  const [heroes, setHeroes] = useState<any[]>([]);
  const [selectedHero, setSelectedHero] = useState<any>(null);

  useEffect(() => {
    async function fetchHeroes() {
      try {
        const res = await fetch("/api/heroes");
        const data = await res.json();
        setHeroes(data);
        if (data && data.length > 0) {
          setSelectedHero(data[0]);
        }
      } catch (e) {
        console.error("Failed to fetch heroes", e);
      }
    }
    fetchHeroes();
  }, []);

  const handleSearch = async () => {
    if (!searchInput) return;
    const formattedBattletag = searchInput.replace("#", "-");
    setSearchedBattletag(formattedBattletag);

    try {
      const resPlayer = await fetch(`/api/player/${formattedBattletag}/info`);
      const dataPlayer = await resPlayer.json();
      setPlayerData(dataPlayer);
    } catch (e) {
      console.error("Erreur lors de la récupération des infos du joueur", e);
    }
  };

  useEffect(() => {
    if (!searchedBattletag) return;

    async function fetchStats() {
      try {
        const gamemode = "quickplay";
        const heroQuery = selectedHero ? selectedHero.key : "all-heroes";
        const resStats = await fetch(
          `/api/player/${searchedBattletag}/stats?gamemode=${gamemode}&platform=console&hero=${heroQuery}`,
        );
        const dataStats = await resStats.json();
        setPlayerStats(dataStats);
      } catch (e) {
        console.error(
          "Erreur lors de la récupération des statistiques du joueur",
          e,
        );
      }
    }

    fetchStats();
  }, [searchedBattletag, selectedHero]);

  return (
    <div className="d-flex flex-column ">
      <div className="d-flex mb-3 shadow-sm mt-2 panel-search flex-shrink-0">
        <input
          type="text"
          className="form-control border-theme-orange search-input-box"
          placeholder="Pseudo#0000"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          className="bg-theme-orange search-submit-btn"
          onClick={handleSearch}
        >
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
              {heroes.map((hero, i) => (
                <div
                  key={hero.key}
                  className={`hero-item ${hero.key === selectedHero?.key ? "active" : ""}`}
                  onClick={() => setSelectedHero(hero)}
                  style={{ cursor: "pointer" }}
                  title={hero.name}
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

const StatLine = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="d-flex justify-content-between mb-1 border-bottom border-light pb-1">
    <span className="text-secondary fw-bold" style={{ fontSize: "0.75rem" }}>
      {label}
    </span>
    <span className="fw-bold text-dark" style={{ fontSize: "0.75rem" }}>
      {value}
    </span>
  </div>
);
