import { generateUniqueReferralCode } from "@/modules/core/lib/generateUniqueReferralCode";
import prisma from "@/modules/prisma/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const clerkId = searchParams.get("clerkId");
  const { userId: sid } = await auth();
  const clerkUser = await currentUser();

  // guard: make sure the IDs match
  if (!sid || sid !== clerkId || !clerkUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.upsert({
      where: { clerk_id: clerkId },
      create: {
        clerk_id: clerkId,
        email: clerkUser.emailAddresses[0].emailAddress,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        imageUrl: clerkUser.imageUrl,
        referral_code: generateUniqueReferralCode(),
      },
      update: {},
    });

    return NextResponse.json(user);
  } catch (err) {
    console.error("Upsert failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch or create user" },
      { status: 500 }
    );
  }
}
