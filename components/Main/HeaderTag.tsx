"use client"

import { Dispatch, SetStateAction, useState } from "react"
import AddTagModal from "./AddTagModal";

interface HeaderTagProps{
  tags: Array<string>;
  setTags: Dispatch<SetStateAction<Array<string>>>;
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