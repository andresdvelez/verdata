import { SchematicClient } from "@schematichq/schematic-typescript-node";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.SCHEMATIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Schematic API key is not configured" },
        { status: 500 }
      );
    }

    const client = new SchematicClient({ apiKey });

    console.log(client, 'client')

    const plans = await client.plans.listPlans();

    console.log(plans, 'plans')

    return NextResponse.json(plans.data);
  } catch (error) {
    console.error("Error fetching plans from Schematic:", error);

    return NextResponse.json(
      { error: "Failed to fetch plans from Schematic" },
      { status: 500 }
    );
  }
}
