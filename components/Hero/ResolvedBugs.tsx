import { Bug } from "@prisma/client"

interface ResolvedBugsProps{
  bugs: Array<Bug>;
}
const ResolvedBugs: React.FC<ResolvedBugsProps> = ({bugs}) => {
    const solvedBugs = bugs.reduce((acc,bug)=>{
      if(bug.solved) return acc+1;
      return acc;
    },0);

    return (
      <div className="flex">
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row">
              <h2 className="text-[1.7em] font-bold text-white sm:text-[2em] md:text-[2.5em] whitespace-nowrap">{solvedBugs} <span className="text-green-500">solved</span></h2>
              <p className="text-slate-600 text-[1em] font-medium font-roboto -mt-1 self-center sm:mt-0 sm:self-end ml-2 md:self-center lg:self-end">finnaly</p>
          </div>
      </div>
    )
  }
  
  export default ResolvedBugs