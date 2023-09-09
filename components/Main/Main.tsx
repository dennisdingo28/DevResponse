import React from "react";
import BugsContainer from "./BugsContainer";
import Header from "./Header";
import SocketContainer from "./SocketContainer";
import ActiveBugsContainer from "./ActiveBugsContainer";
import LeftLinks from "./LeftLinks";

interface MainProps{
    query: any;
}
const Main: React.FC<MainProps> = ({query}) => {
  return (
      <div className="text-white flex flex-col gap-6">
        <SocketContainer/>
        <div className="bg-blackBlue rounded-lg pb-2">
            <ActiveBugsContainer/>
        </div>
        <div className="bg-blackBlue">
            <div className="flex">
                <div className="flex-1 border-r-2 border-r-[#191d4d]">
                    <LeftLinks/>
                </div>
                <div className="flex-[2]">
                    <div className="border-b-2 border-b-[#191d4d] pb-2">
                        <Header />
                    </div>
                    <div className="">
                        <BugsContainer query={query}/>
                    </div>
                </div>
                
                <div className="flex-1 flex justify-end border-l-2 border-l-[#191d4d]">
                    groups & chat will be here
                </div>
            </div>
        </div>
        
      </div>
  );
};

export default Main;
