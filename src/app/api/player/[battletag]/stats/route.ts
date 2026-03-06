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

    const { searchParams } = new URL(request.url);
    const gamemode = searchParams.get("gamemode") || "quickplay";
    const hero = searchParams.get("hero") || "all-heroes";
    const platform = searchParams.get("platform") || "console";

    const formattedBattletag = battletag.replace("#", "-");
    const res = await fetch(
      `https://overfast-api.tekrop.fr/players/${formattedBattletag}/stats/career?gamemode=${gamemode}&platform=${platform}&hero=${hero}`,
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch player stats: ${res.status}`);
    }
    const data = await res.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des stats du joueur:", error);
    return NextResponse.json(
      { error: "Impossible de récupérer les stats du joueur" },
      { status: 500 },
    );
  }
}
