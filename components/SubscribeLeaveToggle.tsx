"use client";
import { FC, startTransition } from "react";
import { Button, buttonVariants } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { SubscribeToSubredditPayload } from "@/lib/validators/subreddit";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

interface SubscribeLeaveToggleProps {
  subredditId: string;
  isSubscribed: boolean;
  subredditName: string;
}

// <div className="flex flex-col px-6 gap-2 py-4">
//   <Link className={buttonVariants()} href="/">
//     Join to post
//   </Link>
//   <Link className={buttonVariants({ variant: "ghost" })} href="/">
//     Create a post
//   </Link>
// </div>
const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
  subredditId,
  isSubscribed,
  subredditName,
}) => {
  const router = useRouter();
  const subscribeMutate = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId: subredditId,
      };
      const { data } = await axios.post("/api/subreddit/subscribe", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err?.response?.status === 401) {
          const toastnotify = toast({
            title: "Login required",
            description: "You need to be logged in to do that",
            variant: "destructive",
            action: (
              <Link
                className={buttonVariants()}
                href="/sign-in"
                onClick={() => toastnotify.dismiss()}
              >
                Sign In
              </Link>
            ),
          });
          return toastnotify;
        }
        return toast({
          title: "There was a problem",
          description: "Something went wrong please try again.",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });
      return toast({
        title: "Subscribed",
        description: `You are now subscribed to r/${subredditName}`,
      });
    },
  });

  const unsubscribeMutate = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId: subredditId,
      };
      const {} = await axios.post("/api/subreddit/unsubscribe", payload);
      // return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err?.response?.status === 401) {
          const toastnotify = toast({
            title: "Login required",
            description: "You need to be logged in to do that",
            variant: "destructive",
            action: (
              <Link
                className={buttonVariants()}
                href="/sign-in"
                onClick={() => toastnotify.dismiss()}
              >
                Sign In
              </Link>
            ),
          });
          return toastnotify;
        }
        return toast({
          title: "There was a problem",
          description: "Something went wrong please try again.",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });
      return toast({
        title: "Unsubscribed",
        description: `You are now unsubscribed to r/${subredditName}`,
      });
    },
  });
  return isSubscribed ? (
    <div className="flex flex-col px-6 gap-2 py-4">
      <Button
        isLoading={unsubscribeMutate.isPending}
        onClick={() => unsubscribeMutate.mutate()}
      >
        Leave Community
      </Button>
    </div>
  ) : (
    <div className="flex flex-col px-6 gap-2 py-4">
      <Button
        onClick={() => subscribeMutate.mutate()}
        isLoading={subscribeMutate.isPending}
      >
        Join to post
      </Button>
    </div>
  );
};

export default SubscribeLeaveToggle;
