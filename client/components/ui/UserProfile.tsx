import Image from "next/image";

interface UserProfileProps{
    image?: string;
    username: string;
}

const UserProfile: React.FC<UserProfileProps> = ({image,username}) => {
  return (
    <div className="flex flex-col items-center justify-center xs:flex-row cursor-pointer gap-1">
        <div className="">
            {image && image.trim()!=='' ? (
                <Image width={43} height={43} src={image} className="w-[43px] h-[43px] rounded-full" priority quality={100} alt="user profile"/>
            ):(
                <div className="bg-softDarkBlue h-[43px] w-[43px] rounded-full"></div>
            )}
        </div>
        <div>
            <p className="font-thin text-darkGray">{username}</p>
        </div>
    </div>
  )
}

export default UserProfile