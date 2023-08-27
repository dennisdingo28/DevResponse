import { getAuthSession } from "@/lib/auth"
import prismadb from "@/lib/db";
import ActiveBugs from "./ActiveBugs";

const ActiveBugsContainer = async () => {
    const session = await getAuthSession();

    const userBugs = await prismadb.bug.findMany({
        where:{
            userId:session?.user?.id,
        },
        include:{
            user:true,
        },
    });
  return (
    <div>
        <ActiveBugs bugs={userBugs}/>
    </div>
  )
}

export default ActiveBugsContainer