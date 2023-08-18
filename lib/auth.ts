import { NextAuthOptions, getServerSession } from "next-auth";
import ValidString from "./utils/ValidString";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
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

function getGithubCredentials(){
    const GITHUB_CLIENTID = process.env.GITHUB_CLIENTID;
    const GITHUB_CLIENTSECRET = process.env.GITHUB_CLIENTSECRET;

    if(!GITHUB_CLIENTID! || !ValidString(GITHUB_CLIENTID)){
        throw new Error("No github client id was provided. Please try again later !");
    }
    if(!GITHUB_CLIENTSECRET || !ValidString(GITHUB_CLIENTSECRET)){
        throw new Error("No github client secret was provided. Please try again later !");
    }

    return {
        GITHUB_CLIENTID,
        GITHUB_CLIENTSECRET,
    };
}

export const authOptions: NextAuthOptions = {
    pages:{
        error:"/authenticate",
        signIn:"/authenticate",
    },
    providers:[
        GoogleProvider({
            clientId:getGoogleCredentials().GOOGLE_CLIENTID,
            clientSecret:getGoogleCredentials().GOOGLE_CLIENTSECRET,
        }),
        GithubProvider({
            clientId:getGithubCredentials().GITHUB_CLIENTID,
            clientSecret:getGithubCredentials().GITHUB_CLIENTSECRET,
        }),
    ],
    callbacks:{
        async signIn({user,account,profile}){
            const usernameAlreadyExists = await prismadb.user.findUnique({
                where:{
                    username:user.name!,
                    NOT:{
                        provider:account?.provider,
                    }
                },
            });
            if(usernameAlreadyExists){
                throw new Error(`Username ${user.name} is already taken!`);
            }
            const emailAreadyExists = await prismadb.user.findUnique({
                where:{
                    email:user.email!,
                    NOT:{
                        provider:account?.provider,
                    }
                },
            });
            if(emailAreadyExists){
                throw new Error(`Email ${user.email} is already taken!`);
            }
            
            return true;
        },
        async jwt({token,account,profile}){
            if(token){
                const userAlreadyExists = await prismadb.user.findUnique({
                    where:{
                        username:token.name!,
                        email:token.email!,
                        provider:account?.provider,
                    }
                });
                if(!userAlreadyExists){
                    const newUser = await prismadb.user.create({
                        data:{
                            username:token.name!,
                            email:token.email!,
                            image:token.picture!,
                            provider:account?.provider,
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