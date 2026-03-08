export const calculatePlayerScore = (stats: any, hero: any) => {
  if (!stats || !hero) return 0;

  const avg = stats.average;
  const game = stats.game;
  const role =
    typeof hero.role === "string"
      ? hero.role.toLowerCase()
      : hero.role?.key?.toLowerCase();

  let coeffs = {
    win: 0.1,
    elims: 0.15,
    deaths: 0.1,
    final: 0.1,
    dmg: 0.15,
    heal: 0.1,
    asst: 0.1,
    solo: 0.1,
    obj: 0.1,
  };

  if (role === "damage") {
    coeffs = {
      win: 0.1,
      elims: 0.1,
      deaths: 0.1,
      final: 0.25,
      dmg: 0.2,
      heal: 0,
      asst: 0.05,
      solo: 0.12,
      obj: 0.05,
    };
  } else if (role === "support") {
    coeffs = {
      win: 0.1,
      elims: 0.05,
      deaths: 0.15,
      final: 0.05,
      dmg: 0.05,
      heal: 0.35,
      asst: 0.2,
      solo: 0.02,
      obj: 0.03,
    };
  } else if (role === "tank") {
    coeffs = {
      win: 0.1,
      elims: 0.15,
      deaths: 0.1,
      final: 0.05,
      dmg: 0.2,
      heal: 0.05,
      asst: 0.25,
      solo: 0.05,
      obj: 0.05,
    };
  }

  const s = {
    win: game?.win_percentage || 0,
    elims: Math.min((avg?.eliminations_per_life || 0) * 16.66, 100),
    deaths: Math.max(100 - (avg?.deaths_avg_per_10_min || 0) * 8.33, 0),
    final: Math.min((avg?.final_blows_avg_per_10_min || 0) * 5, 100),
    dmg: Math.min((avg?.hero_damage_done_avg_per_10_min || 0) / 160, 100),
    heal: Math.min((avg?.healing_done_avg_per_10_min || 0) / 160, 100),
    asst: Math.min((avg?.assists_avg_per_10_min || 0) * 3.33, 100),
    solo: Math.min((avg?.solo_kills_avg_per_10_min || 0) * 12.5, 100),
    obj: Math.min((avg?.objective_time_avg_per_10_min || 0) / 2.4, 100),
  };

  const totalScore =
    s.win * coeffs.win +
    s.elims * coeffs.elims +
    s.deaths * coeffs.deaths +
    s.final * coeffs.final +
    s.dmg * coeffs.dmg +
    s.heal * coeffs.heal +
    s.asst * coeffs.asst +
    s.solo * coeffs.solo +
    s.obj * coeffs.obj;

  return Math.round(totalScore);
};
