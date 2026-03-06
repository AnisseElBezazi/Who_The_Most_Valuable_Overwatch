import { NextResponse } from "next/server";

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

    const formattedBattletag = battletag.replace("#", "-");
    const res = await fetch(
      `https://overfast-api.tekrop.fr/players/${formattedBattletag}`,
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch player info: ${res.status}`);
    }
    const data = await res.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des infos du joueur:", error);
    return NextResponse.json(
      { error: "Impossible de récupérer les infos du joueur" },
      { status: 500 },
    );
  }
}
