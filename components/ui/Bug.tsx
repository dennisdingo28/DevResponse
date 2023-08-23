import { Bug, User } from "@prisma/client";

interface BugProps{
    bug: Bug & {
        user: User;
    };
}

const Bug: React.FC<BugProps> = ({bug}) => {
  return (
    <div>{bug.title}</div>
  )
}

export default Bug