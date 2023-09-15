import axios from "axios";

export default async function sendMessage(conversationId: string,message: string,userId: string,recipientId: string,token: string){
    const res = await axios.post(`/api/conversation/send`,{
        conversationId,
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