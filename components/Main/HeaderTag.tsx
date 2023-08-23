"use client"

import { Dispatch, SetStateAction, useState } from "react"
import AddTagModal from "./AddTagModal";
import { Tag } from "@/types";

interface HeaderTagProps{
  tags: Array<Tag>;
  setTags: Dispatch<SetStateAction<Array<Tag>>>;
}

const HeaderTag: React.FC<HeaderTagProps> = ({tags,setTags}) => {
    const [isOpen,setIsOpen] = useState<boolean>(false);
  return (
    <div>
        <AddTagModal isOpen={isOpen} onClose={()=>setIsOpen(false)} tags={tags} setTags={setTags}/>
        <small onClick={()=>setIsOpen(true)} className="text-lightBlue font-bold cursor-pointer hover:text-[#2661ed] duration-150">
            # Add Tag
        </small>
    </div>
  )
}

export default HeaderTag