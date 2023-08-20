import jwt,{ JwtPayload } from "jsonwebtoken";

export default function generateJWT(payload: JwtPayload){
    return jwt.sign(payload,process.env.JWT_ENCRYPTION as string,{expiresIn:"30d"});
}