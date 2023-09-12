"use client"

import { Conversation, User } from "@prisma/client"
import UserProfile from "../ui/UserProfile";
import { User as LoggedUser } from "next-auth";

interface OpenConversationProps{
    conversations: Array<Conversation & {
        user: User,
        recipient: User,
    }>;
    user:  LoggedUser;
}

const OpenConversation: React.FC<OpenConversationProps> = ({conversations,user}) => {
  
    if(!conversations || conversations.length===0)
        return (
            <div className="">
                <p>no current open conversation</p>
            </div>
        )
  
    return (
    <div className="px-2 mt-2">
        {conversations.map(conversation=>(
            <div className="flex flex-col items-start">
                <UserProfile image={conversation.recipient.id===user.id ? conversation.user.image:conversation.recipient.image} username={conversation.recipient.id===user.id ? conversation.user.name:conversation.recipient.name}/>
                <p className="ml-2 max-w-[100px] truncate text-sm text-gray-600">last message</p>
            </div>
        ))}
    </div>
  )
}

export default OpenConversation