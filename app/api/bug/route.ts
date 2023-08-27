import AuthorizationToken from "@/lib/api/middleware/AuthorzationToken";
import prismadb from "@/lib/db";
import { BugRequest, BugValidator } from "@/validators";
import { JsonWebTokenError } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request){
    try{
        const payload:BugRequest = await req.json();
        const authorizationToken = req.headers.get("authorization")?.split(" ")[1] || "";
        
        //verfies the provided auth token
        const user = AuthorizationToken(authorizationToken);
        BugValidator.parse(payload);
        const newBug = await prismadb.bug.create({
            data:{
                ...payload,
                userId:user.id,
            }
        });

        return NextResponse.json({msg:"Bug was sucessfully created",bug:newBug},{status:200});

    }catch(err){
        console.log(err);
        
        if(err instanceof JsonWebTokenError)
            return new NextResponse("Invalid authorization token",{status:400})

        if(err instanceof ZodError)
            return new NextResponse(err.issues[0].message,{status:400});
        return new NextResponse("Something went wrong. Please try again later!",{status:500})
    }
}