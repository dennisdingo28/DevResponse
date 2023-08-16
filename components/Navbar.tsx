import Logo from './Logo'
import Navigation from './Navigation'
import Container from './ui/Container'

const Navbar = () => {
  return (
    <div>
        <Container>
            <div className="flex items-center justify-between">
                <Logo/>
                <div className="">
                  <Navigation/>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default Navbar