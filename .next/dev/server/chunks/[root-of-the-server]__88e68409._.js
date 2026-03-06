module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/services/api.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchPlayerStats",
    ()=>fetchPlayerStats
]);
async function fetchPlayerStats(battletag) {
    const formattedBattletag = battletag.replace("#", "-");
    try {
        // 1. Appel d'API pour les infos de base (avatar, pseudo...)
        const basicInfoResponse = await fetch(`https://overfast-api.tekrop.fr/players/${formattedBattletag}`);
        if (!basicInfoResponse.ok) {
            throw new Error(`Failed to fetch basic info: ${basicInfoResponse.status}`);
        }
        const basicInfo = await basicInfoResponse.json();
        // 2. Appel d'API pour les statistiques détaillées (summary)
        const statsResponse = await fetch(`https://overfast-api.tekrop.fr/players/${formattedBattletag}/stats/summary`);
        if (!statsResponse.ok) {
            throw new Error(`Failed to fetch stats: ${statsResponse.status}`);
        }
        const statsData = await statsResponse.json();
        // Mapping des données renvoyées par l'API de OverFast vers notre typage :
        // Extrait les statistiques génénrales ("total" stats du compte sur toutes les quickplay / compet)
        // OverFast renvoie généralement ces données dans 'general.total' et 'general.average' ou 'general.games_played'
        // Pour cet exercice, je pars des valeurs du "total" générales pour que tu aies la bonne logique:
        const baseStats = statsData?.general?.total || {};
        // Overwatch n'expose pas de manière triviale certains "totaux" comme "Objectif time" de manière globale parfois,
        // mais on les a souvent dans les career_stats de la requete de base.
        // Pour l'instant, je map tout ce que tu as listé avec ce qui est dispo dans "summary.general.total"
        // ou je fournis un fallback (0) si la donnée n'est dispo que dans les requêtes détaillées par héros/mode.
        const stats = {
            eliminations: baseStats.eliminations || 0,
            assists: baseStats.assists || 0,
            deaths: baseStats.deaths || 0,
            damageDealt: baseStats.damage || 0,
            healingDone: baseStats.healing || 0,
            // Ces statistiques spécifiques peuvent nescessiter de parser l'endpoint de base 'career_stats'
            // J'initialise à 0 pour l'instant car l'endpoint "summary" ne les fournit pas en dehors des stats heroes.
            ultimateUses: 0,
            criticalHits: 0,
            soloKills: 0,
            objectiveTime: 0,
            barrierDamage: 0
        };
        // Essayons de récupérer les stats avancées depuis l'endpoint de base (career_stats)
        // On parcourt TOUTES les plateformes, TOUS les modes, et TOUS les héros (pas que all-heroes)
        // Certaines stats comme "critical_hits" n'existent pas dans "all-heroes" mais sont présentes par héros.
        const platforms = [
            "pc",
            "console"
        ];
        const modes = [
            "quickplay",
            "competitive"
        ];
        for (const platform of platforms){
            for (const mode of modes){
                const careerStats = basicInfo?.stats?.[platform]?.[mode]?.career_stats;
                if (careerStats) {
                    for (const [heroName, categories] of Object.entries(careerStats)){
                        const isAllHeroes = heroName === "all-heroes";
                        // @ts-ignore
                        if (!Array.isArray(categories)) continue;
                        // @ts-ignore
                        for (const categoryItem of categories){
                            if (!categoryItem.stats) continue;
                            for (const stat of categoryItem.stats){
                                // Si on est dans "all-heroes", on prend certaines stats agrégées (Objective Time, Solo Kills)
                                if (isAllHeroes) {
                                    switch(stat.key){
                                        case "solo_kills":
                                            stats.soloKills += stat.value || 0;
                                            break;
                                        case "objective_time":
                                            stats.objectiveTime += stat.value || 0;
                                            break;
                                    }
                                } else {
                                    switch(stat.key){
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
            stats: stats
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
                barrierDamage: 0
            }
        };
    }
}
}),
"[project]/src/app/api/player/[battletag]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api.ts [app-route] (ecmascript)");
;
;
async function GET(request, { params }) {
    try {
        const battletag = (await params).battletag;
        if (!battletag) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Battletag manquant"
            }, {
                status: 400
            });
        }
        // Appel à notre service qui s'occupe de récupérer DÉFINITIVEMENT les stats du joueur
        const playerData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchPlayerStats"])(battletag);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(playerData, {
            status: 200
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Impossible de récupérer les statistiques du joueur"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__88e68409._.js.map