import { LuLoader2 } from "react-icons/lu";

interface PopoverItemProps {
  icon: React.ReactNode;
  text: string;
  isLoading: boolean;
  disabled: boolean;
}

const PopoverItem: React.FC<PopoverItemProps> = ({icon, text, isLoading, disabled}) => {
  return (
    <div className={`flex items-center justify-center gap-1 text-[.85em] ${(isLoading || disabled) && "text-gray-400 rounded-sm pointer-events-none"}`}>
        {icon}
        <p className="whitespace-nowrap">{text}</p>
        {(isLoading || disabled) && 
          <LuLoader2 className="animate-spin"/>
        }
    </div>
  )
}

export default PopoverItem