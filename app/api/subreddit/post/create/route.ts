import { NextRequest } from "next/server";
import { SubRedditSubscriptionValidator } from "@/lib/validators/subreddit";
import { db } from "@/lib/db";
import { z } from "zod";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/option";
import { PostValidator } from "@/lib/validators/post";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { subredditId, title, content } = PostValidator.parse(body);
    const subscriptionExist = await db.subscription.findFirst({
      where: {
        subbreaditId: subredditId,
        userId: session.user.id,
      },
    });
    if (!subscriptionExist) {
      return new Response("Subscribe to post", {
        status: 400,
      });
    }
    await db.post.create({
      data: {
        subbreaditId: subredditId,
        content,
        title,
        authorId: session.user.id,
      },
    });
    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
    return new Response("Could not create post", { status: 500 });
  }
}
