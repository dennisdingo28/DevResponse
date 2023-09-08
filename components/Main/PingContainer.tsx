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
    const [queue,setQueue] = useState<Array<PingedBug>>([]);
    const socket = useSocketStore(state=>state.socket);

    useEffect(()=>{
      if(!socket) return;
      socket.on("pingBug_client",payload=>{
        setQueue(prev=>[...prev,{bug:payload.bug}]);
      });
    
    },[socket]);

    useEffect(()=>{
      if(queue.length>0){
        const id = setInterval(()=>{
          setQueue(prev=>prev.slice(1));
        },5000);
  
        return ()=>{
          clearInterval(id);
        }
      }
    },[queue]);
   
  return (
    <div>
      {queue.length===0 ? 
        <div>
          <p className="text-center text-gray-600 text-sm italic">no current pings. wow :)</p>
        </div>
        :
        <div className="">
          <div className="flex">
              <UserProfile username={queue[0]?.bug.user.name} image={queue[0]?.bug.user.image}/>
          </div>
          <div className="pl-2">
              <h3 className="max-w-[120px] overflow-hidden truncate">{queue[0]?.bug.title}</h3>
              <p className="max-w-[150px] truncate overflow-hidden text-gray-500 text-sm">{queue[0]?.bug.description}</p>
          </div>
        </div>
      }
        
    </div>
  )
}

export default PingContainer