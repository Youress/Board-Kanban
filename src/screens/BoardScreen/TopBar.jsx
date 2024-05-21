import React from "react";
import img from "../../assets/logo.svg";

const TopBar = ({open}) => {
  return (
    <header className="bg-[rgb(55,57,58)] text-white  shadow-md">
      <nav className="sm:h-[6.4rem] min-h-[4.8px] sm:px-10 flex items-center justify-between px-7">
        <img src={img} alt="logo" />
        <div className="flex items-center">
          <button onClick={open} className="bg-[rgb(190,164,255)] hover:bg-[rgb(176,146,254)] min-w-24 text-black font-bold text-xl py-[1rem] px-[1.6rem] font-sans">
            Create Borad
          </button>
          <button className=" min-w-24 font-bold text-2xl py-[1rem] px-[1.6rem] font-sans flex items-center gap-2 ml-3 hover:bg-gra">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
            </span>
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default TopBar;
