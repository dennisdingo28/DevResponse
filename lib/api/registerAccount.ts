import { RegisterRequest } from "@/validators";
import axios from "axios";

export default async function registerAccount(account: RegisterRequest){
    const res = await axios.post('/api/account',account);
    return res;
}