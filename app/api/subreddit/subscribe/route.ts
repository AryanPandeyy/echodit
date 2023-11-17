import { NextRequest } from "next/server";
import { getAuthSession } from "../../auth/[...nextauth]/option";
import {
  SubRedditSubscriptionValidator,
  SubtRedditValidator,
} from "@/lib/validators/subreddit";
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
        subbreaditId: subredditId,
        userId: session.user.id,
      },
    });
    if (subscriptionExist) {
      return new Response("You've already joined this community", {
        status: 400,
      });
    }
    await db.subscription.create({
      data: {
        subbreaditId: subredditId,
        userId: session.user.id,
      },
    });
    return new Response("Joined");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
    return new Response("Could not subscribe Community", { status: 500 });
  }
}
