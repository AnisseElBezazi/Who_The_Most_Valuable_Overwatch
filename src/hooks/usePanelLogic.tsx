import { useState, useEffect } from "react";

export function usePanelLogic(defaultHeroKey: string) {
  const [isHeroGridOpen, setIsHeroGridOpen] = useState(false);
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
      setSelectedHero(fullHeroData);
    } catch (e) {
      console.error("Erreur détails héros", e);
    }
  }

  const handleSearch = async () => {
    if (!searchInput) return;
    const formattedBattletag = searchInput.replace("#", "-");
    setSearchedBattletag(formattedBattletag);
    try {
      const resPlayer = await fetch(`/api/player/${formattedBattletag}/info`);
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
          `/api/player/${searchedBattletag}/stats?gamemode=quickplay&platform=console&hero=${selectedHero.key}`,
        );
        const dataStats = await resStats.json();
        setPlayerStats(dataStats);
      } catch (e) {
        console.error("Erreur stats", e);
      }
    }
    fetchStats();
  }, [searchedBattletag, selectedHero?.key]);

  let rankDivision = "UNRANKED";
  let rankTier = "";
  let rankIcon = "";

  if (playerData?.summary?.competitive && selectedHero?.role) {
    const roleKey =
      typeof selectedHero.role === "string"
        ? selectedHero.role.toLowerCase()
        : selectedHero.role?.key?.toLowerCase();

    const compInfo =
      playerData.summary.competitive.pc?.[roleKey] ||
      playerData.summary.competitive.console?.[roleKey];

    if (compInfo && compInfo.division) {
      rankDivision = compInfo.division.toUpperCase();
      rankTier = compInfo.tier;
      rankIcon = compInfo.rank_icon;
    }
  }

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
    rankDivision,
    rankTier,
    rankIcon,
  };
}
