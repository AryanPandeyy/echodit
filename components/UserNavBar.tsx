"use client";
import { User } from "next-auth";
import React, { FC } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarProps } from "@radix-ui/react-avatar";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface UserNavBarProps extends AvatarProps {
  user: User;
}

export const UserNavBar: FC<UserNavBarProps> = ({ user, ...props }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar {...props}>
          {user.image ? (
            <Image
              src={user.image}
              alt="profile-picture"
              fill={true}
              referrerPolicy="no-referrer"
            />
          ) : (
            <AvatarFallback>{user.name}</AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col justify-center space-y-1 leading-none">
            <p className="font-medium">{user.name}</p>
            <p className="w-[200px] truncate text-sm text-zinc-700">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/">Feed</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/r/create">Create Community</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            });
          }}
          className="cursor-pointer"
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
