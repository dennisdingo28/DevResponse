import { getAuthSession } from '@/lib/auth'
import Logo from '../ui/Logo'
import Navigation from './Navigation'
import Container from '../ui/Container'

const Navbar = () => {
  
  return (
    <div>
        <Container>
            <div className="flex items-center justify-between">
                <Logo/>
                <Navigation/>
            </div>
        </Container>
    </div>
  )
}

export default Navbar