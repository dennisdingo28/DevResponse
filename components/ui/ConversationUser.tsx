"use client"

import { Conversation, User } from "@prisma/client"
import UserProfile from "./UserProfile"
import { User as LoggedUser } from "next-auth";
import ConversationUserModal from "../Main/ConversationModal";
import { useState } from "react";

interface ConversationUserProps{
    conversation: Conversation & {
        user: User,
        recipient: User,
    }
    user:  LoggedUser;
}

const ConversationUser: React.FC<ConversationUserProps> = ({conversation, user}) => {
    const [isOpen,setIsOpen] = useState(false);

    return (
    <div>
        <ConversationUserModal isOpen={isOpen} onClose={()=>setIsOpen(false)} conversation={conversation} user={user}/>
        <div className="flex flex-col items-start cursor-pointer" onClick={()=>setIsOpen(true)}>
            <UserProfile image={conversation.recipient.id===user.id ? conversation.user.image:conversation.recipient.image} username={conversation.recipient.id===user.id ? conversation.user.name:conversation.recipient.name}/>
            <p className="ml-2 max-w-[100px] truncate text-sm text-gray-600">last message</p>
        </div>
    </div>
  )
}

export default ConversationUser