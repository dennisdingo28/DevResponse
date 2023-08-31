"use client"
import { Bug, User as UserDB, Comment as CommentDB,Share } from "@prisma/client";
import { User } from "next-auth";
import { useEffect, useState } from "react";
import BugCommentModal from "./BugCommentModal";

interface BugCommentProps{
    icon: React.ReactNode;
    bug: Bug & {
      user: UserDB;
      shares: Array<Share & {user: UserDB}>;
      sharedFrom: UserDB | null;
      comments: Array<CommentDB & {
        user: UserDB
    }>;
    };
    user: User;
}


const BugComment: React.FC<BugCommentProps> = ({icon,bug,user}) => {
  const [isOpen,setIsOpen] = useState(false);
  const [commented,setCommented] = useState(bug.comments?.some(comment=>comment.userId===user.id) || false);

  useEffect(()=>{
    setCommented(bug.comments?.some(comment=>comment.userId===user.id) || false);
  },[bug,bug.comments]);
  return (
    <div onClick={()=>setIsOpen(true)} className="flex items-center gap-1 group hover:bg-[rgba(45,102,239,.1)] duration-75 p-1 rounded-full">
        <BugCommentModal bug={bug} user={user} isOpen={isOpen} onClose={()=>setIsOpen(false)}/>
        <div className={`group-hover:text-darkishBlue ${!commented ? "text-gray-500":"text-darkishBlue"}`}>
            {icon}
        </div>
        <p className={`text-[.81em] group-hover:text-darkGray duration-75 ${!commented ? "text-gray-600":"text-white font-bold"}`}>{bug.comments?.length || 0}</p>
    </div>
  )
}

export default BugComment