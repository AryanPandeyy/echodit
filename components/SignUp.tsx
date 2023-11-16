import { Bot } from "lucide-react";
import Link from "next/link";
import UserAuthForm from "./UserAuthForm";
export const SignUp = () => {
  return (
    <div className="container w-full flex flex-col justify-center text-center sm:w-[400px] space-y-2">
      <div>
        <Bot className="h-9 w-9 mx-auto" />
        <div className="text-2xl font-semibold tracking-tight">Sign Up</div>
      </div>
      <p className="text-sm mt-2 mx-auto">
        By continuing, you are setting up a Echodit account and agree to our
        User Agreement and Privacy Policy.
      </p>
      <UserAuthForm />
      <p className="px-8 text-center text-sm text-zinc-700">
        Already to have an account?{" "}
        <Link
          href="/sign-in"
          className="hover:text-zinc-800 underline underline-offset-4"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};
