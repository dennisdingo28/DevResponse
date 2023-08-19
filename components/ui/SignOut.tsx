"use client"
import { cn } from "@/lib/utils/cn";
import { signOut } from "next-auth/react";
import { HTMLAttributes } from "react";
import {FaDoorOpen} from "react-icons/fa";

interface SignOutProps extends HTMLAttributes<HTMLDivElement>{}

const SignOut: React.FC<SignOutProps> = ({className}) => {
  return (
    <FaDoorOpen onClick={()=>signOut()} className={cn("text-red-400",className)}/>
  )
}

export default SignOut
