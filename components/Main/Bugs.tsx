"use client";
import { Bug as BugDB, User as UserDB } from "@prisma/client";
import { useSocketStore } from "@/hooks/useSocket";
import { useEffect, useState } from "react";
import Bug from "../ui/Bug";
import { User } from "next-auth";

interface BugsProps {
  bugs: Array<BugDB & {user: UserDB}>;
  user: User
}
const Bugs: React.FC<BugsProps> = ({ bugs,user }) => {
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
          <Bug key={bug.id} bug={bug} user={user} index={index}/>
      ))}
    </div>
  );
};

export default Bugs;
