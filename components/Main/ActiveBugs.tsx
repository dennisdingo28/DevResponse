"use client"
import { Bug, User } from '@prisma/client'
import SideBug from '../ui/SideBug'
import NewResponses from './NewResponses'
import { useEffect, useState } from 'react';
import useSocketStore from '@/hooks/useSocket';

interface ActiveBugsProps{
  bugs: Array<Bug & {user: User}>;
}

const ActiveBugs: React.FC<ActiveBugsProps> = ({bugs}) => {
  const [allBugs,setAllBugs] = useState(bugs || []);
  const socket = useSocketStore(state=>state.socket);

  useEffect(()=>{
    setAllBugs(bugs);
  },[bugs]);

  useEffect(()=>{
    if(!socket) return;

    socket.on("new_bug_request_client",payload=>{
      setAllBugs(prev=>[payload,...prev]);
    });
  },[socket]);

  return (
    <div className='lg:min-w-[250px] text-white'>
      <div className="flex flex-col sm:flex-row">

        <div className="flex flex-col flex-1">
            <div className="text-center">
              <h3 className='font-bold text-[1.2em] text-center'>Your Active Bugs ({bugs.length})</h3>
            </div>
            <div className="flex flex-col gap-[4px]">
              {allBugs.map((bug,index,arr)=>(
                <SideBug title={bug.title} status="requested" index={arr.length-index}/>
              ))}
            </div>
        </div>
         
        <div className="flex-1">
          <NewResponses/>
        </div>
      </div>
        
    </div>
  )
}

export default ActiveBugs