import axios from "axios";

export default async function sendMessage(message: string,userId: string,recipientId: string,token: string){
    const res = await axios.post(`/api/conversation/send`,{
        message,
        userId,
        recipientId,
    },{
        headers:{
            Authorization:`Bearer ${token}`,
        },
    });

    return res;
}