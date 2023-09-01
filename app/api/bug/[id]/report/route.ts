import AuthorizationToken from "@/lib/api/middleware/AuthorzationToken";
import prismadb from "@/lib/db";
import { JsonWebTokenError } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request,{params}:{params:{id: string}}){
    try{
        const id = params.id;
        if(!id || id.trim()==='')
            return new NextResponse("No bug id was provided !");

        const authorizationToken = req.headers.get("authorization")?.split(" ")[1] || "";
        
        //verfies the provided auth token
        const user = AuthorizationToken(authorizationToken);

        await prismadb.report.create({
            data:{
                bugId:id,
                userId:user.id,
            },
        });
        return NextResponse.json({msg:"Bug was successfully reported !",ok: true},{status:200});
    }catch(err){
        
        if(err instanceof JsonWebTokenError)
            return new NextResponse("Invalid authorization token",{status:400})

        if(err instanceof ZodError)
            return new NextResponse(err.issues[0].message,{status:400});
        return new NextResponse("Something went wrong. Please try again later!",{status:500})
    }
}