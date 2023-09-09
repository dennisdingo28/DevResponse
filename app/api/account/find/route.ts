import prismadb from "@/lib/db";
import AuthorizationToken from "@/lib/api/middleware/AuthorzationToken";
import { FindAccountRequest, FindAccountValidator } from "@/validators";
import { Prisma } from "@prisma/client";
import {NextResponse} from "next/server";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export async function POST(req: Request){
    try{
        const payload: FindAccountRequest = await req.json();
        const authorizationToken = req.headers.get("authorization")?.split(" ")[1] || "";
        AuthorizationToken(authorizationToken);

        //validating incoming object payload
        FindAccountValidator.parse(payload);
        if(payload.username && payload.username.trim()!==''){
            const users = await prismadb.user.findMany({
                where:{
                    name:{
                        contains:payload.username
                    }
                },
            });
            return NextResponse.json({msg:"Results",users},{status:200});
        }else{
            const users = await prismadb.user.findUnique({
                where:{
                    email:payload.email,
                },
            });
            return NextResponse.json({msg:"Results",users},{status:200});
        }
            
    }catch(err){
        if(err instanceof JsonWebTokenError)
            return new NextResponse("Invalid authorization token",{status:400})
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code === 'P2002' ) {
                return new NextResponse(`Unique constraint failed. Please try again later!`,{status:500});
            }
        }
        if(err instanceof ZodError)
            return new NextResponse(err.issues[0].message,{status:400});
        return new NextResponse("Something went wrong. Please try again later!",{status:500});
    }
}