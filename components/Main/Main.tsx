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
        <div className="bg-blackBlue">
            <div className="flex">
                <div className="flex-1">
                    <h3>Links will be written here</h3>
                </div>
                <div className="flex-[2]">
                    <div className="">
                        <Header />
                    </div>
                    <div className="">
                        <BugsContainer />
                    </div>
                </div>
                
                <div className="flex-1 flex justify-end">
                    groups & chat will be here
                </div>
            </div>
        </div>
        
      </div>
  );
};

export default Main;
