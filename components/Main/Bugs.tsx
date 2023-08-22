"use client";
import { Bug } from "@prisma/client";
import { useSocketStore } from "@/hooks/useSocket";
import { useEffect, useState } from "react";

interface BugsProps {
  bugs: Array<Bug>;
}
const Bugs: React.FC<BugsProps> = ({ bugs }) => {
  const [allBugs,setAllBugs] = useState(bugs);
  const socket = useSocketStore((state) => state.socket);


  useEffect(() => {
    if (!socket) return;

    socket.on("new_bug_client",(msg,id,createdAt)=>{
      console.log("daraa",msg,id);
      // setAllBugs(prev=>[{id,title:msg,createdAt},...prev]);
    })


  }, [socket]);

  return (
    <div>
      {allBugs.map((bug) => (
        <p key={bug.id}>{bug.title}</p>
      ))}
    </div>
  );
};

export default Bugs;
