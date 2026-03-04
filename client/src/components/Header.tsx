import { CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className=" w-full bg-[#182334] h-20 flex flex-row items-center justify-between p-3 pt-4 md:p-6 sticky top-0 z-0 mb-5 border-b border-b-[#21314d] shadow">
      <p
        className=" md:flex text-3xl lg:text-4xl  text-center text-[#9ec8fb]
       font-bold font-bungee word-spacing-sm md:word-spacing"
      >
        WA
        <span className=" text-4xl lg:text-5xl text-[#13325b]">T</span>RACK
      </p>

      <button
        className="flex flex-row gap-3 items-center bg-[#2a507d] text-base rounded-4xl py-2 pl-3 pr-5 cursor-pointer transition-all duration-200 ease-in-out hover:bg-blue-400 active:scale-95 active:bg-blue-500"
        onClick={handleLogout}
      >
        <CircleUserRound className="text-[#13325b] size-5 md:size-6" />
        <span className="text-[#bed6f5] text-sm md:text-base">Log out</span>
      </button>
    </div>
  );
};

export default Header;
