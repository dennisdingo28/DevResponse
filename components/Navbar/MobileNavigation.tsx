"use client"

import { useState } from "react";
import MobileNavbarLinks from "./MobileNavbarLinks";


const MobileNavigation = () => {
  const [navOpen,setNavOpen] = useState<boolean>(false);

  return (
    <div>
      <div className="cursor-pointer">
        <div className={`flex flex-col ${!navOpen ? "gap-[5px]":"gap-0"}`} onClick={()=>setNavOpen(!navOpen)}>
          <div className={`w-[25px] h-[2.2px] bg-white z-30 duration-200 ${navOpen && "line1"}`}></div>
          <div className={`w-[25px] h-[2.2px] bg-white z-30 duration-200 ${navOpen && "line2"}`}></div>
        </div>
      </div>

      <MobileNavbarLinks open={navOpen} setOpen={setNavOpen}/>
    </div>
  );
};

export default MobileNavigation;
