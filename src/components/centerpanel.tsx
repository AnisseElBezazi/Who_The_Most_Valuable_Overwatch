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
  onUpdateStats: () => void;
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
  onUpdateStats,
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
    const leftWins = inverse ? leftRaw <= rightRaw : leftRaw >= rightRaw;

    return {
      label,
      leftVal: leftRaw.toLocaleString(),
      rightVal: rightRaw.toLocaleString(),
      leftPct: (leftRaw / max) * 100,
      rightPct: (rightRaw / max) * 100,
      leftWins,
    };
  };

  const stats = [
    getStatRow("WIN PERCENTAGE", "game", "win_percentage"),
    getStatRow("ELIMS PER LIFE", "average", "eliminations_per_life"),
    getStatRow("DEATHS AVG/10M", "average", "deaths_avg_per_10_min", true),
    getStatRow("FINAL BLOWS /10M", "average", "final_blows_avg_per_10_min"),
    getStatRow("HERO DMG /10M", "average", "hero_damage_done_avg_per_10_min"),
    getStatRow("HEALING AVG/10M", "average", "healing_done_avg_per_10_min"),
    getStatRow("ASSISTS AVG/10M", "average", "assists_avg_per_10_min"),
    getStatRow("SOLO KILLS /10M", "average", "solo_kills_avg_per_10_min"),
    getStatRow("OBJ TIME /10M", "average", "objective_time_avg_per_10_min"),
  ];

  return (
    <div className="bg-white d-flex flex-column px-4 py-3 center-panel-wrapper h-100">
      <div className="d-flex justify-content-between align-items-center mb-4 position-relative">
        <select
          className="form-select border-0 fw-bold text-uppercase gamemode-select"
          value={gamemode}
          onChange={(e) => onGamemodeChange(e.target.value)}
        >
          <option value="competitive">COMPETITIVE</option>
          <option value="quickplay">QUICKPLAY</option>
        </select>
        <button
          className="btn btn-update-stats text-uppercase position-absolute start-50 translate-middle-x mt-2"
          onClick={onUpdateStats}
        >
          UPDATE STATS
        </button>
        <div className="header-spacer"></div>
      </div>

      <div className="d-flex justify-content-center my-3">
        <img src="/logo_vs.png" alt="VS" className="vs-logo-img" />
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2 mt-3">
        <div className="d-flex align-items-center">
          <div
            className={`px-3 py-1 fw-bold switch-option ${leftPlatform === "console" ? "bg-console-orange text-dark rounded" : "text-secondary"}`}
            onClick={() => onLeftPlatformChange("console")}
          >
            Console
          </div>
          <div className="mx-1"></div>
          <div
            className={`px-3 py-1 fw-bold switch-option ${leftPlatform === "pc" ? "bg-console-orange text-dark rounded" : "text-secondary"}`}
            onClick={() => onLeftPlatformChange("pc")}
          >
            PC
          </div>
        </div>
        <div className="fw-bold text-uppercase">MATCH STATISTIQUES</div>
        <div className="d-flex align-items-center">
          <div
            className={`px-3 py-1 fw-bold switch-option ${rightPlatform === "console" ? "bg-console-orange text-dark rounded" : "text-secondary"}`}
            onClick={() => onRightPlatformChange("console")}
          >
            Console
          </div>
          <div className="mx-1"></div>
          <div
            className={`px-3 py-1 fw-bold switch-option ${rightPlatform === "pc" ? "bg-console-orange text-dark rounded" : "text-secondary"}`}
            onClick={() => onRightPlatformChange("pc")}
          >
            PC
          </div>
        </div>
      </div>

      <div className="stat-list-wrapper flex-grow-1 overflow-auto">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="d-flex align-items-center justify-content-between mb-3"
          >
            <div
              className={`fw-bold text-end stat-value-left ${stat.leftWins ? "text-orange-win" : "text-secondary"}`}
            >
              {stat.leftVal}
            </div>
            <div className="flex-grow-1 mx-3 bg-light rounded-pill stat-bar-container-left">
              <div
                className={`rounded-pill stat-bar-fill-left ${stat.leftWins ? "bg-orange-win" : "bg-gray-lose"}`}
                style={{ width: `${stat.leftPct}%` }}
              ></div>
            </div>
            <div className="fw-bold text-secondary text-center text-uppercase stat-row-label">
              {stat.label}
            </div>
            <div className="flex-grow-1 mx-3 bg-light rounded-pill stat-bar-container-right">
              <div
                className={`rounded-pill stat-bar-fill-right ${!stat.leftWins ? "bg-orange-win" : "bg-gray-lose"}`}
                style={{ width: `${stat.rightPct}%` }}
              ></div>
            </div>
            <div
              className={`fw-bold text-start stat-value-right ${!stat.leftWins ? "text-orange-win" : "text-secondary"}`}
            >
              {stat.rightVal}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
