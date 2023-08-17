import prismadb from "@/lib/db";
import { RegisterRequest, RegisterValidator } from "@/validators";
import { Prisma } from "@prisma/client";
import {NextResponse} from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request){
    try{
        const payload: RegisterRequest = await req.json();

        //validating incoming object payload
        RegisterValidator.parse(payload);

        const usernameAlreadyExists = await prismadb.user.findUnique({
            where:{
                username:payload.username,
            },
        });
        if(usernameAlreadyExists){
            return new NextResponse(`Username ${payload.username} is already taken!`,{status:400});
        }
        const emailAreadyExists = await prismadb.user.findUnique({
            where:{
                email:payload.email,
            },
        });
        if(emailAreadyExists){
            return new NextResponse(`Email ${payload.email} is already taken!`,{status:400});
        }

        await prismadb.user.create({
            data:{
                username:payload.username,
                email:payload.email,
                image:payload.password,
            }
        });

        return NextResponse.json({msg:"Account was successfully created !"},{status:200});
        
    }catch(err){
        
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code === 'P2002' ) {
                return new NextResponse(`Unique constraint failed. Please try again later!`,{status:500});
            }
                
        }
        if(err instanceof ZodError)
            return new NextResponse(err.issues[0].message,{status:400});
    }
}