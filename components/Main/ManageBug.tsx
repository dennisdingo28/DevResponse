"use client"

import copyToClipboard from "@/lib/utils/copyToClipboard"
import PopoverItem from "../ui/PopoverItem"
import { PiCopySimpleThin, PiTrashSimpleThin, PiCheckThin} from "react-icons/pi"
import {LuCheckSquare} from "react-icons/lu";
import { useOrigin } from "@/hooks/useOrigin"
import { Bug, User as UserDB, Share } from "@prisma/client";
import { User } from "next-auth";
import { toast } from "react-hot-toast"
import { useMutation } from "@tanstack/react-query"
import deleteBug from "@/lib/api/deleteBug"
import { AxiosError } from "axios"
import useSocketStore from "@/hooks/useSocket"
import solveBug from "@/lib/api/solveBug";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ManageBugProps {
  bug: Bug & {
    user: UserDB;
    sharedFrom: UserDB | null;
    shares: Array<Share & {user: UserDB}>;
  };
  user: User;
}

const ManageBug: React.FC<ManageBugProps> = ({bug,user}) => {
  const origin = useOrigin();
  const router = useRouter();
  const socket = useSocketStore(state=>state.socket);
  const [loading,setLoading] = useState(false) //for mark as solved

  const {mutate: removeBug, isLoading} = useMutation({
    mutationFn:async()=>{
      const res = await deleteBug(bug.id,user.token);
      return res;
    },
    onSuccess:()=>{
      toast.success("Bug was successfully deleted !");
      if(socket){
        socket.emit("bug_delete",bug.id);
      }
      router.refresh();
    },
    onError:(err: any)=>{
      
      if(err instanceof AxiosError){
        if(err.response?.data && err.response.data.trim()!=="")
          toast.error(err.response.data);
        else
          toast.error(err.message);
      }
      else toast.error("Something went wrong. Please try again later !");
    }
  });

  return (
    <div className="flex flex-col items-baseline z-20">
        <div className="hover:text-lightBlue" onClick={async(e)=>{
            e.stopPropagation();
            await copyToClipboard(`${origin}/bugs/${bug.id}`);
            toast.success("Successfully copied to clipboard!");
        }}>
            <PopoverItem isLoading={false} disabled={false} icon={<PiCopySimpleThin/>} text="copy bug link"/>
        </div>
        <div className={`hover:text-red-600`} onClick={(e)=>{
          e.stopPropagation();
          removeBug();
        }}>
            <PopoverItem isLoading={isLoading} disabled={isLoading} icon={<PiTrashSimpleThin/>} text="delete bug"/>
        </div>
        <div className={`hover:text-green-600 ${bug.solved && "pointer-events-none text-gray-400"}`} onClick={async(e)=>{
          e.stopPropagation();
          try{
            setLoading(true);
            await solveBug(bug.id,user.token);            
            setLoading(false);
            toast.success("Bug was successfully marked as solved !");
            if(socket){
              socket.emit("bug_solved",bug.id);
            }
            router.refresh();
          }catch(err){
            toast.error("Something went wrong. Please try again later !");
            setLoading(false);
          }
        }}>
          <PopoverItem isLoading={loading} disabled={false} icon={<PiCheckThin/>} text={!bug.solved ? "mark as solved":"marked as solved"}/>
        </div>
    </div>
  )
}

export default ManageBug