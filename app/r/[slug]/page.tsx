import { getAuthSession } from "@/app/api/auth/[...nextauth]/option";
import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/db";
import { Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: { slug: string } }) => {
  const session = await getAuthSession();
  const subreddit = await db.subbreadit.findFirst({
    where: {
      name: params.slug,
    },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subbreadit: true,
        },
      },
      subscribers: true,
    },
    take: 2,
  });
  if (!subreddit) {
    return notFound();
  }
  // <Image
  //   src={session?.user.image}
  //   className="rounded"
  //   width={8}
  //   height={1}
  //   alt="Profile_Image"
  // />
  return (
    <div>
      <div className="text-3xl font-bold md:text-4xl h-14">
        r/ {params.slug}
      </div>
      <div className="pt-4 order-first sm:order-last grid md:grid-cols-3 gap-6 grid-cols-1">
        <div className="item-center container flex justify-start gap-6 h-full border border-gray-100 bg-white px-6 py-4 rounded-lg">
          <Input className="" />
          <div className="gap-1.5 item-center flex">
            <Icons.user />
            <Link2 />
          </div>
        </div>
        <div className="hidden md:block">
          <div>About r/ {params.slug}</div>
          <div>
            <p>Created at {subreddit.createdAt.toUTCString()}</p>
            <p>Members {subreddit.subscribers.length}</p>
          </div>
          <div>
            <Link className={buttonVariants()} href="/">
              Join to post
            </Link>
            <Link className={buttonVariants()} href="/">
              Create a post
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
