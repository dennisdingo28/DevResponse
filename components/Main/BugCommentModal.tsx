"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, SetStateAction, Fragment, useState } from "react";
import Button from "../ui/Button";
import { Bug, User as UserDB, Comment as CommentDB } from "@prisma/client";
import { User } from "next-auth";
import HeaderImage from "./HeaderImage";
import Comment from "../ui/Comment";
import { useMutation } from "@tanstack/react-query";
import createComment from "@/lib/api/createComment";
import { toast } from "react-hot-toast";
import { BsSendCheck } from "react-icons/bs";
import useSocketStore from "@/hooks/useSocket";
import ImagePreviewModal from "../ui/ImagePreviewModal";
import SelectedBug from "../ui/SelectedBug";

interface BugCommentProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  bug: Bug & {
    user: UserDB;
    comments: Array<
      CommentDB & {
        user: UserDB;
      }
    >;
  };
  user: User;
}

const BugCommentModal: React.FC<BugCommentProps> = ({
  isOpen,
  onClose,
  bug,
  user,
}) => {
  const [comment, setComment] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [commented, setCommented] = useState(false);
  const [imagePreviewModal, setImagePreviewModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState<CommentDB & {user: UserDB}>();

  const socket = useSocketStore((state) => state.socket);

  const { mutate: newComment, isLoading } = useMutation({
    mutationFn: async () => {
      const res = await createComment({
        bugId: bug.id,
        userId: user.id,
        commentText: comment,
        imageUrl: imageUrl,
      });
      return res;
    },
    onSuccess: (res) => {
      console.log("nc", res);

        if (socket && res.data.comment) {
            socket.emit("new_bug_comment", res.data.comment);
            socket.emit("new_response",{receiver:bug.userId,bug,comment,from:user})
        }
      setCommented(true);
      setTimeout(() => {
        setCommented(false);
      }, 1550);
    },
    onError: () => {
      toast.error("Something went wrong. Please try again later !");
      setCommented(false);
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
            <Dialog.Panel
              className={
                "text-darkGray bg-softDarkBlue p-2 rounded-md space-y-2 max-w-full"
              }
            >
                <div className="w-full flex flex-col gap-2 lg:flex-row max-w-full">
                    <div className="w-full max-w-full lg:w-fit lg:max-w-[400px]">
                    <Dialog.Title className={"font-bold text-center text-[1.1em]"}>
                    Share your solution with{" "}
                    <span className="text-sm text-[.93em] text-lightBlue">
                        {bug.user.name}
                    </span>
                    </Dialog.Title>
                    <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={2}
                    className="w-full resize-none overflowContainer bg-transparent border-l-2 border-l-gray-500 outline-none placeholder:text-[.89em] p-1 text-[.93em] text-gray-400"
                    placeholder="@comment"
                    ></textarea>
                    <div className="flex items-center justify-between">
                    {imageUrl && imageUrl.trim() !== "" ? (
                        <div className="">
                        <ImagePreviewModal
                            imageUrl={imageUrl}
                            isOpen={imagePreviewModal}
                            onClose={() => setImagePreviewModal(false)}
                        />
                        <p
                            onClick={() => setImagePreviewModal(true)}
                            className="text-lightBlue hover:text-[#2661ed] duration-150 text-sm cursor-pointer"
                        >
                            see image
                        </p>
                        </div>
                    ) : (
                        <HeaderImage
                        setImageUrl={setImageUrl}
                        imageUrl={imageUrl}
                        />
                    )}
                    <div className="flex items-center gap-1">
                        <Button
                        isLoading={isLoading}
                        disabled={!comment || comment.trim() === "" || isLoading}
                        onClick={() => newComment()}
                        className="bg-darkBlue hover:bg-[#0f0f26] duration-200 text-gray-300 text-[.95em] font-poppins rounded-md p-2 flex items-center gap-1"
                        >
                        Send
                        </Button>
                        <BsSendCheck
                        className={`text-lightBlue ${
                            !commented ? "absolute opacity-0" : "opacity-100"
                        } duration-100`}
                        />
                    </div>
                    </div>

                    <div className="w-full p-2 bg-darkBlue rounded-lg mt-2">
                    <h3 className="font-roboto font-medium text-[1.1em] mb-3">
                        {!bug.comments || bug.comments.length < 0
                        ? "No current comments"
                        : `Current replies (${bug.comments.length})`}
                    </h3>
                    {bug.comments && bug.comments.length > 0 && (
                        <div className="w-full flex flex-col gap-5 max-h-[315px] overflow-y-scroll overflowContainer">
                        {bug.comments.map((comment, index) => (
                            <div
                            className="cursor-pointer hover:bg-[rgba(255,255,255,.1)] p-1 rounded-md"
                            onClick={() => setSelectedComment(comment)}
                            >
                            <Comment
                                key={index}
                                bug={bug}
                                user={user}
                                comment={comment}
                            />
                            </div>
                        ))}
                        </div>
                    )}
                    </div>
                </div>
                    {selectedComment && (
                      <div className="w-full">
                        <SelectedBug selectedComment={selectedComment}/>
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

export default BugCommentModal;
