import { RegisterRequest } from "@/validators";
import { Bug, User } from "@prisma/client";
import { Socket } from "socket.io-client";
import { User as AuthUser } from "next-auth";


export interface RegistrationPayload extends RegisterRequest{
    image?:string;
}
export interface AuthTokenPayload {
    id: string;
    username: string;
    email: string;
    image: string;
}
export interface Response {
    from: User;
    comment: string;
    bug: Bug;
}
export interface BugPing{
    user: AuthUser;
    bug: Bug;
    socket: Socket | null;
}