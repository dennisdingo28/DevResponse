import { Bug } from "@prisma/client";
import axios from "axios";

export default async function shareBug(bugId: string, userId: string, bug: Bug,token: string){
    const res = await axios.post(`/api/bug/${bugId}/share`,{
        bugId,
        userId,
        bug,
    },
    {
        headers:{
            Authorization:`Bearer ${token}`,
        },
    });
    return res;
}