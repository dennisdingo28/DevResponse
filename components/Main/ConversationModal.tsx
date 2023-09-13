"use client"
import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, Fragment, SetStateAction, useState} from 'react';
import { User as LoggedUser } from "next-auth";
import { Conversation, User } from "@prisma/client"
import UserProfile from '../ui/UserProfile';
import {BsSend} from "react-icons/bs";
import { useForm } from 'react-hook-form';
import sendMessage from '@/lib/api/sendMessage';

interface ConversationModalProps{
    conversation: Conversation & {
        user: User,
        recipient: User,
    }
    user:  LoggedUser;
    isOpen: boolean;
    onClose: Dispatch<SetStateAction<boolean>>;
}

const ConversationUserModal: React.FC<ConversationModalProps> = ({conversation,user,isOpen,onClose}) => {
    const {register, handleSubmit, formState:{errors}} = useForm({
        defaultValues:{
            message:"",
        },
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
                        <Dialog.Panel className={"text-darkGray bg-softDarkBlue p-2 rounded-md space-y-2"}>
                            <UserProfile image={conversation.recipient.id===user.id ? conversation.user.image:conversation.recipient.image} username={conversation.recipient.id===user.id ? conversation.user.name:conversation.recipient.name}/>                            
                            <div className='bg-blackBlue rounded-md p-1'>
                                <div className="min-h-[300px] max-h-[500px] h-full min-w-[240px] w-full max-w-[500px]">
                                    {!conversation.messages || conversation.messages.length===0 &&
                                        (
                                            <p className='text-sm text-center text-gray-700'>no current messsages</p>
                                        )
                                    }
                                </div>
                                <form onSubmit={handleSubmit((data)=>{
                                    if(user.id!==conversation.recipientId){
                                        sendMessage(data.message,user.id,conversation.recipientId,user.token)
                                    }else{
                                        sendMessage(data.message,conversation.userId,user.id,user.token);
                                    }
                                })}>
                                    <div className="flex items-center gap-2">
                                        <input {...register("message")} placeholder='write a message' className='placeholder:text-xs flex-1 py-1 text-sm w-full outline-none bg-[rgba(20,23,59,.5)] rounded-md focus:ring-2 px-2'/>
                                        <BsSend className="text-sm text-gray-400 cursor-pointer"/>
                                    </div>
                                </form>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
        </Transition.Child>
    </Transition>
  )
}

export default ConversationUserModal;
