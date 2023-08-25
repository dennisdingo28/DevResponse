"use client"


import { Bug, User as UserDB } from "@prisma/client";
import BugRelevant from "./BugRelevant"
import {BsCodeSlash} from "react-icons/bs"
import {BsChatDots} from "react-icons/bs";
import {CiShare1} from "react-icons/ci";
import {TfiStatsUp} from "react-icons/tfi";
import {AiOutlineAlert} from "react-icons/ai";
import BugComment from "./BugComment";
import BugShare from "./BugShare";
import BugStatistics from "./BugStatistics";
import BugReport from "./BugReport";
import { User } from "next-auth";

interface BugInteractionsProps{
  bug: Bug & {
    user: UserDB;
  };
  user: User;
}

const BugInteractions:React.FC<BugInteractionsProps> = ({bug,user}) => {
  return (
    <div className="flex items-center justify-evenly">
        <BugRelevant icon={<BsCodeSlash/>} bug={bug} user={user}/>
        <BugComment icon={<BsChatDots/>} comments={31}/>
        <BugShare icon={<CiShare1/>} shareNumber={23}/>
        <BugStatistics icon={<TfiStatsUp/>} viewedNumber={156}/>
        <BugReport icon={<AiOutlineAlert/>}/>
    </div>
  )
}

export default BugInteractions