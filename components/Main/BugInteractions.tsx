"use client"


import { Bug, User as UserDB, Comment as CommentDB, Share, Report } from "@prisma/client";
import BugRelevant from "./BugRelevant"
import {BsCodeSlash} from "react-icons/bs"
import {BsChatDots} from "react-icons/bs";
import {CiShare1} from "react-icons/ci";
import {AiOutlineAlert} from "react-icons/ai";
import BugComment from "./BugComment";
import BugShare from "./BugShare";
import BugReport from "./BugReport";
import { User } from "next-auth";
import BugPing from "./BugPing";

interface BugInteractionsProps{
  bug: Bug & {
    user: UserDB;
    shares: Array<Share & {user: UserDB}>;
    reports: Array<Report & {
      user: UserDB;
      bug: Bug ;
    }> | null;
    sharedFrom: UserDB | null;
    comments: Array<CommentDB & {
      user: UserDB
  }>;
  };
  user: User;
}

const BugInteractions:React.FC<BugInteractionsProps> = ({bug,user}) => {
  return (
    <div className="flex items-center justify-evenly">
        <BugRelevant icon={<BsCodeSlash/>} bug={bug} user={user}/>
        <BugComment icon={<BsChatDots/>} bug={bug} user={user}/>
        <BugShare icon={<CiShare1/>} bug={bug} user={user}/>
        <BugReport icon={<AiOutlineAlert/>} bug={bug} user={user}/>
        {bug.userId===user.id && 
          <BugPing bug={bug} user={user}/>
        }
    </div>
  )
}

export default BugInteractions