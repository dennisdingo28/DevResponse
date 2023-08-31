"use client";

import { Comment, User } from "@prisma/client";
import UserProfile from "./UserProfile";
import Image from "next/image";

interface SelectedBugProps {
  selectedComment: Comment & { user: User };
}

const SelectedBug: React.FC<SelectedBugProps> = ({ selectedComment }) => {
  return (
    <div className="w-full overflow-y-scroll overflowContainer">
      <div className="flex items-center">
        <UserProfile image={selectedComment.user.image} />
        <h3 className="font-bold text-[1.1em]">
          {selectedComment.user.name}'s{" "}
          <span className="font-normal text-[1em] text-lightBlue">
            {" "}
            response
          </span>
        </h3>
      </div>
      <div className="">
        <p className="max-w-[700px] break-words">
          {selectedComment.commentText}
        </p>
        {selectedComment.imageUrl && selectedComment.imageUrl.trim() !== "" && (
          <Image
            width={700}
            height={400}
            src={selectedComment.imageUrl}
            alt="uploaded image"
            className="max-w-[700px] max-h-[400px] rounded-md w-full h-full object-cover"
            quality={100}
            priority
          />
        )}
      </div>
    </div>
  );
};

export default SelectedBug;
