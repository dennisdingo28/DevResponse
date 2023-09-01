"use client";

import { Response } from "@/types";
import useSocketStore from "@/hooks/useSocket";
import { useEffect, useState } from "react";
import UserProfile from "../ui/UserProfile";
import { toast } from "react-hot-toast";
import formatElapsedTime from "@/lib/utils/formatTime";

const LiveResponses = () => {
  const [responses, setResponses] = useState<Array<Response>>([]);
  const socket = useSocketStore((state) => state.socket);

  useEffect(() => {
    if (!socket) return;
    socket.on("new_response_client", (payload: Response) => {
      console.log(payload);
      toast.success(`New response from ${payload.from.name}`)
      setResponses((prev) => {
        return [payload,...prev];
      });
    });
    },[socket]);

  return (
    <div>
      <h3 className='font-bold text-[1.2em] text-center'>Live Responses ({responses.length || 0})</h3>
      {responses &&
        responses.length > 0 &&
        <div className="flex flex-col gap-4 max-h-[315px] overflow-y-scroll overflowContainer">
         {responses.map((response) => {
          return (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {response.from?.image && response.from?.image.trim() !== "" && (
                    <UserProfile image={response.from?.image} />
                  )}
                  <p>{response.from?.name}</p>
                </div>
                <p className="max-w-[200px] truncate text-gray-400">{response.comment}</p>
              </div>
              
                <div className="bg-[rgba(156,163,173,.1)] rounded-md p-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-[1.1em]">{response.bug.title}</h4>
                      <p className="text-sm text-slate-500">{formatElapsedTime(response.bug.createdAt)}</p>
                    </div>
                    <p className="max-w-[200px] truncate text-gray-400">{response.bug.description}</p>
                </div>
            </div>
          );
        }) 
        }
        </div>
      }
    </div>
  );
};

export default LiveResponses;
