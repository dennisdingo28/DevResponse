"use client"

import useSocketStore, { initializeSocket } from "@/hooks/useSocket";
import { useEffect } from "react";


interface SocketProps{
  id: string;
}

const Socket: React.FC<SocketProps> = ({id}) => {

    const socket = useSocketStore((state) => state.socket);

  useEffect(() => {
    if (!socket){
        const cleanup = initializeSocket(id);
        return ()=>{
            cleanup()
        }
    }
    
  }, []);


  return null;
}

export default Socket