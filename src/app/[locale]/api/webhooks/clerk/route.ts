import { generateUniqueReferralCode } from "@/modules/core/lib/generateUniqueReferralCode";
import { createUser, deleteUser, updateUser } from "@/modules/prisma/lib/users";
import { WebhookEvent } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { Webhook } from "svix";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw Error(
      "Please add WEBHOOK_SECRET from Clerk dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = (await headerPayload).get("svix-id");
  const svix_timestamp = (await headerPayload).get("svix-timestamp");
  const svix_signature = (await headerPayload).get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    if (!id || !email_addresses || !email_addresses.length) {
      return new Response("Error occurred -- missing data", {
        status: 400,
      });
    }

    const email = email_addresses[0].email_address;

    const user = {
      clerk_id: id,
      email: email,
      firstName: first_name,
      lastName: last_name,
      imageUrl: image_url || null,
      referral_code: generateUniqueReferralCode(),
    };

    try {
      const { error } = await createUser(user as User);
      if (error) throw error;
      revalidatePath("/");
    } catch {
      return new Response("Error occurred", {
        status: 400,
      });
    }
  }

  if (eventType === "user.updated") {
    const { id, first_name, last_name, image_url } = evt.data;

    if (!id) {
      return new Response("Error occurred -- missing data", {
        status: 400,
      });
    }

    const data: Partial<User> = {
      ...(first_name ? { firstName: first_name } : {}),
      ...(last_name ? { lastName: last_name } : {}),
      ...(image_url ? { imageUrl: image_url } : {}),
    };

    try {
      await updateUser(id, data);
    } catch {
      return new Response("Error occurred", {
        status: 400,
      });
    }
  }

  // if (eventType === "session.created") {
  //   const { id } = evt.data;

  //   if (!id) {
  //     return new Response("Error occurred -- missing data", {
  //       status: 400,
  //     });
  //   }

  //   try {
  //     const userFromDB = await getUserByClerkId(id);
  //     console.log(userFromDB);
  //     useUserStore.getState().setUser(userFromDB);
  //     useUserStore.getState().setIsLoading(false);
  //   } catch {
  //     return new Response("Error occurred", {
  //       status: 400,
  //     });
  //   }
  // }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    if (!id) {
      return new Response("Error occurred -- missing data", {
        status: 400,
      });
    }

    try {
      const { error } = await deleteUser(id);
      if (error) throw error;
      revalidatePath("/");
    } catch {
      return new Response("Error occurred while deleting user", {
        status: 400,
      });
    }
  }

  return new Response("", { status: 200 });
}
