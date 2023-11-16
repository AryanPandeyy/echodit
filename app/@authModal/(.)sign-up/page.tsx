import { SignUp } from "@/components/SignUp";
import { X } from "lucide-react";

const page = () => {
  return (
    <div className="fixed bg-zinc-900/20 z-10 inset-0">
      <div className="container max-w-lg h-full mx-auto flex items-center">
        <div className="relative bg-white w-full h-fit py-20 px-2 rounded-lg">
          <div className="absolute top-4 right-4">
            <a href="/">
              <X />
            </a>
          </div>
          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default page;
