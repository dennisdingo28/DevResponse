"use client";
import { Bug } from "@prisma/client";
import { useSocketStore, initializeSocket } from "@/hooks/useSocket";
import { useEffect, useState } from "react";

interface BugsProps {
  bugs: Array<Bug>;
}
const Bugs: React.FC<BugsProps> = ({ bugs }) => {
  const [allBugs,setAllBugs] = useState(bugs);
  const socket = useSocketStore((state) => state.socket);

  useEffect(() => {
    if (!socket) initializeSocket();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("new_bug_client",msg=>{
      console.log("daraa",msg);
      setAllBugs([{id:"dingo",title:msg},...allBugs]);
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
