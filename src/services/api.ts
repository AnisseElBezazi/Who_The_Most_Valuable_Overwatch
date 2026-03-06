import { PlayerProfile, PlayerStats } from "@/types/player";

export async function fetchPlayerStats(
  battletag: string,
): Promise<PlayerProfile> {
  const formattedBattletag = battletag.replace("#", "-");

  try {
    const basicInfoResponse = await fetch(
      `https://overfast-api.tekrop.fr/players/${formattedBattletag}`,
    );
    if (!basicInfoResponse.ok) {
      throw new Error(
        `Failed to fetch basic info: ${basicInfoResponse.status}`,
      );
    }
    const basicInfo = await basicInfoResponse.json();

    const statsResponse = await fetch(
      `https://overfast-api.tekrop.fr/players/${formattedBattletag}/stats/summary`,
    );
    if (!statsResponse.ok) {
      throw new Error(`Failed to fetch stats: ${statsResponse.status}`);
    }
    const statsData = await statsResponse.json();

    const baseStats = statsData?.general?.total || {};


    const stats: PlayerStats = {
      eliminations: baseStats.eliminations || 0,
      assists: baseStats.assists || 0,
      deaths: baseStats.deaths || 0,
      damageDealt: baseStats.damage || 0,
      healingDone: baseStats.healing || 0,

      ultimateUses: 0,
      criticalHits: 0,
      soloKills: 0,
      objectiveTime: 0,
      barrierDamage: 0,
    };

    const platforms = ["pc", "console"];
    const modes = ["quickplay", "competitive"];

    for (const platform of platforms) {
      for (const mode of modes) {
        const careerStats = basicInfo?.stats?.[platform]?.[mode]?.career_stats;

        if (careerStats) {
          for (const [heroName, categories] of Object.entries(careerStats)) {
            const isAllHeroes = heroName === "all-heroes";
            // @ts-ignore
            if (!Array.isArray(categories)) continue;

            // @ts-ignore
            for (const categoryItem of categories) {
              if (!categoryItem.stats) continue;
              for (const stat of categoryItem.stats) {
                // Si on est dans "all-heroes", on prend certaines stats agrégées (Objective Time, Solo Kills)
                if (isAllHeroes) {
                  switch (stat.key) {
                    case "solo_kills":
                      stats.soloKills += stat.value || 0;
                      break;
                    case "objective_time":
                      stats.objectiveTime += stat.value || 0;
                      break;
                  }
                }
                // Sinon on prend les stats qui N'Y SONT PAS (Critical Hits, Ultimes)
                else {
                  switch (stat.key) {
                    case "critical_hits":
                      stats.criticalHits += stat.value || 0;
                      break;
                    case "ultimate_uses":
                    case "ultimates_used":
                    case "ultimates_earned":
                      stats.ultimateUses += stat.value || 0;
                      break;
                    case "barrier_damage_done":
                      stats.barrierDamage += stat.value || 0;
                      break;
                  }
                }
              }
            }
          }
        }
      }
    }

    return {
      battletag: formattedBattletag,
      portrait: basicInfo?.summary?.avatar || null,
      stats: stats,
    };
  } catch (error) {
    console.error("Error fetching player stats:", error);
    // On retourne une structure vide par défaut en cas d'erreur de parsing ou autre
    return {
      battletag: formattedBattletag,
      portrait: "",
      stats: {
        eliminations: 0,
        assists: 0,
        deaths: 0,
        damageDealt: 0,
        healingDone: 0,
        ultimateUses: 0,
        criticalHits: 0,
        soloKills: 0,
        objectiveTime: 0,
        barrierDamage: 0,
      },
    };
  }
}
