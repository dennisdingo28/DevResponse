import { NextAuthOptions, getServerSession } from "next-auth";
import ValidString from "./utils/ValidString";
import GoogleProvider from "next-auth/providers/google";
import prismadb from "./db";
import generateJWT from "./generateJWT";


function getGoogleCredentials(){
    const GOOGLE_CLIENTID = process.env.GOOGLE_CLIENTID;
    const GOOGLE_CLIENTSECRET = process.env.GOOGLE_CLIENTSECRET;

    if(!GOOGLE_CLIENTID! || !ValidString(GOOGLE_CLIENTID)){
        throw new Error("No google client id was provided. Please try again later !");
    }
    if(!GOOGLE_CLIENTSECRET || !ValidString(GOOGLE_CLIENTSECRET)){
        throw new Error("No google client secret was provided. Please try again later !");
    }

    return {
        GOOGLE_CLIENTID,
        GOOGLE_CLIENTSECRET,
    };
}

export const authOptions: NextAuthOptions = {
    pages:{
        signIn:"/authenticate",
    },
    providers:[
        GoogleProvider({
            clientId:getGoogleCredentials().GOOGLE_CLIENTID,
            clientSecret:getGoogleCredentials().GOOGLE_CLIENTSECRET,
        })
    ],
    callbacks:{
        async jwt({token,account,profile}){
            if(token){
                const userAlreadyExists = await prismadb.user.findUnique({where:{
                    username:token.name!,
                    email:token.email!,
                }});
                
                if(!userAlreadyExists){
                    const newUser = await prismadb.user.create({
                        data:{
                            username:token.name!,
                            email:token.email!,
                            image:token.picture!,
                        }
                    })
                    token.id=newUser.id;
                }
            }
            return token;
        },
        async session({token,session}){
            
            const jwt = generateJWT({username:token.name,email:token.email,image:token.picture});

            if(session && session.user){
                session.user.token = jwt;
                session.user.id=String(token.id);
            }

            return session;
        }
    }
};


export const getAuthSession = ()=> getServerSession(authOptions);