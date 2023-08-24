"use client";
import { Bug as BugDB, User } from "@prisma/client";
import { useSocketStore } from "@/hooks/useSocket";
import { useEffect, useState } from "react";
import Bug from "../ui/Bug";

interface BugsProps {
  bugs: Array<BugDB & {user: User}>;
}
const Bugs: React.FC<BugsProps> = ({ bugs }) => {
  const [allBugs,setAllBugs] = useState(bugs);
  const socket = useSocketStore((state) => state.socket);

  useEffect(()=>{
    setAllBugs(bugs);
  },[bugs]);

  useEffect(() => {
    if (!socket) return;

    socket.on("new_bug_client",(bug)=>{
      setAllBugs(prev=>[bug,...prev]);
    })

  }, [socket]);

  return (
    <div className="flex flex-col">
      {allBugs.map((bug,index) => (
          <Bug key={bug.id} bug={bug} index={index}/>
      ))}
    </div>
  );
};

export default Bugs;
