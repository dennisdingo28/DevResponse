import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import {LuLoader2} from "react-icons/lu";


interface ButtonProps extends HTMLAttributes<HTMLButtonElement>{
    children?: React.ReactNode;
    isLoading?: boolean;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({isLoading,disabled,className,children,...props}) => {
  return (
    <button {...props} className={cn(className,`${disabled && "opacity-[.5] pointer-events-none"}`)}>{children} {isLoading && <LuLoader2 className="animate-spin text-[1.1em]"/>}</button>
  )
}

export default Button
