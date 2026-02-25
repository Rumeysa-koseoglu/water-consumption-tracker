import { CircleUserRound } from "lucide-react";

const Header: React.FC = () => {
  return (
    <div className=" w-full h-20 flex flex-row items-center justify-between p-4 sticky">
      <p
        className=" md:flex text-4xl lg:text-5xl  text-center text-[#84b0d3]
       font-bold font-bungee word-spacing-sm md:word-spacing"
      >
        WA
        <span className=" text-5xl lg:text-6xl text-[#13325b]">T</span>RACK
      </p>

      <button className="flex flex-row gap-3 items-center bg-[#2a507d] text-lg rounded-4xl py-2.5 pl-3 pr-4">
        <CircleUserRound className="text-[#13325b] size-7" /> Log out
      </button>
    </div>
  );
};

export default Header;
