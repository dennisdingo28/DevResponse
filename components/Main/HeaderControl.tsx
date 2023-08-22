
import UserProfile from "../ui/UserProfile";
import { User } from "next-auth";
import HeaderInputs from "./HeaderInputs";

interface HeaderControlProps{
  user: User;
}

const HeaderControl: React.FC<HeaderControlProps> = ({user}) => {
  
  return (
    <div className="flex">
      <div className="flex-1">
        <h3>Links will be written here</h3>
      </div>
      <div className="bg-blackBlue relative rounded-lg p-2 flex-[2] flex">
        <div className="flex mb-1">
          <UserProfile image={user.image!}/>
        </div>
        <div className="w-full">
          <HeaderInputs/>
        </div>
        
      </div>
      <div className="flex-1">
        groups & chat will be here
      </div>
    </div>
  )
}

export default HeaderControl