import axios from "axios";

export default async function createConversation(userId: string,recipientId: string,token: string){
    const res = await axios.post(`/api/conversation/new`,{
        userId,
        recipientId,
    },
    {
        headers:{
            Authorization:`Bearer ${token}`,
        },
    });

    return res;
}