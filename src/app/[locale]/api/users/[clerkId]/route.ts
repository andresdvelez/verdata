import { getUserByClerkId } from "@/modules/prisma/lib/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ clerkId: string; locale: string }> }
) {
  try {
    const params = context.params;

    const id = (await params).clerkId;

    const user = await getUserByClerkId(id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
  }
}
