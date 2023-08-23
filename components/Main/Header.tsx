import { getAuthSession } from "@/lib/auth"
import HeaderInputs from "./HeaderInputs";


const Header = async () => {
  const session = await getAuthSession();

  return (
    <div>
      <HeaderInputs user={session?.user!}/>

    </div>
  )
}

export default Header