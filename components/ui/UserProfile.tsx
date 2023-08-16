interface UserProfileProps{
    image?: string;
    username: string;
}

const UserProfile: React.FC<UserProfileProps> = ({image,username}) => {
  return (
    <div className="flex flex-col items-center justify-center xs:flex-row cursor-pointer gap-1">
        <div className="">
            {image && image.trim()!=='' ? (
                <div>userimage</div>
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