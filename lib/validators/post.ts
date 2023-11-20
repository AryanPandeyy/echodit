import { z } from "zod";

export const PostValidator = z.object({
  title: z
    .string()
    .min(3, { message: "Title Must Be Of 3 Characters" })
    .max(21, { message: "Title must be atleast 21 characters" }),
  subredditId: z.string(),
  content: z.any(),
});

export type PostCreationRequest = z.infer<typeof PostValidator>;
