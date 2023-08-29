"use client"

import { useEffect, useState } from "react";
import { Bug, User as UserDB, Share } from "@prisma/client";
import { User } from "next-auth";
import ShareBugModal from "./ShareBugModal";

interface BugShareProps {
  bug: Bug & {
    user: UserDB;
    shares: Array<Share & {user: UserDB}>;
    sharedFrom: UserDB | null;
  };
  user: User;
  icon: React.ReactNode;
}

const BugShare: React.FC<BugShareProps> = ({icon,bug,user}) => {
  const [shared,setShared] = useState(false);
  const [isOpen,setIsOpen] = useState(false);

  useEffect(()=>{
    const userShared = bug.shares.some(share=>share.userId===user.id);
    setShared(userShared);
  },[bug]);


  return (
    <div onClick={()=>setIsOpen(true)} className="flex items-center gap-1 group hover:bg-[rgba(156,110,240,.1)] duration-75 p-1 rounded-full">
        <ShareBugModal isOpen={isOpen} bug={bug} user={user} onClose={()=>setIsOpen(false)}/>
        <div className={`group-hover:text-[rgb(125,87,195)] ${shared ? "text-[rgb(125,87,195)]":"text-gray-500"}`}>
            {icon}
        </div>
        <p className={`duration-150 text-[.81em] ${shared ? "text-white font-bold":"text-gray-600"}`}>{bug.shares?.length || 0}</p>
    </div>
  )
}

export default BugShare