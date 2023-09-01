"use client";

import { Response } from "@/types";
import useSocketStore from "@/hooks/useSocket";
import { useEffect, useState } from "react";
import UserProfile from "../ui/UserProfile";

const NewResponses = () => {
  const [responses, setResponses] = useState<Array<Response>>([]);
  const socket = useSocketStore((state) => state.socket);

  useEffect(() => {
    if (!socket) return;
    socket.on("new_response_client", (payload) => {
      console.log(payload);
      setResponses((prev) => {
        return [payload, ...prev];
      });
    });
  }, [socket]);

  return (
    <div>
      <h3 className='font-bold text-[1.2em] text-center'>New Responses</h3>
      {responses &&
        responses.length > 0 &&
        <div className="flex flex-col gap-4 max-h-[315px] overflow-y-scroll overflowContainer">
         {responses.map((response) => {
          return (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {response.from?.image && response.from?.image.trim() !== "" && (
                  <UserProfile image={response.from?.image} />
                )}
                <p>{response.from?.name}</p>
              </div>
              <p className="max-w-full truncate text-gray-400">{response.comment}</p>
            </div>
          );
        }) 
        }
        </div>
      }
    </div>
  );
};

export default NewResponses;
