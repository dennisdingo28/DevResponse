
import UserProfile from "../ui/UserProfile";
import { User } from "next-auth";
import HeaderInputs from "./HeaderInputs";

interface HeaderControlProps{
  user: User;
}

const HeaderControl: React.FC<HeaderControlProps> = ({user}) => {
  
  return (
    <div className="flex">
      <div className="bg-blackBlue rounded-lg p-2">
        <div className="flex mb-1">
          <UserProfile image={user.image!}/>
        </div>
        <HeaderInputs/>
      </div>
    </div>
  )
}

export default HeaderControl