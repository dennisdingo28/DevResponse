"use client"

import useSocketStore, { initializeSocket } from "@/hooks/useSocket";
import { useEffect } from "react";


const Socket = () => {

    const socket = useSocketStore((state) => state.socket);

  useEffect(() => {
    if (!socket){
        const cleanup = initializeSocket();
        return ()=>{
            cleanup()
        }
    }
    
  }, []);


  return null;
}

export default Socket