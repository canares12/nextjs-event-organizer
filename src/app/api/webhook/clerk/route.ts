import prisma from "@/lib/db/prisma";
import { handleError } from "@/lib/utils";
import { WebhookEvent, clerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(request: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await request.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;
  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, image_url, first_name, last_name, username } =
      evt.data;

    try {
      const user = await prisma.user.upsert({
        where: { clerkId: id },
        create: {
          clerkId: id,
          username: username ? username : "",
          email: email_addresses[0].email_address,
          firstName: first_name ? first_name : "",
          lastName: last_name ? last_name : "",
          photo: image_url,
        },
        update: {
          username: username ? username : "",
          firstName: first_name,
          lastName: last_name,
          photo: image_url,
        },
      });

      if (user && eventType === "user.created") {
        await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: {
            userId: user.id,
          },
        });
      }
      return NextResponse.json({ message: "OK", user: user });
    } catch (error) {
      handleError(error);
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    try {
      const deletedUser = await prisma.user.delete({
        where: { clerkId: id },
      });

      return NextResponse.json({ message: "OK", user: deletedUser });
    } catch (error) {
      handleError(error);
    }
  }

  return new Response("", { status: 200 });
}
