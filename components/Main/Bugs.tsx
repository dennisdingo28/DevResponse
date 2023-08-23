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


  useEffect(() => {
    if (!socket) return;

    socket.on("new_bug_client",(bug)=>{
      console.log("daraa",bug);
      setAllBugs(prev=>[bug,...prev]);
    })


  }, [socket]);

  return (
    <div>
      {allBugs.map((bug) => (
        <Bug bug={bug}/>
      ))}
    </div>
  );
};

export default Bugs;
