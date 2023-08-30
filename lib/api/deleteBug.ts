import axios from "axios";

export default async function deleteBug(id: string,token: string){
    const res = await axios.delete(`/api/bug/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`,
        },
    });

    return res;
}