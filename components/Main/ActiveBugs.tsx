import SideBug from '../ui/SideBug'
import NewResponses from './NewResponses'

const ActiveBugs = () => {
  return (
    <div className='lg:min-w-[250px] text-white'>
      <div className="flex flex-col sm:flex-row">

        <div className="flex flex-col flex-1">
          <div className="text-center">
                <h3 className='font-bold text-[1.2em] text-center'>Your Active Bugs (3)</h3>
            </div>
            <div className="flex flex-col gap-[4px]">
                <SideBug title='Next js api route' status="requested" index={1}/>
                <SideBug title='Typescript bug' status="solved" index={2}/>
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