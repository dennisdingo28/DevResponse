"use client"

import ButtonIcon from "@/components/ui/ButtonIcon";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {FaGithub, FaGoogle} from "react-icons/fa";

const LoginProviders = () => {
  const router = useRouter();
  return (
    <div>
        <div className="flex items-center justify-center gap-6">
            <ButtonIcon onClick={()=>{
              router.push("/");
              signIn("google")
            }} label="Google" icon={<FaGoogle/>} className="flex flex-row-reverse items-center gap-1 bg-slate-600 rounded-lg p-3 hover:bg-slate-700 duration-150"/>
            <ButtonIcon onClick={()=>{
                router.push("/");
              signIn("github")
            }} label="Github" icon={<FaGithub/>} className="flex flex-row-reverse items-center gap-1 bg-slate-600 rounded-lg p-3 hover:bg-slate-700 duration-150"/>
        </div>
    </div>
  )
}



export default LoginProviders
