"use client"


interface BugStatisticsProps{
    icon: React.ReactNode;
    viewedNumber: number;
}

const BugStatistics: React.FC<BugStatisticsProps> = ({icon,viewedNumber}) => {
  return (
    <div className="flex items-center group">
        <div className="text-gray-500">
            {icon}
        </div>
        <p className="text-gray-600 duration-150 text-[.81em]">{viewedNumber}</p>
    </div>
  )
}

export default BugStatistics