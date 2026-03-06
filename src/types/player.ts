export interface PlayerStats {
  eliminations: number;
  assists: number;
  deaths: number;
  damageDealt: number;
  healingDone: number;
  ultimateUses: number;
  criticalHits: number;
  soloKills: number;
  objectiveTime: number; // En secondes ou sous forme de chaîne formatée
  barrierDamage: number;
}

export interface PlayerProfile {
  battletag: string;
  portrait?: string;
  stats: PlayerStats;
}
