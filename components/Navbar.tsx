import { Bot } from "lucide-react";
import { FC } from "react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div className="">
      <Bot className="h-6 w-6" />
    </div>
  );
};

export default Navbar;
