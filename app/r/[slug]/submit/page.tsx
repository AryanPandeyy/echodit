import { getAuthSession } from "@/app/api/auth/[...nextauth]/option";
import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: {
    slug: string;
  };
}
const page: FC<pageProps> = async ({ params }) => {
  const subreddit = await db.subbreadit.findFirst({
    where: {
      name: params.slug,
    },
  });

  if (!subreddit) {
    notFound();
  }

  return (
    <div>
      <div className="flex flex-col justify-center border-b border-gray-200 pb-5">
        <div className="flex gap-1.5 mt-2">
          <div className="font-semibold text-gray-900">Create Post</div>
          <p className="text-gray-500">in r/{params.slug}</p>
        </div>
        {/* form */}
        <Editor subredditId={subreddit.id} />
        <div className="w-full mt-4 flex justify-end">
          <Button type="submit" className="w-full" form="echodit">
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
