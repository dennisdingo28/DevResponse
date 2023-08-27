import { CommentRequest } from "@/validators";

import axios from "axios";


export default async function createComment(comment: CommentRequest){
    const res = await axios.post(`/api/bug/${comment.bugId}/comment`,comment);

    return res;
}