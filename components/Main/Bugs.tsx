"use client";
import { Bug } from "@prisma/client";
import { useSocketStore, initializeSocket } from "@/hooks/useSocket";
import { useEffect } from "react";

interface BugsProps {
  bugs: Array<Bug>;
}
const Bugs: React.FC<BugsProps> = ({ bugs }) => {
  const socket = useSocketStore((state) => state.socket);

  useEffect(() => {
    if (!socket) initializeSocket();
  }, []);

  useEffect(() => {
    if (!socket) return;

  }, [socket]);

  return (
    <div>
      {bugs.map((bug) => (
        <p key={bug.id}>{bug.title}</p>
      ))}
    </div>
  );
};

export default Bugs;
