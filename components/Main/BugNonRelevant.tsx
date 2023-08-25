"use client"


interface BugNonRelevantProps{
    icon: React.ReactNode;
    nonRelevantNumber: number;
}

const BugNonRelevant: React.FC<BugNonRelevantProps> = ({icon,nonRelevantNumber}) => {
  return (
    <div className="flex items-center group">
        <div className="text-[#cc2328]">
            {icon}
        </div>
        <p className="group-hover:text-[#cc2328] duration-150 text-[.95em]">{nonRelevantNumber}</p>
    </div>
  )
}

export default BugNonRelevant