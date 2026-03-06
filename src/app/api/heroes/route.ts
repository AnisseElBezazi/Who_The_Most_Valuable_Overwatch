import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://overfast-api.tekrop.fr/heroes?locale=fr-fr&gamemode=quickplay",
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch heroes: ${res.status}`);
    }
    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des héros:", error);
    return NextResponse.json(
      { error: "Impossible de récupérer les héros" },
      { status: 500 },
    );
  }
}
