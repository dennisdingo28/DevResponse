import axios from "axios";

export default async function solveBug(id: string,token: string){
    const res = await axios.post(`/api/bug/${id}/solved`,{},{
        headers:{
            Authorization:`Bearer ${token}`,
        },
    });
}