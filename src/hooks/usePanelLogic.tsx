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
        console.error("Erreur héros", e);
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
      console.error("Erreur détails", e);
    }
  }

  const handleSearch = async (tag?: string) => {
    // On force l'utilisation d'une string. Si tag est un event, on prend searchInput.
    const tagToUse = typeof tag === "string" ? tag : searchInput;
    if (!tagToUse || tagToUse.includes("[object")) return;

    const formatted = tagToUse.replace("#", "-");
    setSearchedBattletag(formatted);

    try {
      const resPlayer = await fetch(`/api/player/${formatted}/info`);
      if (resPlayer.ok) {
        const data = await resPlayer.json();
        setPlayerData(data);
      }
    } catch (e) {
      console.error("Erreur recherche", e);
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
      handleSearch(searchedBattletag.replace("-", "#"));
      setRefreshTrigger((prev) => prev + 1);
    }
  };

  const roleKey =
    typeof selectedHero?.role === "string"
      ? selectedHero.role.toLowerCase()
      : selectedHero?.role?.key?.toLowerCase() || "overall";

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
        roleKey
      ]?.division?.toUpperCase() || "UNRANKED",
    rankTier:
      playerData?.summary?.competitive?.[platform]?.[roleKey]?.tier || "",
    rankIcon:
      playerData?.summary?.competitive?.[platform]?.[roleKey]?.rank_icon || "",
  };
}
