import { RegisterRequest } from "@/validators";
import { User } from "@prisma/client";

export interface NavbarLink {
    label: string;
    link: string;
}

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
}