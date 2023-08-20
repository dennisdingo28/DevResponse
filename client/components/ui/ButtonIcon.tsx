import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

interface ButtonIconProps extends HTMLAttributes<HTMLButtonElement>{
    label: string;
    icon: React.ReactNode;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({label,icon,className,onClick}) => {
  return (
    <button className={cn(className)} onClick={onClick}>{label}{icon}</button>
  )
}

export default ButtonIcon
