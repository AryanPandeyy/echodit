"use client";
import React, { FC, useState } from "react";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";

import { Icons } from "./Icons";
import { Button } from "./ui/button";

interface UserAuthFormInterface extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormInterface> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const googleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (e) {
      console.log("ERROR: GOOGLE SIGN IN ERROR: ", e);
    } finally {
      setIsLoading(true);
    }
  };

  return (
    <div className={cn("", className)} {...props}>
      <Button className="w-full" onClick={googleSignIn}>
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
