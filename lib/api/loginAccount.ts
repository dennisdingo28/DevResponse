import { LoginRequest } from "@/validators";
import { signIn } from "next-auth/react";

export default async function loginAccount(payload: LoginRequest){    
    const signInResponse = await signIn("credentials",{...payload,redirect:false})   
    
    return signInResponse;
     
}