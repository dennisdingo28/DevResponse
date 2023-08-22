import React from "react";
import ActiveBugs from "./ActiveBugs";
import BugsContainer from "./BugsContainer";
import Header from "./Header";
import Socket from "./Socket";

const Main = () => {
  return (
      <div className="text-white flex flex-col gap-6">
        <Socket/>
        <div className="bg-blackBlue rounded-lg pb-2">
            <ActiveBugs/>
        </div>
        <div className="">
            <div className="">
                <Header />
            </div>
            <div className="">
                <BugsContainer />
            </div>
        </div>
        
      </div>
  );
};

export default Main;
