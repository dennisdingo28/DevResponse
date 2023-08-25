"use client"

import BugNonRelevant from "./BugNonRelevant"
import BugRelevant from "./BugRelevant"
import {BiCodeAlt} from "react-icons/bi"
import {PiArrowFatDownBold} from "react-icons/pi";
import {FaRegCommentDots} from "react-icons/fa";
import BugComment from "./BugComment";

const BugInteractions = () => {
  return (
    <div className="flex items-center">
        <BugRelevant icon={<BiCodeAlt/>} relevantNumber={1078}/>
        <BugNonRelevant icon={<PiArrowFatDownBold/>} nonRelevantNumber={854}/>
        <BugComment icon={<FaRegCommentDots/>} comments={31}/>
    </div>
  )
}

export default BugInteractions