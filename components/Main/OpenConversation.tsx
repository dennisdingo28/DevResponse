"use client"

import { Conversation, Message, User } from "@prisma/client"
import { User as LoggedUser } from "next-auth";
import ConversationUser from "../ui/ConversationUser";

interface OpenConversationProps{
    conversations: Array<Conversation & {
        user: User,
        recipient: User,
        messages: Array<Message & {
            user: User,
            recipient: User
        }>,
    }>;
    user:  LoggedUser;
}

const OpenConversation: React.FC<OpenConversationProps> = ({conversations,user}) => {
    if(!conversations || conversations.length===0)
        return (
            <div className="">
                <p className="text-center text-sm text-gray-500">no current open conversation search for one person and create one</p>
            </div>
        )
  
    return (
    <div className="px-2 mt-2">
        {conversations.map(conversation=>(
            <div className="hover:bg-[rgba(30,41,59,.2)] p-1 rounded-md">
                <ConversationUser conversation={conversation} user={user}/>
            </div>
        ))}
    </div>
  )
}

export default OpenConversation