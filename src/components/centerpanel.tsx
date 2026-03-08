"use client";
import React from "react";
import "./centerpanel.css";

interface CenterPanelProps {
  leftStats: any;
  leftHero: string;
  rightStats: any;
  rightHero: string;
  gamemode: string;
  onGamemodeChange: (mode: string) => void;
  leftPlatform: string;
  onLeftPlatformChange: (platform: string) => void;
  rightPlatform: string;
  onRightPlatformChange: (platform: string) => void;
}

export default function CenterPanel({
  leftStats,
  leftHero,
  rightStats,
  rightHero,
  gamemode,
  onGamemodeChange,
  leftPlatform,
  onLeftPlatformChange,
  rightPlatform,
  onRightPlatformChange,
}: CenterPanelProps) {
  const getStatRow = (
    label: string,
    category: string,
    key: string,
    inverse: boolean = false,
  ) => {
    const leftRaw = leftStats?.[leftHero]?.[category]?.[key] || 0;
    const rightRaw = rightStats?.[rightHero]?.[category]?.[key] || 0;

    const max = Math.max(leftRaw, rightRaw, 1);
    const leftPct = (leftRaw / max) * 100;
    const rightPct = (rightRaw / max) * 100;

    const leftWins = inverse ? leftRaw <= rightRaw : leftRaw >= rightRaw;

    return {
      label,
      leftVal: leftRaw.toLocaleString(),
      rightVal: rightRaw.toLocaleString(),
      leftPct,
      rightPct,
      leftWins,
    };
  };

  const stats = [
    getStatRow("WIN PERCENTAGE", "game", "win_percentage"),
    getStatRow("ELIMS PER LIFE", "average", "eliminations_per_life"),
    getStatRow("DEATHS AVG/10M", "average", "deaths_avg_per_10_min", true),
    getStatRow("FINAL BLOWS /10M", "average", "final_blows_avg_per_10_min"),
    getStatRow("HERO DMG /10M", "average", "hero_damage_done_avg_per_10_min"),
    getStatRow(
      "DMG MITIGATED /10M",
      "average",
      "damage_mitigated_avg_per_10_min",
    ),
    getStatRow("HEALING AVG/10M", "average", "healing_done_avg_per_10_min"),
    getStatRow("ASSISTS AVG/10M", "average", "assists_avg_per_10_min"),
    getStatRow("SOLO KILLS /10M", "average", "solo_kills_avg_per_10_min"),
    getStatRow("OBJ TIME /10M", "average", "objective_time_avg_per_10_min"),
  ];

  return (
    <div className="bg-white d-flex flex-column px-4 py-3 position-relative center-panel-wrapper h-100">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-shrink-0 position-relative">
        <select
          className="form-select border-0 text-secondary fw-bold text-uppercase py-0 ps-0"
          style={{
            width: "150px",
            cursor: "pointer",
            boxShadow: "none",
            backgroundColor: "transparent",
            paddingRight: "25px",
          }}
          value={gamemode}
          onChange={(e) => onGamemodeChange(e.target.value)}
        >
          <option value="competitive">COMPETITIVE</option>
          <option value="quickplay">QUICKPLAY</option>
        </select>
        <button
          className="btn btn-update-stats text-uppercase position-absolute start-50 translate-middle-x mt-2"
          onClick={() => window.location.reload()}
        >
          UPDATE STATS
        </button>
        <div style={{ width: "150px" }}></div>
      </div>

      <div className="d-flex justify-content-center vs-logo-wrapper my-3 flex-shrink-0">
        <img
          src="/logo_vs.png"
          alt="VS"
          className="vs-logo-img"
          style={{ width: "80px" }}
        />
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2 flex-shrink-0 mt-5">
        <div className="d-flex align-items-center">
          <div
            className={`px-3 py-1 fw-bold switch-text switch-option ${leftPlatform === "console" ? "bg-console-orange text-dark rounded" : "text-secondary inactive"}`}
            onClick={() => onLeftPlatformChange("console")}
          >
            Console
          </div>
          <div className="switch-divider mx-1"></div>
          <div
            className={`px-3 py-1 fw-bold switch-text switch-option ${leftPlatform === "pc" ? "bg-console-orange text-dark rounded" : "text-secondary inactive"}`}
            onClick={() => onLeftPlatformChange("pc")}
          >
            PC
          </div>
        </div>

        <div className="fw-bold text-uppercase match-stats-title text-center">
          MATCH STATISTIQUES
        </div>

        <div className="d-flex align-items-center">
          <div
            className={`px-3 py-1 fw-bold switch-text switch-option ${rightPlatform === "console" ? "bg-console-orange text-dark rounded" : "text-secondary inactive"}`}
            onClick={() => onRightPlatformChange("console")}
          >
            Console
          </div>
          <div className="switch-divider mx-1"></div>
          <div
            className={`px-3 py-1 fw-bold switch-text switch-option ${rightPlatform === "pc" ? "bg-console-orange text-dark rounded" : "text-secondary inactive"}`}
            onClick={() => onRightPlatformChange("pc")}
          >
            PC
          </div>
        </div>
      </div>

      <div
        className="stat-list-wrapper flex-grow-1 overflow-auto"
        style={{ minHeight: 0 }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="d-flex align-items-center justify-content-between mb-3"
          >
            <div
              className={`fw-bold text-end stat-val ${stat.leftWins ? "text-orange-win" : "text-secondary"}`}
              style={{ width: "60px" }}
            >
              {stat.leftVal}
            </div>
            <div
              className="flex-grow-1 ms-3 me-4 bg-light rounded-pill d-flex justify-content-end"
              style={{ height: "10px" }}
            >
              <div
                className={`rounded-pill ${stat.leftWins ? "bg-orange-win" : "bg-gray-lose"}`}
                style={{ width: `${stat.leftPct}%`, transition: "width 0.4s" }}
              ></div>
            </div>

            <div
              className="fw-bold text-secondary text-center text-uppercase stat-label"
              style={{
                width: "140px",
                fontSize: "0.75rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={stat.label}
            >
              {stat.label}
            </div>

            <div
              className="flex-grow-1 ms-4 me-3 bg-light rounded-pill d-flex justify-content-start"
              style={{ height: "10px" }}
            >
              <div
                className={`rounded-pill ${!stat.leftWins ? "bg-orange-win" : "bg-gray-lose"}`}
                style={{ width: `${stat.rightPct}%`, transition: "width 0.4s" }}
              ></div>
            </div>
            <div
              className={`fw-bold text-start stat-val ${!stat.leftWins ? "text-orange-win" : "text-secondary"}`}
              style={{ width: "60px" }}
            >
              {stat.rightVal}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
