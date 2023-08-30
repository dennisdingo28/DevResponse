"use client"
import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, SetStateAction , Fragment, useState, useEffect} from 'react';
import { Bug, User as UserDB, Share } from "@prisma/client";
import { User } from "next-auth";
import UserProfile from '../ui/UserProfile';
import ImagePreviewModal from '../ui/ImagePreviewModal';
import Button from '../ui/Button';
import { BsShare } from 'react-icons/bs';
import { useMutation } from '@tanstack/react-query';
import shareBug from '@/lib/api/shareBug';
import { toast } from 'react-hot-toast';
import { AxiosResponse } from 'axios';
import useSocketStore from '@/hooks/useSocket';

interface ShareBugProps{
    isOpen: boolean;
    onClose: Dispatch<SetStateAction<boolean>>;
    shared: boolean;
    bug: Bug & {
      user: UserDB;
      sharedFrom: UserDB | null;
      shares: Array<Share & {user: UserDB}>;
    };
    user: User;
}

const ShareBugModal: React.FC<ShareBugProps> = ({isOpen,shared,onClose,bug,user}) => {
  const [showImage,setShowImage] = useState(false);
  const socket = useSocketStore(state=>state.socket);

  const {mutate: share, isLoading} = useMutation({
    mutationFn: async()=>{
      const res = await shareBug(bug.id,user.id,bug,user.token);
      return res;
    },
    onSuccess:(res: AxiosResponse)=>{
      console.log(res);
      
      toast.success("Bug was successfully shared !");
      if(socket)
      {
        socket.emit("new_bug",res.data.bug);
      }
    },
    onError:()=>{
      toast.error("Something went wrong. Please try again later !");
    }
  });

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
                        <Dialog.Panel className={"text-darkGray min-w-[300px] bg-softDarkBlue p-2 rounded-md space-y-2"}>
                            <Dialog.Title className={"text-[1.25em] bg-darkBlue p-1 rounded-md text-center"}>Intersting? <span className='text-sm text-[.93em] text-lightBlue'> Share it !</span></Dialog.Title>
                            <div className="my-2 flex items-center justify-between pb-2">
                              <UserProfile image={bug.user.image}/>
                              <div className="h-[2px] bg-gray-400 mr-1 flex-1"></div>
                              <UserProfile image={user.image!}/>
                            </div>
                            {bug.imageUrl && bug.imageUrl.trim()!=='' &&
                              <div className="flex items-center justify-end">
                                <ImagePreviewModal isOpen={showImage} imageUrl={bug.imageUrl} onClose={()=>setShowImage(false)}/>
                                <p onClick={()=>setShowImage(true)} className="text-sm text-center font-bold text-darkishBlue cursor-pointer">see photo</p>
                              </div>
                            }
                            
                            <div className="pl-2">
                                <h3 className='font-medium text-darkGray text-[1.3em] max-w-[200px] truncate'>{bug.title}</h3>
                                <div className="max-h-[350px] overflow-y-scroll overflowContainer">
                                  <h4 className="text-gray-400 text-[1em]">{bug.description}</h4>
                                </div>
                            </div>
                            <div className="flex gap-1 items-center justify-center">
                              <Button disabled={isLoading || shared || bug.userId===user.id} isLoading={isLoading} onClick={()=>share()} className='flex items-center text-[1.090em] gap-1 bg-darkBlue hover:bg-[#0f0f26] duration-150 p-2 rounded-md'>Share
                                <BsShare className="text-[.8em]"/>
                              </Button>
                              {shared && <p className='text-sm text-darkishBlue'>already shared</p>}
                              {user.id===bug.userId && <p className='text-sm text-darkishBlue'>cannot share your own bug</p>}

                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
        </Transition.Child>
    </Transition>
  )
}

export default ShareBugModal
