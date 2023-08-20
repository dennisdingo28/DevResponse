import { LuLoader2 } from "react-icons/lu";

interface LoadingFallbackProps{
    message?: string;
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({message}) => {
  return (
    <div className="flex items-center">
        <LuLoader2 className="text-[1em] text-slate-600 animate-spin"/>
        {message && message.trim()!=='' && <p className="text-[.9em] text-slate-600">{message}</p>}
    </div>
  )
}

export default LoadingFallback