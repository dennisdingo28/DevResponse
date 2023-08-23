"use client"
import { Dispatch, SetStateAction, useState } from "react"
import { BsCodeSlash } from "react-icons/bs"
import AttachCodeModal from "./AttachCode";

interface HeaderCodeProps{
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
}

const HeaderCode: React.FC<HeaderCodeProps> = ({code,setCode}) => {
  const [isOpen,setIsOpen] = useState<boolean>(false);
  return (
    <div className=''>
      <AttachCodeModal isOpen={isOpen} onClose={()=>setIsOpen(false)} code={code} setCode={setCode}/>
      <div className="flex cursor-pointer items-center gap-2 text-lightBlue hover:text-[#2661ed] duration-150" onClick={()=>setIsOpen(true)}>
        <BsCodeSlash/>
        <small>attach code</small>
      </div>
    </div>
  )
}

export default HeaderCode