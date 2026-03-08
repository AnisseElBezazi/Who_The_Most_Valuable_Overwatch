"use client";
import { useState } from "react";
import LeftPanel from "@/components/leftpanel";
import CenterPanel from "@/components/centerpanel";
import RightPanel from "@/components/rightpanel";
import { usePanelLogic } from "@/hooks/usePanelLogic";

export default function Page() {
  const [gamemode, setGamemode] = useState("competitive");
  const [leftPlatform, setLeftPlatform] = useState("console");
  const [rightPlatform, setRightPlatform] = useState("console");

  const leftLogic = usePanelLogic("cassidy", gamemode, leftPlatform);
  const rightLogic = usePanelLogic("ana", gamemode, rightPlatform);

  return (
    <div
      className="d-flex justify-content-center align-items-stretch w-100 vh-100 overflow-hidden"
      style={{ gap: "0px", padding: "3vh 3vw", boxSizing: "border-box" }}
    >
      <LeftPanel logic={leftLogic} />

      <div className="flex-grow-1 h-100" style={{ minWidth: 0 }}>
        <CenterPanel
          leftStats={leftLogic.playerStats}
          leftHero={leftLogic.selectedHero?.key}
          rightStats={rightLogic.playerStats}
          rightHero={rightLogic.selectedHero?.key}
          gamemode={gamemode}
          onGamemodeChange={setGamemode}
          leftPlatform={leftPlatform}
          onLeftPlatformChange={setLeftPlatform}
          rightPlatform={rightPlatform}
          onRightPlatformChange={setRightPlatform}
        />
      </div>
      <RightPanel logic={rightLogic} />
    </div>
  );
}
