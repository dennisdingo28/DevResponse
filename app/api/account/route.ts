import prismadb from "@/lib/db";
import { RegistrationPayload } from "@/types";
import { RegisterRequest, RegisterValidator } from "@/validators";
import { Prisma } from "@prisma/client";
import {NextResponse} from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request){
    try{
        const payload = await req.json();
        const accountData:RegistrationPayload = payload.account;
        console.log(payload);
        
        //validating incoming object payload
        RegisterValidator.parse(accountData);

        const usernameAlreadyExists = await prismadb.user.findUnique({
            where:{
                username:accountData.username,
            },
        });
        if(usernameAlreadyExists){
            return new NextResponse(`Username ${accountData.username} is already taken!`,{status:400});
        }
        const emailAreadyExists = await prismadb.user.findUnique({
            where:{
                email:accountData.email,
            },
        });
        if(emailAreadyExists){
            return new NextResponse(`Email ${accountData.email} is already taken!`,{status:400});
        }

        if(payload.image && payload.image.trim()!=='')
            accountData.image=payload.image;
        
        await prismadb.user.create({
            data:{
                ...accountData,
            },
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