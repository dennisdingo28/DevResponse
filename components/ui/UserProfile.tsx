import Image from "next/image";

interface UserProfileProps{
    image?: string;
    username?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({image,username}) => {
  
    return (
    <div className="">
        <div className="flex flex-col items-center justify-center xs:flex-row cursor-pointer gap-1">
            <div className="">
                {image && image.trim()!=='' ? (
                    <Image width={43} height={43} src={image} className="w-[43px] min-w-[43px] max-w-[43px]  min-h-[43px] h-[43px] max-h-[43px] rounded-full" priority quality={100} alt="user profile"/>
                ):(
                    <div className="bg-softDarkBlue h-[43px] w-[43px] rounded-full"></div>
                )}
            </div>
            <div>
                {username && username.trim()!=='' &&
                    <p className="font-thin text-darkGray">{username}</p>
                }
            </div>
        </div>
    </div>
    
  )
}

export default UserProfile