"use client"

import useSocketStore from "@/hooks/useSocket";
import { useEffect, useState } from "react"

const NewResponses = () => {
  const [text,setText] = useState("");
  const socket = useSocketStore(state=>state.socket);

  useEffect(()=>{
    if(!socket) return;
    socket.on("new_response_client",(comment)=>{
      setText("new response");
    });
  },[socket]);

  return (
    <div>
        {text}
    </div>
  )
}

export default NewResponses