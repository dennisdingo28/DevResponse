import axios from "axios";

export default async function reportBug(id: string,token: string){
    const res = await axios.post(`/api/bug/${id}/report`,{},{
        headers:{
            Authorization:`Bearer ${token}`,
        },
    });
    return res;
}