"use client"

import FormInput from "@/components/ui/FormInput";
import {useForm} from "react-hook-form";


const RegisterForm = () => {

    const {register,handleSubmit,formState:{errors}} = useForm({
        defaultValues:{
            username:"",
            email:"",
            password:"",
        }
    });
    

  return (
    <form>
        <div className="space-y-2">
            <FormInput register={register} registerName="username" placeholderLabel="@username" className="bg-darkBlue w-full outline-none p-2 rounded-md text-blackGray font-medium"/>
            <FormInput register={register} registerName="email" placeholderLabel="@email" className="bg-darkBlue w-full outline-none p-2 rounded-md text-blackGray font-medium"/>
            <FormInput register={register} registerName="password" placeholderLabel="@password" className="bg-darkBlue w-full outline-none p-2 rounded-md text-blackGray font-medium"/>
        </div>
        <div className="flex justify-center items-center mt-2">
            <button type="submit" className="bg-lightBlue text-white font-bold p-2 font-roboto rounded-md hover:bg-blue-700 duration-200">Register Account</button>
        </div>
    </form> 
    )
}

export default RegisterForm
