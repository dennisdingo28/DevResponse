"use client"


interface BugRelevantProps{
    icon: React.ReactNode;
    relevantNumber: number;
}

const BugRelevant: React.FC<BugRelevantProps> = ({icon,relevantNumber}) => {
  return (
    <div className="flex items-center group hover:bg-[rgba(29,183,107,.1)] p-1 rounded-full">
        <div className="text-gray-500 group-hover:text-[rgb(29,183,107)]">
            {icon}
        </div>
        <p className="text-gray-600 group-hover:text-darkGray duration-75 text-[.81em]">{relevantNumber}</p>
    </div>
  )
}

export default BugRelevant