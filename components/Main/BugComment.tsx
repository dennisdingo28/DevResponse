"use client"


interface BugCommentProps{
    icon: React.ReactNode;
    comments: number;
}

const BugComment: React.FC<BugCommentProps> = ({icon,comments}) => {
  return (
    <div className="flex items-center group">
        <div className="text-[#1cd68a]">
            {icon}
        </div>
        <p className="group-hover:text-[#1cd68a] duration-150 text-[.95em]">{comments}</p>
    </div>
  )
}

export default BugComment