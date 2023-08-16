import { navbarLinks } from "@/constants"
import NavLink from "./ui/NavLink"
import UserProfile from "./ui/UserProfile"

const NavbarLinks = () => {
  return (
    <div>
        <div className="flex items-center gap-5">
          <div className="flex gap-2">
              {navbarLinks.map((link,index)=>(
                  <NavLink navLink={link} key={index}/>
              ))}
          </div>
          <div className="">
            <UserProfile username="dennis"/>
          </div>
        </div>
    </div>
  )
}

export default NavbarLinks