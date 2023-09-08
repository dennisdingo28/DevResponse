import prismadb from "@/lib/db";
import BugRequestsContainer from "./BugRequestsContainer";
import ResolvedBugs from "./ResolvedBugs";

const BugStats = async () => {
  const bugs = await prismadb.bug.findMany();
  return (
    <div className="flex flex-col items-center justify-center xs:flex-row xs:justify-between lg:justify-around">
      <div className="bg-blackBlue p-3 rounded-md">
        <BugRequestsContainer bugs={bugs}/>
      </div>
      <div className="bg-blackBlue p-3 rounded-md">
        <ResolvedBugs bugs={bugs}/>
      </div>
    </div>
  );
};

export default BugStats;
