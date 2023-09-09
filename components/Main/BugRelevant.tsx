"use client";

import { Bug, User as UserDB, Share } from "@prisma/client";
import { User } from "next-auth";
import { useMutation } from "@tanstack/react-query";
import markRelevant from "@/lib/api/markRelevant";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useSocketStore from "@/hooks/useSocket";

interface BugRelevantProps {
  bug: Bug & {
    user: UserDB;
    shares: Array<Share & {user: UserDB}>;
    sharedFrom: UserDB | null;
  };
  user: User;
  icon: React.ReactNode;
}

const BugRelevant: React.FC<BugRelevantProps> = ({ icon, bug , user }) => {
  
  const [liked,setLiked] = useState(bug.relevant.some(id=>id===user.id));
  const socket = useSocketStore(state=>state.socket);

  useEffect(()=>{
    const userAlreadyLiked = bug.relevant.some(userId=>userId===user.id);
    setLiked(userAlreadyLiked);
    markAsRelevant();
  },[bug.relevant]);  

  useEffect(()=>{
    if(socket){
      if(liked)
        socket.emit("new_bug_relevant",{userId:user.id,bugId:bug.id})
      else{
        socket.emit("new_bug_unrelevant",{userId:user.id,bugId:bug.id})
      }  
    }
  },[liked]);

  const {mutate: markAsRelevant} = useMutation({
    mutationFn: async()=>{
      await markRelevant(bug.id,bug.relevant);
    },
    onError:()=>{
      toast.error("Something went wrong. Please try again later !");
    }
  });
  
  return (
    <div onClick={(e)=>{
        e.stopPropagation();
        setLiked(!liked);
    }} className="flex items-center gap-1 group hover:bg-[rgba(29,183,107,.1)] duration-75 p-1 rounded-full">
      <div className={`group-hover:text-[rgb(29,183,107)] duration-75 ${!liked ? "text-gray-500":"text-[rgb(29,183,107)]"}`}>
        {icon}
      </div>
      <p className={`group-hover:text-darkGray duration-75 text-[.81em] ${!liked ? "text-gray-600":"text-darkGray font-bold"}`}>
        {bug.relevant.length}
      </p>
    </div>
  );
};

export default BugRelevant;
