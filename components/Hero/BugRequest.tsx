"use client"

import useSocketStore from "@/hooks/useSocket";
import { useEffect, useState } from "react";

interface BugRequestProps{
    bugsAmount: number;
}

const BugRequests: React.FC<BugRequestProps> = ({bugsAmount}) => {
  const [amount,setAmount] = useState(bugsAmount);
  const socket = useSocketStore((state)=>state.socket);

  useEffect(()=>{
    setAmount(bugsAmount)
  },[bugsAmount])

  
  useEffect(()=>{
    if (!socket) return;

    socket.on("new_bug_client_amount",(bug)=>{
      setAmount(prev=>prev+1);
    });
  },[socket]);

  return (
    <div className="flex">
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row">
            <h2 className="text-[1.7em] font-bold text-white sm:text-[2em] md:text-[2.5em] whitespace-nowrap">{amount} <span className="text-red-500">bugs</span></h2>
            <p className="text-slate-600 text-[1em] font-medium font-roboto -mt-1 self-center sm:mt-0 sm:self-end ml-2 md:self-center lg:self-end">ongoing</p>
        </div>
    </div>
  )
}

export default BugRequests