"use client"
import { Bug, User } from '@prisma/client'
import SideBug from '../ui/SideBug'
import NewResponses from './LiveResponses'
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
      <div className="flex flex-col sm:flex-row gap-3">

        <div className="flex flex-col flex-1">
            <div className="text-center">
              <h3 className='font-bold text-[1.2em] text-center'>Your Active Bugs ({bugs.length})</h3>
            </div>
            <div className="flex flex-col gap-[4px] max-h-[315px] overflow-y-scroll overflowContainer">
              {allBugs.map((bug,index,arr)=>(
                <SideBug key={index} title={bug.title} status="requested" index={arr.length-index}/>
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