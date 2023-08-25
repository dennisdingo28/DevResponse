"use client"


interface BugRelevantProps{
    icon: React.ReactNode;
    relevantNumber: number;
}

const BugRelevant: React.FC<BugRelevantProps> = ({icon,relevantNumber}) => {
  return (
    <div className="flex items-center group">
        <div className="text-green-600">
            {icon}
        </div>
        <p className="group-hover:text-green-600 duration-150 text-[.95em]">{relevantNumber}</p>
    </div>
  )
}

export default BugRelevant