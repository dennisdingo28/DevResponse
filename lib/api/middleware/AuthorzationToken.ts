import { AuthTokenPayload } from "@/types";
import jwt from "jsonwebtoken";

export default function AuthorizationToken(token: string){
    const decodedInfo = jwt.verify(token,process.env.JWT_ENCRYPTION as string);
    return decodedInfo as AuthTokenPayload; 
}