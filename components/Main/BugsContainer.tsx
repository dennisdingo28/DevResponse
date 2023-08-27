
import prismadb from "@/lib/db"
import Bugs from "./Bugs";
import { getAuthSession } from "@/lib/auth";

const BugsContainer = async () => {
  const session = await getAuthSession();
  const bugs = await prismadb.bug.findMany({
    orderBy:{
      createdAt:"desc"
    },
    include:{
      user:true,
      comments:{
        orderBy:{
          createdAt:"desc"
        },
        include:{
          user:true,
        }
      }
    },
  });
  
  
  return (
    <div>
      <Bugs bugs={bugs} user={session?.user!}/>
    </div>
  )
}

export default BugsContainer