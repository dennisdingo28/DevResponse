"use client";

import { User } from "@prisma/client";
import { User as LoggedUser } from "next-auth";
import UserProfile from "../ui/UserProfile";
import { useMutation } from "@tanstack/react-query";
import createConversation from "@/lib/api/createConversation";
import toast from "react-hot-toast";
import { useState } from "react";
import {BiLoaderAlt} from "react-icons/bi";

interface SearchResultsProps {
  results: Array<User>;
  loggedUser: LoggedUser;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, loggedUser }) => {
  const [recipientConversationId,setRecipientConversationId] = useState<string>("") //selected to create
  const {mutate: newConversation,isLoading} = useMutation({
    mutationFn:async(recipientId: string)=>{
      setRecipientConversationId(recipientId);
      const res = await createConversation(loggedUser.id,recipientId,loggedUser.token);
      return res;
    },
    onSuccess:(res)=>{
      if(res.data.msg)
        toast.success(res.data.msg);
      else toast.success("Conversation was successfully createad !");
    },
    onError:()=>{
      toast.error("Something went wrong. Please try again later !");
    }
  })
  return (
    <div className="w-full flex flex-col items-baseline">
      {results && results.length > 0 ? (
        results.map((user) => (
            <div onClick={()=>newConversation(user.id)} className={`hover:bg-slate-800 w-full ${!isLoading ? "rounded-md":"rounded-none"} p-1 cursor-pointer flex flex-col items-start duration-150 ${isLoading && "pointer-events-none bg-slate-800"}`}>
              <div className="w-full flex items-center justify-between">
                <UserProfile image={user.image} username={user.name} />
                {isLoading && user.id===recipientConversationId &&
                  <BiLoaderAlt className="animate-spin"/>
                }
              </div>
              {isLoading && user.id===recipientConversationId &&
                <div className="w-full flex items-center justify-center">
                  <small className="text-gray-500 text-sm text-center italic">creating conversation...</small>
                </div>
              }
            </div>
        ))
      ) : (
        <div className="w-full flex justify-center p-1 cursor-pointer duration-150">
          <p className="text-sm text-center italic text-slate-300">no user was found</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;