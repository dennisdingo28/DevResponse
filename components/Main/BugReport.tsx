"use client"

import reportBug from "@/lib/api/reportBug";
import { Bug, User as UserDB, Share, Report } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { User } from "next-auth";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";


interface BugReportProps{
  bug: Bug & {
    user: UserDB;
    shares: Array<Share & {user: UserDB}>;
    sharedFrom: UserDB | null;
    reports: Array<Report & {
      user: UserDB;
      bug: Bug ;
    }> | null;
  };
  user: User;
  icon: React.ReactNode;
}

const BugReport: React.FC<BugReportProps> = ({icon,bug,user}) => {
  const [reported,setReported] = useState(false);

  useEffect(()=>{
    setReported(bug.reports?.some(bug=>bug.userId===user.id) || false);
  },[bug,bug.reports]);

  const {mutate: report,isLoading} = useMutation({
    mutationFn: async()=>{
      setReported(true);
      await reportBug(bug.id,user.token);
    },
    onSuccess:()=>{
      toast.success("Bug was successfully reported !");
      setReported(true);
    },
    onError:()=>{
      toast.error("Something went wrong. Please try again later !");
      setReported(false);
    }
  })

  return (
    <div onClick={()=>{
      if(!reported)
        report()
      }
    } className={`flex items-center group hover:bg-[rgba(194,65,12,.1)] duration-75 p-1 rounded-full ${isLoading && "pointer-events-none"}`}>
        <div className={`${!reported ? "text-gray-500":"text-orange-700"} group-hover:text-orange-700`}>
            {icon}
        </div>
    </div>
  )
}

export default BugReport