import prismadb from "@/lib/db";
import { User } from "next-auth";
import OpenConversation from "./OpenConversation";

interface OpenConversationContainerProps{
    user: User;
}

const OpenConversationContainer: React.FC<OpenConversationContainerProps> = async({user}) => {
  const conversations = await prismadb.conversation.findMany({
    where:{
      OR: [
        {
          userId: user.id,
        },
        {
          recipientId: user.id,
        },
      ],
    },
    include:{
      user:true,
      recipient:true,
      messages:{
        include:{
          user:true,
          recipient:true,
        },
      },
    },
  });
  
  return (
    <div>
      <OpenConversation conversations={conversations} user={user}/>
    </div>
  )
}

export default OpenConversationContainer;
