
import { getAuthSession } from "@/lib/auth"
import HeaderControl from "./HeaderControl"



const Header = async () => {
  const session = await getAuthSession();

  return (
    <div>
      <HeaderControl user={session?.user!}/>
    </div>
  )
}

export default Header