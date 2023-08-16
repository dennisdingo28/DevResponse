import { NextAuthOptions, getServerSession } from "next-auth";

export const authOptions: NextAuthOptions = {
    pages:{
        signIn:"/authenticate",
    },
    providers:[],
};


export const getAuthSession = ()=> getServerSession(authOptions);