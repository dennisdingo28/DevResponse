"use client"

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

interface FormInputProps extends HTMLAttributes<HTMLInputElement>{
    labelText?: string;
    placeholderLabel?: string;
    inputMessage?: string;
    register?: any;
    registerName?: string;
}

const FormInput: React.FC<FormInputProps> = ({labelText,placeholderLabel,inputMessage,className,register,registerName}) => {
  return (
    <div className="">
        {labelText && labelText.trim()!=='' && <label>{labelText}</label>}
        <input placeholder={placeholderLabel} className={cn(className)} {...register(`${registerName}`)}/>
        {inputMessage && inputMessage.trim()!=='' && <small>{inputMessage}</small>}
    </div>
  )
}

export default FormInput
