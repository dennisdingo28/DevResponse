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
}

const FormInput: React.FC<FormInputProps> = ({labelText,placeholderLabel,showErrorMessage,inputErrorMessage,className,register,registerName}) => {
  return (
    <div className="">
        {labelText && labelText.trim()!=='' && <label>{labelText}</label>}
        <input placeholder={placeholderLabel} className={cn(className)} {...register(`${registerName}`)}/>
        {showErrorMessage && inputErrorMessage && inputErrorMessage.trim()!=='' && <small className="text-red-400">{inputErrorMessage}</small>}
    </div>
  )
}

export default FormInput
