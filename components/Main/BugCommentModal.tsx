"use client"

import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, SetStateAction , Fragment, useState} from 'react';
import Button from '../ui/Button';
import { Bug, User as UserDB, Comment as CommentDB } from "@prisma/client";
import { User } from "next-auth";
import HeaderImage from './HeaderImage';
import Image from 'next/image';
import Comment from '../ui/Comment';

interface BugCommentProps{
    isOpen: boolean;
    onClose: Dispatch<SetStateAction<boolean>>;
    bug: Bug & {
        user: UserDB;
        comments: Array<CommentDB & {
            user: UserDB
        }>;
    };
    user: User;
}

const BugCommentModal: React.FC<BugCommentProps> = ({isOpen,onClose,bug,user}) => {
    const [comment,setComment] = useState<string>("");
    const [imageUrl,setImageUrl] = useState<string>("");
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
                        <Dialog.Panel className={"text-darkGray bg-softDarkBlue p-2 rounded-md space-y-2"}>
                            <Dialog.Title className={"font-bold text-center text-[1.1em]"}>Share your solution with <span className='text-sm text-[.93em] text-lightBlue'>{bug.user.name}</span></Dialog.Title>
                            <textarea value={comment} onChange={(e)=>setComment(e.target.value)} rows={2} className='w-full resize-none bg-transparent border-l-2 border-l-gray-500 outline-none placeholder:text-[.89em] p-1 text-[.93em] text-gray-400' placeholder='@comment'></textarea>
                            <div className="flex items-center justify-between">
                                <HeaderImage setImageUrl={setImageUrl} imageUrl={imageUrl}/>
                                <Button disabled={!comment || comment.trim()===''} onClick={()=>{}} className="bg-darkBlue hover:bg-[#0f0f26] duration-200 text-gray-300 text-[.95em] font-poppins rounded-md p-2 flex items-center gap-1">Send</Button>
                            </div>
                            {imageUrl && imageUrl.trim()!=='' && 
                                <Image src={imageUrl} width={700} height={650} alt='comment upload image' className='w-full h-full object-cover max-w-[700px] max-h-[650px]' priority quality={100}/>
                            }
                            <div className='border-t border-t-slate-500 p-1 bg-darkBlue'>
                                <h3 className='font-roboto font-medium text-[1.1em] mb-3'>
                                    Current replies ({bug.comments.length})
                                </h3>
                                <div>
                                    {bug.comments.map((comment,index)=>(
                                        <Comment key={index} bug={bug} user={user} comment={comment}/>
                                    ))}
                                </div>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
        </Transition.Child>
    </Transition>
  )
}

export default BugCommentModal
