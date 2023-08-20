"use client"
import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, useState } from "react";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {BsInfoCircle} from "react-icons/bs";

interface AnnounceProps extends HTMLAttributes<HTMLDivElement>{
    title: string;
    message?: string;
}

const Announce: React.FC<AnnounceProps> = ({title,message,className,children}) => {
    const [isOpen,setIsOpen] = useState(true);
    if(isOpen)
        return (
            <div className={cn("text-white bg-blackBlue p-2",className)}>
                <div className="flex justify-between">
                    <div className="flex gap-1">
                        <div className="">
                            <BsInfoCircle className="text-slate-400 text-[1.1em]"/>
                        </div>
                        <h3 className="text-[.9em] font-poppins font-thin text-slate-600 max-w-[180px] xs:max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[650px] xl:max-w-fit truncate">{title}</h3>
                    </div>
                    <div className="">
                        <AiOutlineCloseCircle className="text-slate-500 text-[1.35em] hover:text-slate-700 duration-150 cursor-pointer rounded-full " onClick={()=>setIsOpen(false)}/>
                    </div>
                </div>
                <div>
                    <p className="text-[1.2] font-bold text-gray-400">
                        {message && message.trim()!=='' && message}
                    </p>
                </div>
                <div className="">
                    {children}
                </div>
            </div>
        )
}

export default Announce