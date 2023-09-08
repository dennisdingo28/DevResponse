import { Bug } from "@prisma/client";
import BugRequests from "./BugRequest";
import prismadb from "@/lib/db"

interface BugRequestsContainerProps{
  bugs: Array<Bug>;
}

const BugRequestsContainer: React.FC<BugRequestsContainerProps> = async ({bugs}) => {
  return (
    <BugRequests bugsAmount={bugs.length || 0}/>   
  )
}

export default BugRequestsContainer