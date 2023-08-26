"use client"
import { Bug, Comment as CommentDB, User as UserDB } from "@prisma/client";
import { User } from "next-auth";
import UserProfile from "./UserProfile";

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

    return (
    <div>
        <div className="flex flex-col items-start justify-center">
            <div className="w-full flex items-center justify-between">
                <UserProfile username={comment.user.name} image={comment.user.image}/>
                <p className="text-sm">options</p>
            </div>
            <div className="max-h-[250px] overflow-y-scroll w-full">
                <p className="text-gray-300 ml-1 truncate">{comment.commentText}</p>
            </div>
        </div>
    </div>
  )
}

export default Comment