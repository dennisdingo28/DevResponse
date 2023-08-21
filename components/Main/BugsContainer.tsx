


import prismadb from "@/lib/db"
import Bugs from "./Bugs";

const BugsContainer = async () => {
  const bugs = await prismadb.bug.findMany();
  
  
  return (
    <div>
      <Bugs bugs={bugs}/>
    </div>
  )
}

export default BugsContainer