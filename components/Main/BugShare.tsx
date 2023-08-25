"use client"


interface BugShareProps{
    icon: React.ReactNode;
    shareNumber: number;
}

const BugShare: React.FC<BugShareProps> = ({icon,shareNumber}) => {
  return (
    <div className="flex items-center group">
        <div className="text-gray-500">
            {icon}
        </div>
        <p className="text-gray-600 duration-150 text-[.81em]">{shareNumber}</p>
    </div>
  )
}

export default BugShare