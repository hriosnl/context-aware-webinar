import React from "react";

interface ShinyButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

const ShinyButton: React.FC<ShinyButtonProps> = ({ onClick, children }) => {
  return (
    <div className="relative p-4 rounded-3xl flex justify-center items-center gap-3">
      <div className="bg-gray-300 h-64 w-64 absolute rounded-3xl shadow-neutral-500 shadow-xl"></div>
      <button
        onClick={onClick}
        className="group cursor-pointer active:translate-y-[0.1rem] active:scale-[99%] transition duration-300 z-20 flex justify-center items-center relative h-12 w-36 rounded-full bg-gray-200 overflow-hidden"
      >
        {/* OUTER BLACK BORDER */}
        <div className="h-full w-full rounded-full bg-linear-to-b from-transparent bg-black to-transparent blur-[5px]"></div>

        {/* TOP OUTER HIGHLIGHT */}
        <div className="z-50 h-4 w-[8.3rem] flex justify-center items-center rounded-full absolute top-[0.8px] overflow-hidden">
          <div className="absolute h-12 w-[8.7rem] rounded-full -bottom-[2rem] bg-linear-to-b from-gray-200 to-60% to-transparent"></div>
        </div>

        {/* LEFT HIGHLIGHT */}
        <div className="absolute z-20 h-8 w-20 rounded-full left-1 bg-linear-to-r from-gray-300/80 to-5% to-transparent border-l-[0.5px] border-gray-400"></div>

        {/* RIGHT HIGHLIGHT */}
        <div className="absolute z-20 h-8 w-20 rounded-full right-1 bg-linear-to-l from-gray-300/80 to-10% to-transparent border-r-[0.5px] border-gray-400"></div>

        {/* BOTTOM OUTER HIGHLIGHT */}
        <div className="absolute z-20 h-16 w-[8.7rem] -translate-x-[0.15rem] rounded-full bottom-[1px] bg-linear-to-t from-gray-200/80 to-15% to-transparent"></div>

        {/* INNER BLACK BORDER */}
        <div className="absolute h-10 w-[8.3rem] rounded-full bg-black blur-[2px]"></div>

        {/* "TRANSPARENT" MIDDLE */}
        <div className="absolute z-20 h-10 w-[8.2rem] rounded-full bg-gray-700 overflow-hidden">
          <div className="absolute h-full w-full rounded-full bg-gray-400 blur-[1px]"></div>
        </div>
        <div className="absolute z-70 h-8 w-[6.2rem] rounded-full bg-gray-200 blur-md opacity-70"></div>

        {/* INNER HIGHLIGHTS */}
        {/* TOP */}
        <div className="absolute z-50 h-9 w-[8rem] rounded-full flex justify-center items-center overflow-hidden">
          <div className="absolute z-50 h-4 w-5 bg-gray-400 rotate-[-20deg] top-0 -left-1 blur-[0.5px]"></div>
          <div className="absolute z-20 h-3 w-32 bg-linear-to-b from-white from-80% top-0 left-3 skew-x-[20deg]"></div>
          <div className="absolute z-30 h-8 w-[7.9rem] rounded-full top-[0.2rem] -left-[0.1rem] bg-linear-to-b from-15% from-gray-400 to-20% to-transparent"></div>
          <div className="absolute z-40 h-7 w-[7.9rem] top-[0.2rem] scale-[93%] rounded-full flex justify-center items-center overflow-hidden">
            <div className="absolute z-20 h-3 w-32 bg-linear-to-b from-white from-60% top-0 left-3 skew-x-[20deg]"></div>
            <div className="absolute z-30 h-8 w-[7.8rem] rounded-full top-[0.4rem] -left-[0.02rem] bg-linear-to-b from-gray-400 to-30% to-transparent"></div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="absolute z-40 h-9 w-[8rem] rounded-full flex justify-center items-center overflow-hidden">
          <div className="absolute z-20 h-8 w-[7.6rem] rounded-full overflow-hidden bottom-[0.1rem]">
            <div className="absolute h-[0.55rem] w-[5.3rem] left-[1.3rem] bottom-0 bg-cyan-50/70 skew-x-[-10deg]"></div>
            <div className="absolute z-20 h-4 w-2 bg-gray-400 rotate-[-20deg] right-3 bottom-0"></div>
            <div className="absolute z-30 h-5 w-4 bg-gray-400 rotate-[-40deg] -right-2 bottom-0"></div>
            <div className="absolute z-30 h-8 w-[7rem] rounded-full bottom-[0.4rem] right-[0.3rem] bg-linear-to-t from-gray-400 from-30% to-transparent"></div>
            <div className="absolute z-20 h-4 w-5 bg-linear-to-tr from-cyan-50 rotate-[-20deg] -right-[0.15rem] bottom-0"></div>
            <div className="absolute z-40 h-4 w-2 bg-gray-400/80 rotate-[25deg] left-[0.rem] bottom-0"></div>
            <div className="absolute z-30 h-2 w-2 bg-cyan-50/80 rotate-[15deg] left-[0.4rem] bottom-0"></div>
          </div>
          <div className="absolute z-10 h-8 w-[7.5rem] rounded-full bottom-[0.3rem] bg-gray-400"></div>
          <div className="absolute h-[0.37rem] w-[5.5rem] bottom-0 bg-cyan-50 -skew-x-[10deg]"></div>
          <div className="absolute h-2 w-[1rem] bottom-[0.1rem] left-[0.2rem] rotate-[30deg] bg-linear-to-l from-cyan-50 from-70% skew-x-[20deg]"></div>
        </div>

        <div className="absolute z-20 h-6 w-[7rem] rounded-full bottom-[4px] bg-linear-to-t from-gray-200/80 to-15% to-transparent"></div>
        <div className="absolute z-20 h-6 w-[7.5rem] rounded-full bottom-[3px] bg-linear-to-t from-gray-200/80 to-15% to-transparent"></div>
        <div className="absolute z-20 h-8 w-[8rem] rounded-full bottom-[2px] bg-linear-to-t from-gray-200/80 to-15% to-transparent"></div>
        <div className="absolute z-50 h-8 w-[7rem] rounded-full bottom-[7px] bg-linear-to-t from-cyan-50/80 to-15% to-transparent"></div>

        {/* LIGHT COLORING */}
        <div className="absolute z-100 h-10 w-[95%] bg-linear-to-t from-cyan-300 to-transparent to-30% rounded-full bottom-0 blur-sm"></div>

        {children}
      </button>

      {/* SHADOWS */}
      <div className="absolute top-1/2 z-10 bg-gray-500 rounded-full h-12 w-36 blur-md"></div>
      <div className="absolute top-1/2 z-10 bg-gray-200 border-2 border-cyan-200 rounded-full h-11 w-28 blur-md"></div>
    </div>
  );
};

export default ShinyButton;
