"use client"

import FormInput from "@/components/ui/FormInput";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterRequest, RegisterValidator } from "@/validators";
import { useEffect, useState } from "react";
import registerAccount from "@/lib/api/registerAccount";
import { useMutation } from "@tanstack/react-query";
import {AxiosError} from "axios";
import { toast } from "react-hot-toast";
import Button from "@/components/ui/Button";
import ImageUpload from "./ImageUpload";


const RegisterForm = () => {

    const [showErrors,setShowErrors] = useState<boolean>(false);
    
    const {register,handleSubmit,formState:{errors}} = useForm({
        resolver:zodResolver(RegisterValidator),
        defaultValues:{
            username:"",
            email:"",
            password:"",
        }
    });

    const {mutate: createAccount, isLoading} = useMutation({
        mutationFn:async(account: RegisterRequest)=>{
            const res = await registerAccount(account);
            return res.data;
        },
        onSuccess:(data: any)=>{
            toast.success(data.msg || "Account was successfully created !");
        },
        onError:(err: any)=>{
            console.log(err);
            
            if(err instanceof AxiosError)
                toast.error(err.response?.data || err.message)
            else
                toast.error((err as Error).message);
            return null;
        }
    });


    useEffect(()=>{
        if(errors && Object.keys(errors).length>0){
            setShowErrors(true);
            setTimeout(()=>{
                setShowErrors(false);
            },2600);
        }
    },[errors]);

  return (
    <form onSubmit={handleSubmit((data)=>createAccount(data))}>
        <div className="mb-2 ml-[4px]">
            <ImageUpload/>
        </div>
        <div className="space-y-2">
            <FormInput register={register} showErrorMessage={showErrors} inputErrorMessage={errors.username?.message} registerName="username" placeholderLabel="@username" className="bg-darkBlue w-full outline-none p-2 rounded-md text-blackGray font-medium"/>
            <FormInput register={register} showErrorMessage={showErrors} inputErrorMessage={errors.email?.message} registerName="email" placeholderLabel="@email" className="bg-darkBlue w-full outline-none p-2 rounded-md text-blackGray font-medium"/>
            <FormInput register={register} showErrorMessage={showErrors} inputErrorMessage={errors.password?.message} registerName="password" placeholderLabel="@password" className="bg-darkBlue w-full outline-none p-2 rounded-md text-blackGray font-medium"/>
        </div>
        <div className="flex justify-center items-center mt-2">
            <Button isLoading={isLoading} disabled={isLoading} className="bg-lightBlue text-white font-bold p-2 font-roboto rounded-md hover:bg-blue-700 duration-200 flex items-center gap-1">Register Account</Button>
        </div>
    </form> 
    )
}

export default RegisterForm
