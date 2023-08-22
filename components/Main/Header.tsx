"use client"

import useSocketStore from "@/hooks/useSocket";
import axios from "axios";
import { useEffect, useState } from "react"

const Header = () => {
  const socket = useSocketStore((state) => state.socket);


  const [bugTitle,setBugTitle] = useState<string>("");

  async function createBug(){
    try{
      
      const res = await axios.post('/api/bug',{title:bugTitle},{
        headers:{
          Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbm5pc2RpbmdvMjgiLCJlbWFpbCI6ImRlbm5pc21vbGRvdmFuMzJAZ21haWwuY29tIiwiaW1hZ2UiOiJodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTEyMDE1OTQ2P3Y9NCIsImlhdCI6MTY5MjY0NDAwOSwiZXhwIjoxNjk1MjM2MDA5fQ.Wp6PVnjlVke6YklfO5GJxeoZVSGW5hsX-R_R9v5bYhY`
        }
      });
      
      if(socket){
        socket.emit("new_bug",bugTitle,res.data.bug.id,res.data.bug.createdAt);
      }
    }catch(err){
      console.log("create bug error: ",err);
    }
  }

  return (
    <div>
      <input value={bugTitle} className="text-black" onChange={(e)=>setBugTitle(e.target.value)}/>
      <button onClick={createBug}>create bug</button>
    </div>
  )
}

export default Header