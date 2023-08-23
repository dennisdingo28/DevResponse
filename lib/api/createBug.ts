import { BugRequest } from "@/validators";
import axios from "axios";

export default async function createBug(payload: BugRequest,token: string){
    const res = await axios.post("/api/bug",payload,{
        headers:{
            Authorization:`Bearer ${token}`,
        },
    });

    return res;
}