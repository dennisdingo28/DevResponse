import { User } from "next-auth";

interface OpenConversationContainerProps{
    user: User;
}

const OpenConversationContainer: React.FC<OpenConversationContainerProps> = ({user}) => {
  return (
    <div>
      OpenConversationContainer
    </div>
  )
}

export default OpenConversationContainer;
