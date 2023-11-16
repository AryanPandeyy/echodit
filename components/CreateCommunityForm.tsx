"use client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FC, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CreateSubRedditPayload } from "@/lib/validators/subreddit";

interface ClientInputProps {}

const CreateCommunityForm: FC<ClientInputProps> = ({}) => {
  const [input, setInput] = useState<string>("");
  const { mutate: createCommunity } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubRedditPayload = {
        name: input,
      };
      const { data } = await axios.post("/api/subreddit", payload);
      return data as string;
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
        <Link className={buttonVariants()} href="/">
          Cancel
        </Link>
        <Button className="">Create Community</Button>
      </div>
    </>
  );
};

export default CreateCommunityForm;
