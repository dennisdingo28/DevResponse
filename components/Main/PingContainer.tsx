"use client"

import { Bug, User as UserDB, Comment as CommentDB, Share, Report } from "@prisma/client";
import useSocketStore from "@/hooks/useSocket";
import { useEffect, useState } from "react";
import UserProfile from "../ui/UserProfile";

interface PingedBug{
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
}

const PingContainer = () => {
    const [pingedBug,setPingedBug] = useState<PingedBug>();
    const socket = useSocketStore(state=>state.socket);

    useEffect(()=>{
      if(!socket) return;
      socket.on("pingBug_client",payload=>{
        setPingedBug({bug:payload.bug});
      });
    },[socket]);

  return (
    <div>
        <div className="flex">
            <UserProfile username={pingedBug?.bug.user.name} image={pingedBug?.bug.user.image}/>
        </div>
        <div className="pl-2">
            <h3 className="max-w-[120px] overflow-hidden truncate">{pingedBug?.bug.title}</h3>
            <p className="max-w-[150px] truncate overflow-hidden text-gray-500 text-sm">{pingedBug?.bug.description}</p>
        </div>
    </div>
  )
}

export default PingContainer