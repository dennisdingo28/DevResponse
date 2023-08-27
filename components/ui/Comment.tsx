"use client"
import { Bug, Comment as CommentDB, User as UserDB } from "@prisma/client";
import { User } from "next-auth";
import UserProfile from "./UserProfile";
import formatElapsedTime from "@/lib/utils/formatTime";

interface CommentProps{
    bug: Bug & {
        user: UserDB;
    };
    comment: CommentDB & {
        user: UserDB
    }
    user: User;
}
const Comment: React.FC<CommentProps> = ({bug,user,comment}) => {
    const formatTime = formatElapsedTime(comment.createdAt);
    return (
    <div>
        <div className="flex flex-col items-start justify-center">
            <div className="w-full flex items-center justify-between">
                <UserProfile username={comment.user.name} image={comment.user.image}/>
                <p className="text-sm text-slate-500">{formatTime}</p>
            </div>
            <div className="">
                <p className="text-gray-300 ml-1 max-w-[300px] truncate">{comment.commentText}</p>
            </div>
            <div className="w-full flex justify-center items-center">
                {comment.imageUrl && comment.imageUrl.trim()!=='' && 
                    <p className="text-sm text-center font-bold text-darkishBlue cursor-pointer">see photo</p>
                }
            </div>
        </div>
    </div>
  )
}

export default Comment