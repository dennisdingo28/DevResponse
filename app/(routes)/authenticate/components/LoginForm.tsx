"use client"

import FormInput from "@/components/ui/FormInput";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginRequest, LoginValidator } from "@/validators";
import { useEffect, useState } from "react";
import loginAccount from "@/lib/api/loginAccount";
import { useMutation } from "@tanstack/react-query";
import {AxiosError} from "axios";
import { toast } from "react-hot-toast";
import Button from "@/components/ui/Button";

const LoginForm = () => {

    const [showErrors,setShowErrors] = useState<boolean>(false);
    
    const [imageUrl,setImageUrl] = useState<string>("");
    const [showPassword,setShowPassword] = useState<boolean>(false);

    const {register,handleSubmit,formState:{errors}} = useForm({
        resolver:zodResolver(LoginValidator),
        defaultValues:{
            email:"",
            password:"",
        }
    });

    const {mutate: signInAccount, isLoading} = useMutation({
        mutationFn:async(credentials: LoginRequest)=>{
            const res = await loginAccount(credentials);
            return res;
        },
        onSuccess:(data: any)=>{
            console.log("login",data);
            if(data.error && data.error.trim()!=='')
                toast.success(data.error);
            else
                toast.success("Successfully logged in !");
        },
        onError:(err: any)=>{
            toast.error((err as Error).message);
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
    <form onSubmit={handleSubmit((data)=>signInAccount(data))}>
        <div className="space-y-2">
            <FormInput inputType="text" register={register} showErrorMessage={showErrors} inputErrorMessage={errors.email?.message} registerName="email" placeholderLabel="@email" className="bg-darkBlue w-full outline-none p-2 rounded-md text-blackGray font-medium"/>
            <FormInput inputType={"password"} register={register} showErrorMessage={showErrors} inputErrorMessage={errors.password?.message} registerName="password" placeholderLabel="@password" className="w-full rounded-l-md -p-2 outline-none bg-darkBlue p-2 text-blackGray font-medium"/>
        </div>
        <div className="flex justify-center items-center mt-2">
            <Button isLoading={isLoading} disabled={isLoading} className="bg-lightBlue text-white font-bold p-2 font-roboto rounded-md hover:bg-blue-700 duration-200 flex items-center gap-1">Sign In</Button>
        </div>
    </form> 
    )
}

export default LoginForm
