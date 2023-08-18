"use client"

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

interface FormInputProps extends HTMLAttributes<HTMLInputElement>{
  labelText?: string;
  placeholderLabel?: string;
  inputErrorMessage?: string;
  register?: any;
  registerName?: string;
  showErrorMessage?: boolean;
  inputType?: "text" | "password";
}

const FormInput: React.FC<FormInputProps> = ({labelText,placeholderLabel,showErrorMessage,inputErrorMessage,className,register,registerName,inputType}) => {
  return (
    <div className="w-full">
      <div>
        {labelText && labelText.trim()!=='' && <label>{labelText}</label>}
        <input type={inputType || "text"} placeholder={placeholderLabel} className={cn(className)} {...register(`${registerName}`)}/>
      </div>
        
        {showErrorMessage && inputErrorMessage && inputErrorMessage.trim()!=='' && <small className="text-red-400">{inputErrorMessage}</small>}
    </div>
  )
}

export default FormInput
