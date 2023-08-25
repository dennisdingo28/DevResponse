import axios from "axios";

export default async function markRelevant(id: string,relevantArr: Array<string>){
    const res = await axios.post(`/api/bug/${id}/relevant`,{relevant:relevantArr});

    return res;
}