"use client";
import {
  Bug as BugDB,
  Comment as CommentDB,
  Share,
  User as UserDB,
} from "@prisma/client";
import { useSocketStore } from "@/hooks/useSocket";
import { useEffect, useState } from "react";
import Bug from "../ui/Bug";
import { User } from "next-auth";

interface BugsProps {
  bugs: Array<
    BugDB & {
      user: UserDB;
      sharedFrom: UserDB | null;
      shares: Array<Share & {user: UserDB}>;
      comments: Array<
        CommentDB & {
          user: UserDB;
        }
      >;
    }
  >;
  user: User;
}
const Bugs: React.FC<BugsProps> = ({ bugs, user }) => {
  const [allBugs, setAllBugs] = useState(bugs);
  const socket = useSocketStore((state) => state.socket);

  useEffect(() => {
    setAllBugs(bugs);
  }, [bugs]);

  useEffect(() => {
    if (!socket) return;

    socket.on("new_bug_client", (bug) => {
      setAllBugs((prev) => [bug, ...prev]);
    });
    socket.on("new_bug_relevant_client", (payload) => {
      setAllBugs((prev) => {
        return prev.map((bug) => {
          if (bug.id === payload.bugId) {
            const userAlreadyLiked = bug.relevant.some(
              (userId) => userId === payload.userId
            );
            if (!userAlreadyLiked)
              return {
                ...bug,
                relevant: [...bug.relevant, payload.userId],
              };
            return bug;
          }
          return bug;
        });
      });
    });
    socket.on("new_bug_unrelevant_client", (payload) => {
      setAllBugs((prev) => {
        return prev.map((bug) => {
          if (bug.id === payload.bugId) {
            return {
              ...bug,
              relevant: bug.relevant.filter(
                (userId) => userId !== payload.userId
              ),
            };
          }
          return bug;
        });
      });
    });

    socket.on("new_bug_comment_client",(payload)=>{
      setAllBugs(prev=>{
        return prev.map(bug=>{
          if(bug.id===payload.bugId){
            return {
              ...bug,
              comments:[payload,...bug?.comments],
            }
          }
          return bug;
        })
      })
    });

  }, [socket]);

  return (
    <div className="flex flex-col">
      {allBugs.map((bug, index) => (
        <Bug key={bug.id} bug={bug} user={user} index={index} />
      ))}
    </div>
  );
};

export default Bugs;
