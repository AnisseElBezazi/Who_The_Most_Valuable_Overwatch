import { NextResponse } from "next/server";
import { fetchPlayerStats } from "@/services/api";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ battletag: string }> },
) {
  try {
    const battletag = (await params).battletag;
    if (!battletag) {
      return NextResponse.json(
        { error: "Battletag manquant" },
        { status: 400 },
      );
    }

    const playerData = await fetchPlayerStats(battletag);

    return NextResponse.json(playerData, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    return NextResponse.json(
      { error: "Impossible de récupérer les statistiques du joueur" },
      { status: 500 },
    );
  }
}
