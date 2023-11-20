import { getAuthSession } from "@/app/api/auth/[...nextauth]/option";
import SubscribeLeaveToggle from "@/components/SubscribeLeaveToggle";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC, ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
  params: {
    slug: string;
  };
}

const layout: FC<layoutProps> = async ({ children, params }) => {
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
        },
      },
    },
    take: 2,
  });
  const subscription = !session?.user
    ? undefined
    : await db.subscription.findFirst({
        where: {
          subbreadit: {
            name: subreddit?.name,
          },
          user: {
            id: session.user.id,
          },
        },
      });
  const isSubscribed = !!subscription;
  if (!subreddit) return notFound();
  const memberCount = await db.subscription.count({
    where: {
      subbreadit: {
        name: params.slug,
      },
    },
  });
  return (
    <div className="sm:container max-w-7xl mx-auto h-full pt-12">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
          <div className="space-y-2 col-span-2">{children}</div>
          <div className="hidden rounded-lg overflow-hidden h-fit border border-gray-200 md:order-last order-first md:block">
            <div className="px-6 py-4">
              <p className="font-semibold py-3">About r/ {params.slug}</p>
            </div>
            <div className="bg-white divide-y divide-gray-100 px-6 py-4 text-sm">
              <div className="flex gap-x-4 py-3 justify-between">
                <p className="text-gray-500">Created</p>
                <p className="text-gray-700">
                  {subreddit.createdAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex gap-x-4 py-3 justify-between">
                <p className="text-gray-500">Members</p>
                <p className="text-gray-700">{memberCount}</p>
              </div>
            </div>
            {subreddit.creatorId === session?.user.id ? (
              <div className="flex items-center px-6 py-4">
                <p className="text-gray-500">You created this community</p>
              </div>
            ) : (
              <SubscribeLeaveToggle
                isSubscribed={isSubscribed}
                subredditName={subreddit.name}
                subredditId={subreddit.id}
              />
            )}
            <div className="flex items-center px-6 py-4">
              <Link
                href={`/r/${params.slug}/submit`}
                className={buttonVariants({
                  variant: "outline",
                  className: "w-full",
                })}
              >
                Create Post
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
