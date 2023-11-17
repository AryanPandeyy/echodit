"use client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FC, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CreateSubRedditPayload } from "@/lib/validators/subreddit";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

interface ClientInputProps {}

const CreateCommunityForm: FC<ClientInputProps> = ({}) => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async () => {
      const payload: CreateSubRedditPayload = {
        name: input,
      };
      const { data } = await axios.post("/api/subreddit", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Community already exists.",
            description: "Please choose a different community name",
            variant: "destructive",
          });
        }
        if (err.response?.status === 422) {
          return toast({
            title: "Invalid community name",
            description: "Please choose a name between 3 and 21 characters",
            variant: "destructive",
          });
        }
        if (err.response?.status === 401) {
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
      }
    },
    onSuccess: (data) => {
      router.push(`/r/${data}`);
      toast({
        title: "Community created Successfully",
      });
    },
  });
  return (
    <>
      <div className="relative">
        <p className="text-zinc-400 border-r border-gray-100 absolute left-0 inset-y-0 grid place-items-center w-8">
          /r
        </p>
        <Input
          className="pl-10"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="m-2 justify-end flex gap-4">
        <Button className={buttonVariants()} onClick={() => router.back()}>
          Cancel
        </Button>
        <Button
          isLoading={mutation.isPending}
          disabled={input.length === 0}
          onClick={() => mutation.mutate()}
          className=""
        >
          Create Community
        </Button>
      </div>
    </>
  );
};

export default CreateCommunityForm;
