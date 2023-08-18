import { navbarLinks } from "@/constants"
import NavLink from "./ui/NavLink"
import UserProfile from "./ui/UserProfile"
import SignOut from "./SignOut"

const NavbarLinks = () => {
  return (
    <div>
        <div className="flex items-center gap-5">
          <div className="flex gap-2">
              {navbarLinks.map((link,index)=>(
                <NavLink navLink={link} key={index}/>
              ))}
          </div>
          <div className="flex items-center gap-1">
            <UserProfile username="dennis"/>
            <SignOut className="text-[1.2em] cursor-pointer hover:text-red-600 duration-150"/>
          </div>
        </div>
    </div>
  )
}

export default NavbarLinks