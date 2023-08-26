"use client";

import { Bug, User as UserDB } from "@prisma/client";
import { User } from "next-auth";
import { useMutation } from "@tanstack/react-query";
import markRelevant from "@/lib/api/markRelevant";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface BugRelevantProps {
  bug: Bug & {
    user: UserDB;
  };
  user: User;
  icon: React.ReactNode;
}

const BugRelevant: React.FC<BugRelevantProps> = ({ icon, bug , user }) => {
  
  const [relevantArr,setRelevantArr] = useState(bug.relevant);
  const [liked,setLiked] = useState(relevantArr.some(id=>id===user.id));

  useEffect(()=>{
    const userAlreadyLiked = relevantArr.some(id=>id===user.id);
    setLiked(userAlreadyLiked);
  },[relevantArr,bug.relevant])

  useEffect(()=>{
    markAsRelevant();
  },[relevantArr,bug.relevant,liked]);

  const {mutate: markAsRelevant} = useMutation({
    mutationFn: async()=>{
      await markRelevant(bug.id,relevantArr);
    },
    onError:()=>{
      toast.error("Something went wrong. Please try again later !");
    }
  });
  
  return (
    <div onClick={()=>{
        if(!liked){
          setRelevantArr(prev=>[...prev,user.id]);
          setLiked(true);
        }
        else{
          setRelevantArr(prev=>{
            return prev.filter(id=>id!==user.id);
          });
          setLiked(false);
        }
    }} className="flex items-center gap-1 group hover:bg-[rgba(29,183,107,.1)] p-1 rounded-full">
      <div className={`group-hover:text-[rgb(29,183,107)] ${!liked ? "text-gray-500":"text-[rgb(29,183,107)]"}`}>
        {icon}
      </div>
      <p className={`group-hover:text-darkGray duration-75 text-[.81em] ${!liked ? "text-gray-600":"text-darkGray font-bold"}`}>
        {relevantArr.length}
      </p>
    </div>
  );
};

export default BugRelevant;
