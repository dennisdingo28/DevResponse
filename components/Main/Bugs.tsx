"use client"

import { initializeSocket, useSocketStore } from "@/hooks/useSocket";
import { useEffect } from "react";

const Bugs = () => {
  const socket = useSocketStore((state) => state.socket);

   useEffect(() => {
    if (socket == null) return

    const cleanup = initializeSocket();

    socket.emit('new_bug',"bug post")

    return () => {
      cleanup();
    };
  }, [socket])

  
  return (
    <div>Bugs</div>
  )
}

export default Bugs