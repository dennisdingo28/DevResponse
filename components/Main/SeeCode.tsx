"use client"

import { useState } from "react"
import SeeCodeModal from "./SeeCodeModal";

interface SeeCodeProps{
    code: string | null;
    language: string | null;
}

const SeeCode: React.FC<SeeCodeProps> = ({code,language}) => {
  const [isOpen,setIsOpen] = useState(false);

    return (
    <div>
        {code && code.trim()!=='' && (
            <div className="" onClick={(e)=>{
              e.stopPropagation();
              setIsOpen(true);
            }}>
                <p className="text-lightBlue text-[.85em] font-roboto hover:text-darkishBlue duration-150">see code</p>
                <SeeCodeModal isReadOnly={true} isOpen={isOpen} code={code} onClose={()=>setIsOpen(false)} language={language!}/>
            </div>
        )}
    </div>
  )
}

export default SeeCode