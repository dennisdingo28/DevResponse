import BugRequests from "./BugRequest";
import prismadb from "@/lib/db"

const BugRequestsContainer = async () => {
  const bugs = await prismadb.bug.findMany();
  return (
    <BugRequests bugsAmount={bugs.length || 0}/>   
  )
}

export default BugRequestsContainer