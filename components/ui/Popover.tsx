"use client"

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

interface PopoverProps extends HTMLAttributes<HTMLDivElement>{
    isOpen: boolean;
    title?: string;
    children?: React.ReactNode;
}
const Popover: React.FC<PopoverProps> = ({isOpen,title,children,className}) => {
    if(!isOpen)
        return null;
  return (
    <div className={cn("bg-softDarkBlue absolute z-10",className)}>
        {title && title.trim()!=='' && <h3 className="text-start text-[.95em] font-bold whitespace-nowrap">{title}</h3>}
        <div className="">
            {children}
        </div>
    </div>
  )
}

export default Popover