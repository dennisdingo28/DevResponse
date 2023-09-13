"use client"

import { Conversation, User } from "@prisma/client"
import { User as LoggedUser } from "next-auth";
import ConversationUser from "../ui/ConversationUser";

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
            <div className="hover:bg-[rgba(30,41,59,.2)] p-1 rounded-md">
                <ConversationUser conversation={conversation} user={user}/>
            </div>
        ))}
    </div>
  )
}

export default OpenConversation