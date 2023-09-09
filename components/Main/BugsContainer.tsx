
import prismadb from "@/lib/db"
import Bugs from "./Bugs";
import { getAuthSession } from "@/lib/auth";

interface BugsContainerProps{
  query: any;
}

const BugsContainer: React.FC<BugsContainerProps> = async ({query}) => {
  const session = await getAuthSession();
  const bugs = await prismadb.bug.findMany({
    where: {
      title: {
        contains: query.title,
      },
    },
    orderBy:{
      createdAt:"desc"
    },
    include:{
      user:true,
      sharedFrom:true,
      shares:{
        include:{
          user:true,
        }
      },
      reports:{
        include:{
          user:true,
          bug:true,
        }
      },
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