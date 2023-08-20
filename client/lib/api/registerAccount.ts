import { RegisterRequest } from "@/validators";
import axios from "axios";

export default async function registerAccount(account: RegisterRequest,imageUrl?:string){
    const res = await axios.post('/api/account',{account,image:imageUrl});
    return res;
}