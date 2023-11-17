import { FC } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ImageIcon, Link2 } from "lucide-react";
import { Session } from "next-auth";

interface MiniCreatePostProps {
  session: Session | null;
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
  return (
    <div className="item-center container flex justify-start gap-6 h-full border border-gray-100 shadow bg-white px-6 py-4 rounded-md">
      <Avatar>
        {session?.user.image ? (
          <Image fill alt="pp" src={session?.user.image} />
        ) : (
          <AvatarFallback>{session?.user.name}</AvatarFallback>
        )}
      </Avatar>
      <Input className="" placeholder="Create post" />
      <Button variant={"ghost"}>
        <ImageIcon />
      </Button>
      <Button variant={"ghost"}>
        <Link2 />
      </Button>
    </div>
  );
};

export default MiniCreatePost;
