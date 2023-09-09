import PingContainer from './PingContainer'
import SearchBug from './SearchBug'

const LeftLinks = () => {
  return (
    <div className='p-2'>
      <div className="border-b">
        <SearchBug/>
      </div>
        <PingContainer/>
    </div>
  )
}

export default LeftLinks