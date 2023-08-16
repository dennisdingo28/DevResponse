"use client"

import ButtonIcon from "@/components/ui/ButtonIcon";
import {FaGithub, FaGoogle} from "react-icons/fa";

const LoginProviders = () => {
  return (
    <div>
        <div className="flex items-center justify-center gap-6">
            <ButtonIcon label="Google" icon={<FaGoogle/>} className="flex flex-row-reverse items-center gap-1 bg-slate-600 rounded-lg p-3 hover:bg-slate-700 duration-150"/>
            <ButtonIcon label="Github" icon={<FaGithub/>} className="flex flex-row-reverse items-center gap-1 bg-slate-600 rounded-lg p-3 hover:bg-slate-700 duration-150"/>
        </div>
    </div>
  )
}



export default LoginProviders
