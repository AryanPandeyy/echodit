import { NextRequest } from "next/server";
import { getAuthSession } from "../../auth/[...nextauth]/option";
import { SubRedditSubscriptionValidator } from "@/lib/validators/subreddit";
import { db } from "@/lib/db";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { subredditId } = SubRedditSubscriptionValidator.parse(body);
    const subscriptionExist = await db.subscription.findFirst({
      where: {
        userId: session.user.id,
        subbreaditId: subredditId,
      },
    });
    if (!subscriptionExist) {
      return new Response("You are already not joined to community", {
        status: 409,
      });
    }

    const creatorOfCommunity = await db.subbreadit.findFirst({
      where: {
        creatorId: session.user.id,
        id: subredditId,
      },
    });
    if (creatorOfCommunity) {
      return new Response("You cannot leave your own community", {
        status: 400,
      });
    }

    await db.subscription.delete({
      where: {
        userId_subbreaditId: {
          userId: session.user.id,
          subbreaditId: subredditId,
        },
      },
    });
    return new Response("Unsubscribed successfully");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
    return new Response("Could not leave Community: ", error, { status: 500 });
  }
}
