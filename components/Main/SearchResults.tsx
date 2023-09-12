"use client";

import { User } from "@prisma/client";
import { User as LoggedUser } from "next-auth";
import UserProfile from "../ui/UserProfile";
import { useMutation } from "@tanstack/react-query";
import createConversation from "@/lib/api/createConversation";
import toast from "react-hot-toast";

interface SearchResultsProps {
  results: Array<User>;
  user: LoggedUser;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, user }) => {
  const {mutate: newConversation,isLoading} = useMutation({
    mutationFn:async(recipientId: string)=>{
      const res = await createConversation(user.id,recipientId,user.token);
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
            <div onClick={()=>newConversation(user.id)} className="hover:bg-slate-800 w-full rounded-md p-1 cursor-pointer flex duration-150">
              <UserProfile image={user.image} username={user.name} />
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