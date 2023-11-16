import CreateCommunityForm from "@/components/CreateCommunityForm";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="container bg-white h-full flex item-center flex-col mx-auto max-w-2xl">
      <div className="border-b border-gray-800 px-4 font-bold text-xl py-2">
        Create a community
      </div>
      <div className="p-4 flex flex-col py-2">
        <p className="text-lg">Name</p>
        <p className="text-sm">
          Community names including capitalization cannot be changed.
        </p>
      </div>
      <CreateCommunityForm />
    </div>
  );
};

export default page;
