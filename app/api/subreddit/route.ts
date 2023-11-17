import { SubtRedditValidator } from "@/lib/validators/subreddit";
import { NextRequest } from "next/server";
import { getAuthSession } from "../auth/[...nextauth]/option";
import { db } from "@/lib/db";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { name } = SubtRedditValidator.parse(body);
    const subRedditExist = await db.subbreadit.findFirst({
      where: {
        name: name,
      },
    });
    if (subRedditExist) {
      return new Response("Community Name Already Exist", { status: 409 });
    }
    const subreddit = await db.subbreadit.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    });
    await db.subscription.create({
      data: {
        userId: session.user.id,
        subbreaditId: subreddit.id,
      },
    });
    return new Response(subreddit.name);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
    return new Response("Could not create Community", { status: 500 });
  }
}
