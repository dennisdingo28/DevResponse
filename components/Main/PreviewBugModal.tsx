"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, SetStateAction, Fragment, useState } from "react";
import UserProfile from "../ui/UserProfile";
import {
  Bug as BugDB,
  Comment as CommentDB,
  Report,
  Share,
  User as UserDB,
} from "@prisma/client";
import Image from "next/image";
import SeeCode from "./SeeCode";

interface BugPreviewProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  bug: BugDB & {
    user: UserDB;
    shares: Array<Share & { user: UserDB }>;
    reports: Array<
      Report & {
        user: UserDB;
        bug: BugDB;
      }
    > | null;
    comments: Array<
      CommentDB & {
        user: UserDB;
      }
    >;
    sharedFrom: UserDB | null;
  };
}

const BugPreviewModal: React.FC<BugPreviewProps> = ({
  isOpen,
  onClose,
  bug,
}) => {
  return (
    <Transition show={isOpen}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/30" />
      </Transition.Child>

      <Transition.Child
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Dialog open={isOpen} onClose={onClose} className={"relative z-50"}>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel
              className={
                "text-darkGray bg-softDarkBlue p-2 rounded-md space-y-2 max-w-[900px] w-full"
              }
            >
              {!bug.isShared && bug.tags.length>0 && (
                <div className="flex items-center justify-center text-slate-600 text-sm gap-1">
                  {bug.tags.map((tag, index) => (
                    <p key={index} className="hover:underline">
                      #{tag}
                    </p>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <UserProfile image={bug.user?.image} username={bug.user?.name} />
                    {bug.isShared && (
                        <small className="italic text-slate-700">shared</small>
                    )}
                </div>
                <div className="cursor-pointer">
                    <SeeCode code={bug.code} language={bug.language}/>
                </div>
              </div>
              
              <div className="bg-darkBlue rounded-md p-1 max-h-[671px] overflow-y-scroll overflowContainer">
                <Dialog.Title className="pl-1 text-[1.35em] text-darkGray font-medium break-words">
                    {bug.title}
                </Dialog.Title>
                <h4 className="text-gray-400 text-[1em] break-words">{bug.description}</h4>
                {bug.imageUrl && bug.imageUrl.trim() !== "" && (
                    <div className="w-full flex items-center justify-center">
                        <Image
                        src={bug.imageUrl}
                        width={650}
                        height={450}
                        className="rounded-md object-cover max-w-[650px] w-full h-[450px] mx-auto"
                        quality={100}
                        priority
                        alt="uploaded image"
                        />
                    </div>
                    )}
              </div>
              
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition.Child>
    </Transition>
  );
};

export default BugPreviewModal;
