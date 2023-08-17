import {DefaultSession} from "next-auth";
import { ProjectProps } from "./types";

declare module "next-auth"{
    interface User {
        id: string;
       token: string;
    }
    interface Session extends DefaultSession {
        user?: User;
    }
}