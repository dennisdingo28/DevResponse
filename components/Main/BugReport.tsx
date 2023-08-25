"use client"


interface BugReportProps{
    icon: React.ReactNode;
}

const BugReport: React.FC<BugReportProps> = ({icon}) => {
  return (
    <div className="flex items-center group">
        <div className="text-gray-500">
            {icon}
        </div>
    </div>
  )
}

export default BugReport