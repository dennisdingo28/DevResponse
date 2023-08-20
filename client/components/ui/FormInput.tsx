"use client"

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useState } from "react";
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai";


interface FormInputProps extends HTMLAttributes<HTMLInputElement>{
  labelText?: string;
  placeholderLabel?: string;
  inputErrorMessage?: string;
  register?: any;
  registerName?: string;
  showErrorMessage?: boolean;
  inputType: "text" | "password";
}

const FormInput: React.FC<FormInputProps> = ({labelText,placeholderLabel,showErrorMessage,inputErrorMessage,className,register,registerName,inputType}) => {
  const [showPassword,setShowPassword] = useState<boolean>(false);
  
  return (
    <div className="w-full">
      <div>
        {labelText && labelText.trim()!=='' && <label>{labelText}</label>}
        <div className="">
          {inputType!=="password" ? 
          (
            <input type={inputType} placeholder={placeholderLabel} className={cn(className)} {...register(`${registerName}`)}/>
          )
          :
          (
            <div className="flex">
              <input type={showPassword ? "text":"password"} placeholder={placeholderLabel} className={cn(className)} {...register(`${registerName}`)}/>
              <div className="bg-darkBlue rounded-r-md flex items-center justify-center">
                {!showPassword ? <AiOutlineEyeInvisible onClick={()=>setShowPassword(true)} className="text-[1.7em] cursor-pointer duration-150 p-1 rounded-full hover:bg-slate-700"/>:<AiOutlineEye onClick={()=>setShowPassword(false)} className="text-[1.7em] cursor-pointer duration-150 p-1 rounded-full hover:bg-slate-700"/>}
              </div>
            </div>
          )
          }
          
        </div>
      </div>
        
        {showErrorMessage && inputErrorMessage && inputErrorMessage.trim()!=='' && <small className="text-red-400">{inputErrorMessage}</small>}
    </div>
  )
}

export default FormInput
