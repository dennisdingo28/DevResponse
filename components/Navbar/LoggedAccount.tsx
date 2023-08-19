import { getAuthSession } from "@/lib/auth"
import UserProfile from "../ui/UserProfile"

const LoggedAccount = async () => {
    const session = await getAuthSession();

    
  return (
    <UserProfile username={session?.user?.name!} image={session?.user?.image!}/>
  )
}

export default LoggedAccount