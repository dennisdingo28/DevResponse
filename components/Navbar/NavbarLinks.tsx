import NavLink from "../ui/NavLink"
import SignOut from "../ui/SignOut"
import LoggedAccount from "./LoggedAccount"
import { Suspense } from "react"
import LoadingFallback from "../ui/LoadingFallback"

const NavbarLinks = () => {
  return (
    <div>
      <div className="flex items-center gap-1">
        <Suspense fallback={<LoadingFallback/>}>
            <LoggedAccount/>
        </Suspense>
        <SignOut className="text-[1.2em] cursor-pointer hover:text-red-600 duration-150"/>
      </div>
    </div>
  )
}

export default NavbarLinks