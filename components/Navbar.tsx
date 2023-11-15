import { Bot } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";

const Navbar = ({}) => {
  return (
    <div className="fixed top-0 p-2 left-0 right-0 flex h-fit bg-zinc-100 border-b border-zinc-300 justify-between">
      <div className="flex justify-between items-center">
        <Link className="items-center flex gap-2" href="/">
          <Bot className="h-8 w-8 sm:h-6 sm:w-6" />
          <p className="hidden font-medium text-zinc-700 md:block">Echodit</p>
        </Link>
      </div>
      <Link className={buttonVariants()} href="/sign-in">
        Sign In
      </Link>
    </div>
  );
};

export default Navbar;
