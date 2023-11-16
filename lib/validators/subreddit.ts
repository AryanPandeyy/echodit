import { z } from "zod";
export const SubtRedditValidator = z.object({
  name: z.string().min(3).max(12),
});
export const SubRedditSubscriptionValidator = z.object({
  subredditId: z.string(),
});
export type CreateSubRedditPayload = z.infer<typeof SubtRedditValidator>;
export type SubscribeToSubredditPayload = z.infer<
  typeof SubRedditSubscriptionValidator
>;
