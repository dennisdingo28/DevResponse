"use client"

import { User } from "next-auth";
import {
  Bug as BugDB,
  Comment as CommentDB,
  Report,
  Share,
  User as UserDB,
} from "@prisma/client";

interface PingPopoverProps{
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
}

const PingPopover: React.FC<PingPopoverProps> = ({user,bug}) => {
  return (
    <div>PingPopover</div>
  )
}

export default PingPopover