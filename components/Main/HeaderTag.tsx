"use client"

import { useState } from "react"
import AddTagModal from "./AddTagModal";

const HeaderTag = () => {
    const [isOpen,setIsOpen] = useState<boolean>(false);
  return (
    <div>
        <AddTagModal isOpen={isOpen} onClose={()=>setIsOpen(false)}/>
        <small onClick={()=>setIsOpen(true)} className="text-lightBlue font-bold cursor-pointer hover:text-[#2661ed] duration-150">
            # Add Tag
        </small>
    </div>
  )
}

export default HeaderTag