"use client"


interface BugCommentProps{
    icon: React.ReactNode;
    comments: number;
}
//#1cd68a
const BugComment: React.FC<BugCommentProps> = ({icon,comments}) => {
  return (
    <div className="flex items-center group">
        <div className="text-gray-500">
            {icon}
        </div>
        <p className="text-gray-600 duration-150 text-[.81em]">{comments}</p>
    </div>
  )
}

export default BugComment