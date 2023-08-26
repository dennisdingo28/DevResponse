import { getAuthSession } from "@/lib/auth"
import Socket from "./Socket"

const SocketContainer = async () => {
    const session = await getAuthSession();
  return (
    <div>
      <Socket id={session?.user?.id!}/>
    </div>
  )
}

export default SocketContainer
