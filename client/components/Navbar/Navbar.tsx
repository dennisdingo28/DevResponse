import Logo from '../ui/Logo'
import Navigation from './Navigation'

const Navbar = () => {
  
  return (
    <div>
      <div className="flex items-center w-full justify-between bg-darkBlue">
        <Logo/>
        <Navigation/>
      </div>
    </div>
  )
}

export default Navbar