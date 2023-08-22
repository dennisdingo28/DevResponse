"use client"
import {MdOutlineTitle} from "react-icons/md";
import {LuSubtitles} from "react-icons/lu";
import { FaCode } from "react-icons/fa";
import useSocketStore from "@/hooks/useSocket";
import axios from "axios";
import { useState } from "react"

const HeaderInputs = () => {
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
        <div className="flex flex-col md:flex-row">
            <div className="flex-1">
                <div className="flex items-center">
                    <MdOutlineTitle/>
                    <input placeholder="Title your bug" className="bg-transparent outline-none text-darkGray font-medium placeholder:font-thin pl-1 w-full"/>
                </div>
                <div className="mt-2 flex">
                    <LuSubtitles className=""/>
                    <textarea className="w-full ml-1 bg-transparent rounded-sm resize-none outline-none px-1 text-gray-400 text-[.93em] placeholder:font-thin" placeholder="Say more about it" rows={4}>

                    </textarea>
                </div>
            </div>
            <div className="flex-1 p-2">
                <div className="flex items-center">
                    <FaCode/>
                    <h3 className="pl-1">Show your code</h3>
                </div>
            </div>
        </div>
  )
}

export default HeaderInputs