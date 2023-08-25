"use client";
import { Bug, User as UserDB } from "@prisma/client";
import Image from "next/image";
import UserProfile from "./UserProfile";
import formatElapsedTime from "@/lib/utils/formatTime";
import { useEffect, useState } from "react";
import SeeCode from "../Main/SeeCode";
import BugInteractions from "../Main/BugInteractions";
import { User } from "next-auth";

interface BugProps {
  bug: Bug & {
    user: UserDB;
  };
  user: User,
  index: number;
}

const Bug: React.FC<BugProps> = ({ bug, index, user }) => {
  const [elapsedTimeString, setElapsedTimeString] = useState<string>("");

  useEffect(() => {
    setElapsedTimeString(formatElapsedTime(bug.createdAt));
  }, [bug.createdAt]);

  return (
    <div className="hover:bg-darkBlue px-2 py-3 cursor-pointer duration-150 flex gap-1">
      <div className="">
        <Image width={43} height={43} src={bug.user.image} className="w-[43px] h-[43px] rounded-full" priority quality={100} alt="user profile"/>
      </div>
      <div className="flex-1">
        <div className="">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="font-thin text-darkGray">{bug.user.name}</p>
              <p className="text-sm text-slate-500">{elapsedTimeString}</p>
            </div>
            <div>
              <SeeCode code={bug.code} language={bug.language} />
            </div>
          </div>
          <h3 className="text-[1.35em] text-darkGray font-medium">
            {bug.title}
          </h3>
          <h4 className="text-gray-400 text-[1em]">{bug.description}</h4>
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
          <BugInteractions bug={bug} user={user}/>
        </div>
      </div>
    </div>
  );
};

export default Bug;