import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl">Your feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        <div className="border border-gray-200 h-fit order-first md:order-last rounded-lg ">
          <div className="flex gap-1.5 border-b font-semibold items-center border-gray-200 px-6 py-4 bg-emerald-100 p-4">
            <Home className="h-4 w-4" />
            Home
          </div>
          <p className="text-sm px-6 py-4 leading-6 gap-x-4 divide-gray-100 text-zinc-600">
            Your personal Breadit homepage. Come here to check in with your
            favorite communities.
          </p>
          <div className="px-4">
            <Link
              className={buttonVariants({
                className: "w-full mt-2 mb-6",
              })}
              href="/r/create"
            >
              Create communitiy
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
