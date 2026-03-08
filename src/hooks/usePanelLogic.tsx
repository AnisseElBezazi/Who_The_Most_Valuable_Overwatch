import { useState, useEffect } from "react";

export function usePanelLogic(
  defaultHeroKey: string,
  gamemode: string,
  platform: string,
) {
  const [isHeroGridOpen, setIsHeroGridOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchedBattletag, setSearchedBattletag] = useState("");
  const [playerData, setPlayerData] = useState<any>(null);
  const [playerStats, setPlayerStats] = useState<any>(null);
  const [heroes, setHeroes] = useState<any[]>([]);
  const [selectedHero, setSelectedHero] = useState<any>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    async function fetchHeroes() {
      try {
        const res = await fetch("/api/heroes");
        const data = await res.json();
        setHeroes(data);
        const defaultHero =
          data.find((h: any) => h.key === defaultHeroKey) || data[0];
        fetchHeroDetails(defaultHero.key);
      } catch (e) {
        console.error("Failed to fetch heroes", e);
      }
    }
    fetchHeroes();
  }, [defaultHeroKey]);

  async function fetchHeroDetails(heroKey: string) {
    try {
      const res = await fetch(
        `https://overfast-api.tekrop.fr/heroes/${heroKey}?locale=fr-fr`,
      );
      const fullHeroData = await res.json();
      setSelectedHero({ ...fullHeroData, key: heroKey });
    } catch (e) {
      console.error("Erreur détails héros", e);
    }
  }

  const handleSearch = async (tag?: string) => {
    const targetTag = tag || searchInput.replace("#", "-");
    if (!targetTag) return;

    setSearchedBattletag(targetTag);
    try {
      const resPlayer = await fetch(`/api/player/${targetTag}/info`);
      const data = await resPlayer.json();
      setPlayerData(data);
    } catch (e) {
      console.error("Erreur joueur", e);
    }
  };

  useEffect(() => {
    if (!searchedBattletag || !selectedHero) return;
    async function fetchStats() {
      try {
        const resStats = await fetch(
          `/api/player/${searchedBattletag}/stats?gamemode=${gamemode}&platform=${platform}&hero=${selectedHero.key}`,
        );
        const dataStats = await resStats.json();
        setPlayerStats(dataStats);
      } catch (e) {
        console.error("Erreur stats", e);
      }
    }
    fetchStats();
  }, [
    searchedBattletag,
    selectedHero?.key,
    gamemode,
    platform,
    refreshTrigger,
  ]);

  const refresh = () => {
    if (searchedBattletag) {
      handleSearch(searchedBattletag);
      setRefreshTrigger((prev) => prev + 1);
    }
  };

  return {
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
    refresh,
    rankDivision:
      playerData?.summary?.competitive?.[platform]?.[
        selectedHero?.role?.toLowerCase()
      ]?.division?.toUpperCase() || "UNRANKED",
    rankTier:
      playerData?.summary?.competitive?.[platform]?.[
        selectedHero?.role?.toLowerCase()
      ]?.tier || "",
    rankIcon:
      playerData?.summary?.competitive?.[platform]?.[
        selectedHero?.role?.toLowerCase()
      ]?.rank_icon || "",
  };
}
