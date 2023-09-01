"use client";
import useSocketStore from "@/hooks/useSocket";
import { pingBug } from "@/lib/pingBug";
import { Bug, User as UserDB, Share } from "@prisma/client";
import { User } from "next-auth";
import React, { useEffect } from "react";

interface BugPingProps {
  bug: Bug & {
    user: UserDB;
    shares: Array<Share & { user: UserDB }>;
    sharedFrom: UserDB | null;
  };
  user: User;
}

const BugPing: React.FC<BugPingProps> = ({user,bug}) => {
    
    const socket = useSocketStore(state=>state.socket);
    
    
    
    return (
    <div>
      <button onClick={()=>{
        pingBug({user,bug,socket});
      }} className="border-2 border-green-500 font-medium hover:bg-green-500 duration-150 p-1 rounded-md text-[.9em]">
        ping
      </button>
    </div>
  );
};

export default BugPing;
