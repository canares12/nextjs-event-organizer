import prisma from "@/lib/db/prisma";
import { handleError } from "@/lib/utils";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

const webhookSecret = process.env.WEBHOOK_SECRET || "";

export async function POST(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  const wh = new Webhook(webhookSecret);
  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders,
    ) as WebhookEvent;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType = evt.type;
  if (eventType === "user.created" || eventType === "user.updated") {
    // const { id, ...attributes } = evt.data;
    const { id, email_addresses, image_url, first_name, last_name, username } =
      evt.data;

    try {
      await prisma.user.upsert({
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
    } catch (error) {
      handleError(error);
    }
  }
  return new Response("", { status: 200 });
}
