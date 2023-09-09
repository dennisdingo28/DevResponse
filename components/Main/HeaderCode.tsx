"use client"
import { Dispatch, SetStateAction, useState } from "react"
import { BsCodeSlash } from "react-icons/bs"
import AttachCodeModal from "./AttachCode";

interface HeaderCodeProps{
  setCode: Dispatch<SetStateAction<string>>;
  code:string;
  setLanguage: Dispatch<SetStateAction<string>>;
  language:string;
}

const HeaderCode: React.FC<HeaderCodeProps> = ({setCode,setLanguage,language,code}) => {
  const [isOpen,setIsOpen] = useState<boolean>(false);
  return (
    <div className='w-full max-w-[500px] mx-auto'>
      <AttachCodeModal isOpen={isOpen} code={code} onClose={()=>setIsOpen(false)} language={language} setLanguage={setLanguage} setCode={setCode}/>
      <div className="flex cursor-pointer items-center gap-2 text-lightBlue hover:text-[#2661ed] duration-150" onClick={()=>setIsOpen(true)}>
        <BsCodeSlash/>
        <small className="whitespace-nowrap">attach code</small>
      </div>
    </div>
  )
}

export default HeaderCode