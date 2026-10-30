"use client";
import { useState } from "react";
import LeftPanel from "@/components/leftpanel";
import CenterPanel from "@/components/centerpanel";
import RightPanel from "@/components/rightpanel";
import DemoModal, { DemoMatch } from "@/components/demomodal";
import { usePanelLogic } from "@/hooks/usePanelLogic";

export default function Page() {
  const [gamemode, setGamemode] = useState("competitive");
  const [leftPlatform, setLeftPlatform] = useState("console");
  const [rightPlatform, setRightPlatform] = useState("console");

  const leftLogic = usePanelLogic("cassidy", gamemode, leftPlatform);
  const rightLogic = usePanelLogic("ana", gamemode, rightPlatform);

  const handleUpdateAll = () => {
    leftLogic.refresh();
    rightLogic.refresh();
  };

  // Duel d'exemple : réglages, héros et recherche des deux joueurs
  const handleDemo = (match: DemoMatch) => {
    setGamemode(match.gamemode);
    setLeftPlatform(match.platform);
    setRightPlatform(match.platform);
    for (const [logic, player] of [
      [leftLogic, match.left],
      [rightLogic, match.right],
    ] as const) {
      logic.fetchHeroDetails(player.hero);
      logic.setSearchInput(player.name);
      logic.handleSearch(player.id);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-stretch w-100 vh-100 overflow-hidden"
      style={{ padding: "3vh 3vw" }}
    >
      <DemoModal onPick={handleDemo} />
      <LeftPanel logic={leftLogic} />
      <div className="flex-grow-1 h-100">
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
          onUpdateStats={handleUpdateAll}
        />
      </div>
      <RightPanel logic={rightLogic} />
    </div>
  );
}
