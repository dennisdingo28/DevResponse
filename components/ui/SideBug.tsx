interface SideBugProps{
    title: string;
    status: "requested" | "solved"
    index?: number;
}

const SideBug:React.FC<SideBugProps> = ({title,status,index}) => {
    
  return (
    <div className={`${status==="requested" ? "shadow-[0px_0px_5px_rgba(244,30,30,.3)]":"shadow-[0px_0px_5px_rgba(29,242,42,.3)]"} ${status==="requested" ? "hover:shadow-[0px_0px_5px_rgba(244,30,30,.5)]":"hover:shadow-[0px_0px_5px_rgba(29,242,42,.5)]"} p-2 cursor-pointer duration-150 font-roboto`}>
        <p className="text-[1.15em] font-medium text-gray-200 max-w-[200px] truncate">{"#"+index} {title}</p>
        <div className="">
            <p className="font-medium text-[.9em] text-gray-400">Status: <span className={`text-[.85em] font-poppins ${status==="requested" ? "text-[rgba(244,30,30,.5)]":"text-[rgba(29,242,42,.5)]"}`}>{status}</span></p>
        </div>
    </div>
  )
}

export default SideBug