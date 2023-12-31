"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { User as LoggedUser } from "next-auth";
import { Conversation, Message, User } from "@prisma/client";
import UserProfile from "../ui/UserProfile";
import { BsSend } from "react-icons/bs";
import { useForm } from "react-hook-form";
import sendMessage from "@/lib/api/sendMessage";
import useSocketStore from "@/hooks/useSocket";

interface ConversationModalProps {
  conversation: Conversation & {
    user: User;
    recipient: User;
    messages: Array<
      Message & {
        user: User;
        recipient: User;
      }
    >;
  };
  user: LoggedUser;
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

const ConversationUserModal: React.FC<ConversationModalProps> = ({
  conversation,
  user,
  isOpen,
  onClose,
}) => {
  const socket = useSocketStore(state=>state.socket);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      message: "",
    },
  });
  const [convMessages,setConvMessages] = useState(conversation.messages);
  const [isLoading,setIsLoading] = useState(false);
  useEffect(()=>{
    if(!socket) return;
    socket.on("new_message_client",payload=>{
      const alreadyExists = convMessages.some(msg=>msg.id===payload.id);
      if(!alreadyExists)
        setConvMessages(prev=>[...prev,{...payload}]);
    });
  },[socket]);

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
                "text-darkGray bg-softDarkBlue p-2 rounded-md space-y-2"
              }
            >
              <UserProfile
                image={
                  conversation.recipient.id === user.id
                    ? conversation.user.image
                    : conversation.recipient.image
                }
                username={
                  conversation.recipient.id === user.id
                    ? conversation.user.name
                    : conversation.recipient.name
                }
              />
              <div className="bg-blackBlue rounded-md p-1">
                <div className="min-h-[300px] max-h-[500px] h-full min-w-[240px] w-full max-w-[500px] overflow-y-scroll overflowContainer">
                  {!convMessages ||
                  convMessages.length === 0 ? (
                    <p className="text-sm text-center text-gray-700">
                      no current messsages
                    </p>
                  ) : (
                    <div className="">
                      <div className="flex flex-col gap-2">
                        {convMessages.map((msg) => {
                          return (
                            <div className="flex flex-col">
                              {msg.userId === user.id ? (
                                <div className="flex justify-end">
                                  <div className="flex items-center gap-1 flex-row-reverse">
                                    <UserProfile image={user.image!} />
                                    <div className="">
                                      <p className="break-words">{msg.message}</p>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-start">
                                    <div className="flex items-center gap-1">
                                        <UserProfile image={msg.user.image}/>
                                        <div className="">
                                          <p className="break-words">{msg.message}</p>
                                        </div>
                                    </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                <form
                  onSubmit={handleSubmit(async (data) => {
                    if (user.id !== conversation.recipientId) {
                      setIsLoading(true);
                      const res = await sendMessage(
                        conversation.id,
                        data.message,
                        user.id,
                        conversation.recipientId,
                        user.token
                      );
                      setIsLoading(false);
                      if(socket){
                        socket.emit("new_message",{user,message:data.message,id:res.data.newMessage.id,recipientId:conversation.recipientId});
                      }
                      //@ts-ignore
                      setConvMessages(prev=>[...prev,{user,userId:user.id,conversationId:conversation.id,message:data.message,id:res.data.newMessage.id,recipientId:conversation.recipientId,recipient:conversation.recipient}]);
                    } else {
                      setIsLoading(true);
                      const res = await sendMessage(
                        conversation.id,
                        data.message,
                        user.id,
                        conversation.userId,
                        user.token
                      );
                      setIsLoading(false);
                      if(socket){
                        socket.emit("new_message",{user,message:data.message,id:res.data.newMessage.id,recipientId:conversation.userId});
                      }
                      //@ts-ignore
                      setConvMessages(prev=>[...prev,{user,userId:user.id,conversationId:conversation.id,message:data.message,id:res.data.newMessage.id,recipientId:conversation.userId,recipient:conversation.user}])
                    }
                  })}
                >
                  <div className="flex items-center gap-2">
                    <input
                      disabled={isLoading}
                      {...register("message")}
                      placeholder="write a message"
                      className={`placeholder:text-xs flex-1 py-1 text-sm w-full outline-none bg-[rgba(20,23,59,.5)] rounded-md focus:ring-2 px-2 ${isLoading && "bg-[rgba(255,255,255,.1)] pointer-events-none"}`}
                    />
                    <BsSend className="text-sm text-gray-400 cursor-pointer" />
                  </div>
                </form>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition.Child>
    </Transition>
  );
};

export default ConversationUserModal;
