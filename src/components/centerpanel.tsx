"use client";
import React from "react";
import "./centerpanel.css";

export default function CenterPanel() {
  const stats = [
    {
      label: "ELIMINATIONS",
      leftVal: "42",
      leftPct: 80,
      rightVal: "28",
      rightPct: 40,
      leftWins: true,
    },
    {
      label: "ASSISTS",
      leftVal: "12",
      leftPct: 20,
      rightVal: "34",
      rightPct: 80,
      leftWins: false,
    },
    {
      label: "DEATHS",
      leftVal: "5",
      leftPct: 15,
      rightVal: "8",
      rightPct: 25,
      leftWins: true,
    },
    {
      label: "DAMAGE DEALT",
      leftVal: "14.2k",
      leftPct: 90,
      rightVal: "6.8k",
      rightPct: 45,
      leftWins: true,
    },
    {
      label: "HEALING DONE",
      leftVal: "0",
      leftPct: 0,
      rightVal: "11.5k",
      rightPct: 100,
      leftWins: false,
    },
    {
      label: "ULTIMATE USES",
      leftVal: "6",
      leftPct: 60,
      rightVal: "4",
      rightPct: 40,
      leftWins: true,
    },
    {
      label: "CRITICAL HITS",
      leftVal: "54",
      leftPct: 85,
      rightVal: "12",
      rightPct: 20,
      leftWins: true,
    },
    {
      label: "SOLO KILLS",
      leftVal: "18",
      leftPct: 75,
      rightVal: "2",
      rightPct: 10,
      leftWins: true,
    },
    {
      label: "OBJECTIVE TIME",
      leftVal: "1:24",
      leftPct: 35,
      rightVal: "2:45",
      rightPct: 85,
      leftWins: false,
    },
    {
      label: "BARRIER DAMAGE",
      leftVal: "2.1k",
      leftPct: 40,
      rightVal: "0.5k",
      rightPct: 10,
      leftWins: true,
    },
  ];

  return (
    <div className="bg-white d-flex flex-column h-100 px-4 py-3 position-relative center-panel-wrapper">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="text-secondary fw-bold gamemode-text">
          GameMode <span className="gamemode-icon">▼</span>
        </div>
        <button className="btn fw-bold btn-update-stats">UPDATE STATS</button>
        <div className="spacer-80"></div>
      </div>
      <div className="position-absolute start-50 translate-middle vs-logo-wrapper">
        <img src="/logo_vs.png" alt="VS" className="vs-logo-img" />
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2 match-header-wrapper">
        <div className="d-flex align-items-center fw-bold switch-text">
          <span className="px-2 py-1 bg-console-orange text-dark switch-option active">
            Console
          </span>
          <div className="switch-divider"></div>
          <span className="px-2 py-1 switch-option inactive">PC</span>
        </div>

        <div className="fw-bold text-uppercase match-stats-title">
          MATCH STATISTIQUES
        </div>

        <div className="d-flex align-items-center fw-bold switch-text">
          <span className="px-2 py-1 bg-console-orange text-dark switch-option active">
            Console
          </span>
          <div className="switch-divider"></div>
          <span className="px-2 py-1 switch-option inactive">PC</span>
        </div>
      </div>

      <div className="d-flex flex-column stat-list-wrapper">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="d-flex align-items-center justify-content-between"
          >
            <div
              className={`fw-bold text-end stat-val ${stat.leftWins ? "text-orange-win" : "text-secondary"}`}
            >
              {stat.leftVal}
            </div>

            <div className="flex-grow-1 ms-3 me-4 bg-light rounded-pill d-flex justify-content-end stat-bar-wrapper">
              <div
                className={`rounded-pill ${stat.leftWins ? "bg-orange-win" : "bg-gray-lose"}`}
                style={{ width: `${stat.leftPct}%` }}
              ></div>
            </div>

            <div className="fw-bold text-secondary text-center text-uppercase stat-label">
              {stat.label}
            </div>

            <div className="flex-grow-1 ms-4 me-3 bg-light rounded-pill d-flex justify-content-start stat-bar-wrapper">
              <div
                className={`rounded-pill ${!stat.leftWins ? "bg-orange-win" : "bg-gray-lose"}`}
                style={{ width: `${stat.rightPct}%` }}
              ></div>
            </div>

            <div
              className={`fw-bold text-start stat-val ${!stat.leftWins ? "text-orange-win" : "text-secondary"}`}
            >
              {stat.rightVal}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
