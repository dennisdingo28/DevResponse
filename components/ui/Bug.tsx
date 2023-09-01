"use client";
import {
  Bug as BugDB,
  Comment as CommentDB,
  Report,
  Share,
  User as UserDB,
} from "@prisma/client";
import Image from "next/image";
import UserProfile from "./UserProfile";
import formatElapsedTime from "@/lib/utils/formatTime";
import { useEffect, useState } from "react";
import SeeCode from "../Main/SeeCode";
import BugInteractions from "../Main/BugInteractions";
import { User } from "next-auth";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Popover from "./Popover";
import ManageBug from "../Main/ManageBug";
import PopoverItem from "./PopoverItem";
import { PiCopySimpleThin } from "react-icons/pi";
import copyToClipboard from "@/lib/utils/copyToClipboard";
import useSocketStore from "@/hooks/useSocket";
import { toast, Toaster, ToastBar } from 'react-hot-toast';
import BugPing from "../Main/BugPing";
import PingPopover from "../Main/PingPopover";

interface BugProps {
  bug: BugDB & {
    user: UserDB;
    shares: Array<Share & { user: UserDB }>;
    reports: Array<Report & {
      user: UserDB;
      bug: BugDB ;
    }> | null;
    comments: Array<
      CommentDB & {
        user: UserDB;
      }
    >;
    sharedFrom: UserDB | null;
  };
  user: User;
  index: number;
}

const Bug: React.FC<BugProps> = ({ bug, index, user }) => {
  const [elapsedTimeString, setElapsedTimeString] = useState<string>("");
  const [isOpen,setIsOpen] = useState(false);
  const [pingedBug,setPinged] = useState(false);
  const socket = useSocketStore(state=>state.socket);


  useEffect(()=>{
    if(!socket) return;

    socket.on("pingBug_client",payload=>{
      console.log("got her");
      
      setPinged(true);
    });
  },[socket]);



  useEffect(() => {
    setElapsedTimeString(formatElapsedTime(bug.createdAt));
  }, [bug.createdAt]);
  return (
    <div className="hover:bg-darkBlue px-2 py-3 cursor-pointer duration-150 flex gap-1">
      <div className="">
      {pingedBug && (
        <div className="">
          <div className="w-screen h-screen absolute bottom-0 right-2">
            <PingPopover bug={bug} user={user}/>
          </div>
        </div>
      )}
        <Image
          width={43}
          height={43}
          src={bug.user.image}
          className="w-[43px] h-[43px] rounded-full"
          priority
          quality={100}
          alt="user profile"
        />
      </div>
      <div className="flex-1">
        <div className="">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="font-thin text-darkGray">{bug.user.name}</p>
              <p className="text-sm text-slate-500">{elapsedTimeString}</p>
              {!bug.isShared && (
                <div className="flex items-center text-slate-600 text-sm gap-1">
                  {bug.tags.map((tag, index) => (
                    <p key={index} className="hover:underline">
                      #{tag}
                    </p>
                  ))}
                </div>
              )}

              {bug.isShared && (
                <small className="italic text-slate-700">shared</small>
              )}
            </div>
            <div className="flex items-center gap-2">
              <SeeCode code={bug.code} language={bug.language} />
              <div className="flex items-center relative">
                <BiDotsHorizontalRounded onClick={()=>setIsOpen(prev=>!prev)} className="hover:text-slate-400 duration-75" />
                <Popover
                  isOpen={isOpen}
                  title="Manage bug"
                  className={`${bug.userId===user.id ? "-bottom-14 right-4":"-bottom-10 right-4"} p-1 rounded-sm`}
                >
                  {bug.userId === user.id ? (
                    <div className="">
                      <ManageBug bug={bug} user={user} />
                    </div>
                  ) : (
                    <div className="flex flex-col items-baseline">
                      <div
                        className="hover:text-lightBlue"
                        onClick={async () => {
                          await copyToClipboard(`${origin}/bugs/${bug.id}`);
                          toast.success("Successfully copied to clipboard!");
                        }}
                      >
                        <PopoverItem
                          isLoading={false}
                          disabled={false}
                          icon={<PiCopySimpleThin />}
                          text="copy bug link"
                        />
                      </div>
                    </div>
                  )}
                </Popover>
              </div>
            </div>
          </div>
          {bug.isShared ? (
            <div className="pl-2 mt-2">
              <div className="flex items-center gap-2">
                <UserProfile
                  image={bug.sharedFrom?.image}
                  username={bug.sharedFrom?.name}
                />
                <div className="flex items-center text-slate-600 text-sm gap-1">
                  {bug.tags.map((tag, index) => (
                    <p key={index} className="hover:underline">
                      #{tag}
                    </p>
                  ))}
                </div>
              </div>
              <h3 className="pl-1 text-[1.35em] text-darkGray font-medium">
                {bug.title}
              </h3>
              <h4 className="text-gray-400 text-[1em]">{bug.description}</h4>
            </div>
          ) : (
            <div className="">
              <h3 className="pl-1 text-[1.35em] text-darkGray font-medium">
                {bug.title}
              </h3>
              <h4 className="text-gray-400 text-[1em]">{bug.description}</h4>
            </div>
          )}
        </div>
        {bug.imageUrl && bug.imageUrl.trim() !== "" && (
          <div className="w-full flex items-center justify-center">
            <Image
              src={bug.imageUrl}
              width={650}
              height={450}
              className="rounded-md object-cover max-w-full w-full h-[450px] mx-auto"
              quality={100}
              priority
              alt="uploaded image"
            />
          </div>
        )}
        <div className="">
          <BugInteractions bug={bug} user={user} />
        </div>
      </div>
    </div>
  );
};

export default Bug;
