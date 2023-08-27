"use client"
import { Bug, User as UserDB, Comment as CommentDB } from "@prisma/client";
import { User } from "next-auth";
import { useState } from "react";
import BugCommentModal from "./BugCommentModal";

interface BugCommentProps{
    icon: React.ReactNode;
    bug: Bug & {
      user: UserDB;
      comments: Array<CommentDB & {
        user: UserDB
    }>;
    };
    user: User;
}


const BugComment: React.FC<BugCommentProps> = ({icon,bug,user}) => {
  const [isOpen,setIsOpen] = useState(false);
  return (
    <div onClick={()=>setIsOpen(true)} className="flex items-center gap-1 group hover:bg-[rgba(45,102,239,.1)] duration-75 p-1 rounded-full">
        <BugCommentModal bug={bug} user={user} isOpen={isOpen} onClose={()=>setIsOpen(false)}/>
        <div className={`text-gray-500 group-hover:text-darkishBlue`}>
            {icon}
        </div>
        <p className={`text-gray-600 text-[.81em] group-hover:text-darkGray duration-75`}>{bug.comments?.length || 0}</p>
    </div>
  )
}

export default BugComment